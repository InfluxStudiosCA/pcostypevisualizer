export type PCOSLevel = 'none' | 'low' | 'medium' | 'high';
export type PCOSType = 'unclear' | 'type-a' | 'type-b' | 'type-c' | 'type-d' | 'reproductive' | 'metabolic' | 'mixed';

export interface PCOSMetrics {
  androgenExcess: number; // 0-10
  polycysticOvaries: number; // 0-10
  ovulatoryDysfunction: number; // 0-10
}

const getLevel = (value: number): PCOSLevel => {
  if (value === 0) return 'none';
  if (value <= 3) return 'low';
  if (value <= 6) return 'medium';
  return 'high';
};

export const usePCOSType = (metrics: PCOSMetrics): PCOSType => {
  const { androgenExcess, polycysticOvaries, ovulatoryDysfunction } = metrics;
  
  // If all values are 0, not enough data
  if (androgenExcess === 0 && polycysticOvaries === 0 && ovulatoryDysfunction === 0) {
    return 'unclear';
  }

  const aeLevel = getLevel(androgenExcess);
  const pcoLevel = getLevel(polycysticOvaries);
  const odLevel = getLevel(ovulatoryDysfunction);

  // Count high/medium levels
  const highMediumCount = [aeLevel, pcoLevel, odLevel].filter(
    level => level === 'high' || level === 'medium'
  ).length;

  // Need at least 2 of 3 to be high/medium to indicate PCOS
  if (highMediumCount < 2) {
    return 'unclear';
  }

  // Type A: All three are high or medium
  if (
    (aeLevel === 'high' || aeLevel === 'medium') &&
    (pcoLevel === 'high' || pcoLevel === 'medium') &&
    (odLevel === 'high' || odLevel === 'medium')
  ) {
    return 'type-a';
  }

  // Type B: AE & OD high/medium, but PCO is low/none
  if (
    (aeLevel === 'high' || aeLevel === 'medium') &&
    (odLevel === 'high' || odLevel === 'medium') &&
    (pcoLevel === 'low' || pcoLevel === 'none')
  ) {
    return 'type-b';
  }

  // Type C: AE & PCO high/medium, but OD is low/none
  if (
    (aeLevel === 'high' || aeLevel === 'medium') &&
    (pcoLevel === 'high' || pcoLevel === 'medium') &&
    (odLevel === 'low' || odLevel === 'none')
  ) {
    return 'type-c';
  }

  // Type D: PCO & OD high/medium, but AE is low/none
  if (
    (pcoLevel === 'high' || pcoLevel === 'medium') &&
    (odLevel === 'high' || odLevel === 'medium') &&
    (aeLevel === 'low' || aeLevel === 'none')
  ) {
    return 'type-d';
  }

  // Subtypes (Reproductive, Metabolic, Mixed) - simplified logic for demo
  // In real app, these would be based on specific question scores
  // For demo: using balance of metrics
  const aeValue = androgenExcess;
  const pcoValue = polycysticOvaries;
  const odValue = ovulatoryDysfunction;

  // Reproductive: OD dominant
  if (odValue > aeValue && odValue > pcoValue && odValue >= 7) {
    return 'reproductive';
  }

  // Metabolic: AE dominant
  if (aeValue > odValue && aeValue > pcoValue && aeValue >= 7) {
    return 'metabolic';
  }

  // Mixed: balanced high values
  if (aeValue >= 5 && pcoValue >= 5 && odValue >= 5) {
    return 'mixed';
  }

  return 'unclear';
};

export const getPCOSTypeLabel = (type: PCOSType): string => {
  const labels: Record<PCOSType, string> = {
    'unclear': 'Unclear - Not enough data',
    'type-a': 'Type A: Androgen excess, ovulatory dysfunction and polycystic ovaries',
    'type-b': 'Type B: Androgen excess and ovulatory dysfunction',
    'type-c': 'Type C: Androgen excess and polycystic ovaries',
    'type-d': 'Type D: Ovulatory dysfunction and polycystic ovaries',
    'reproductive': 'Reproductive Phenotype',
    'metabolic': 'Metabolic Phenotype',
    'mixed': 'Mixed Phenotype'
  };
  return labels[type];
};
