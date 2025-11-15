import { useMemo } from 'react';
import { Answers, ScoringCriteria, PhenotypeResult } from '@/types/questionnaire';
import { PCOSMetrics } from './usePCOSType';

export const usePhenotypeScoring = (answers: Answers): { result: PhenotypeResult; metrics: PCOSMetrics } => {
  return useMemo(() => {
    // Helper to count "yes" answers for specific questions
    const countYes = (questionIds: string[]): number => {
      return questionIds.filter(id => answers[id] === 'yes').length;
    };

    // AE (Androgen Excess) Scoring
    let ae: 'high' | 'medium' | 'low' | 'none' = 'none';
    if (answers['2cii'] === 'yes') {
      ae = 'high';
    } else {
      const aeSymptomCount = countYes(['1vi', '1xi', '1xii', '1xiii', '1xiv', '1xv', '1xvi', '1xvii']);
      if (aeSymptomCount >= 6) ae = 'medium';
      else if (aeSymptomCount >= 3) ae = 'low';
    }

    // PCO (Polycystic Ovaries) Scoring
    let pco: 'high' | 'medium' | 'low' | 'none' = 'none';
    if (answers['2ciii'] === 'yes') {
      pco = 'high';
    } else {
      const pcoSymptomCount = countYes(['1i', '1ii', '1iii']);
      if (pcoSymptomCount === 3) pco = 'medium';
      else if (pcoSymptomCount === 2) pco = 'low';
    }

    // OD (Ovulatory Dysfunction) Scoring
    let od: 'high' | 'medium' | 'low' | 'none' = 'none';
    if (answers['2civ'] === 'yes') {
      od = 'high';
    } else {
      const odSymptomCount = countYes(['1vii', '1viii', '1ix', '1x']);
      if (odSymptomCount === 4) od = 'medium';
      else if (odSymptomCount >= 2) od = 'low';
    }

    const criteria: ScoringCriteria = { ae, pco, od };

    // Determine PCOS Type using Four-Cluster Model
    let type: 'type-a' | 'type-b' | 'type-c' | 'type-d' | 'unclear' = 'unclear';
    
    const isHighOrMedium = (level: string) => level === 'high' || level === 'medium';
    const isLow = (level: string) => level === 'low';
    
    // Count how many are high/medium
    const highMediumCount = [ae, pco, od].filter(isHighOrMedium).length;

    // Need at least 2 of 3 to be high/medium for any PCOS type
    if (highMediumCount >= 2) {
      // Type A: All three high/medium
      if (isHighOrMedium(ae) && isHighOrMedium(pco) && isHighOrMedium(od)) {
        type = 'type-a';
      }
      // Type B: AE & OD high/medium, PCO low/none
      else if (isHighOrMedium(ae) && isHighOrMedium(od) && (isLow(pco) || pco === 'none')) {
        type = 'type-b';
      }
      // Type C: AE & PCO high/medium, OD low/none
      else if (isHighOrMedium(ae) && isHighOrMedium(pco) && (isLow(od) || od === 'none')) {
        type = 'type-c';
      }
      // Type D: PCO & OD high/medium, AE low/none
      else if (isHighOrMedium(pco) && isHighOrMedium(od) && (isLow(ae) || ae === 'none')) {
        type = 'type-d';
      }
    }

    // Determine Subtype (Reproductive, Metabolic, Mixed)
    let subtype: 'reproductive' | 'metabolic' | 'mixed' | 'unclear' = 'unclear';
    
    const periodSymptoms = countYes(['1vii', '1viii', '1ix']);
    const metabolicSymptoms = countYes(['1iv', '1v']);
    const totalMetabolicPeriod = periodSymptoms + metabolicSymptoms;

    // Reproductive: 3 period symptoms and <2 metabolic symptoms
    if (periodSymptoms >= 3 && metabolicSymptoms < 2) {
      subtype = 'reproductive';
    }
    // Metabolic: 2 metabolic symptoms and <3 period symptoms
    else if (metabolicSymptoms >= 2 && periodSymptoms < 3) {
      subtype = 'metabolic';
    }
    // Mixed: 5 total symptoms from both categories
    else if (totalMetabolicPeriod >= 5) {
      subtype = 'mixed';
    }

    // Convert to 0-10 scale for visualization
    const levelToScore = (level: 'high' | 'medium' | 'low' | 'none'): number => {
      switch (level) {
        case 'high': return 10;
        case 'medium': return 6;
        case 'low': return 3;
        case 'none': return 0;
      }
    };

    const metrics: PCOSMetrics = {
      androgenExcess: levelToScore(ae),
      polycysticOvaries: levelToScore(pco),
      ovulatoryDysfunction: levelToScore(od)
    };

    return {
      result: { type, subtype, criteria },
      metrics
    };
  }, [answers]);
};
