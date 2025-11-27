export type TimePeriod = 'last-week' | '21-days' | '35-days' | 'last-month' | 'last-3-months' | 'long-term';

export type InformationType = 'top-level' | 'quantitative' | 'qualitative';

export type Topic = 'mind' | 'body-hormonal' | 'body-metabolic' | 'body-menstrual' | 'body-reproductive' | 'spirit';

export interface ReportFilters {
  timePeriod: TimePeriod;
  informationTypes: InformationType[];
  topics: Topic[];
}

export interface TopicScore {
  topic: Topic;
  score: number;
  assessmentSessions: number;
  averageScore: number;
}

// Developer: Connect these interfaces to your actual data models
export interface ReportData {
  generatedDate: string;
  timePeriod: TimePeriod;
  topicScores: TopicScore[];
  // Add additional data fields as needed for quantitative/qualitative sections
}
