export type AnswerValue = 'yes' | 'no' | 'unknown';

export interface Question {
  id: string;
  title: string;
  description: string;
  category: 'physical' | 'period' | 'skin' | 'diagnosis' | 'family';
  type: 'toggle' | 'dropdown';
  options?: string[];
}

export interface Answers {
  [questionId: string]: AnswerValue | string;
}

export interface ScoringCriteria {
  ae: 'high' | 'medium' | 'low' | 'none';
  pco: 'high' | 'medium' | 'low' | 'none';
  od: 'high' | 'medium' | 'low' | 'none';
}

export interface PhenotypeResult {
  type: 'type-a' | 'type-b' | 'type-c' | 'type-d' | 'unclear';
  subtype: 'reproductive' | 'metabolic' | 'mixed' | 'unclear';
  criteria: ScoringCriteria;
}
