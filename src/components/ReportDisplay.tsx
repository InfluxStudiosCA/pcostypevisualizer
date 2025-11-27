import { Card } from '@/components/ui/card';
import { ReportData, Topic } from '@/types/report';
import { Brain, Activity, Sparkles } from 'lucide-react';

interface ReportDisplayProps {
  data: ReportData;
}

const topicColors: Record<Topic, string> = {
  'mind': 'bg-[hsl(174,66%,62%)] text-white',
  'body-hormonal': 'bg-[hsl(258,84%,65%)] text-white',
  'body-metabolic': 'bg-[hsl(258,84%,65%)] text-white',
  'body-menstrual': 'bg-[hsl(258,84%,65%)] text-white',
  'body-reproductive': 'bg-[hsl(258,84%,65%)] text-white',
  'spirit': 'bg-[hsl(293,84%,73%)] text-white'
};

const topicIcons: Record<string, React.ReactNode> = {
  'mind': <Brain className="h-6 w-6" />,
  'body': <Activity className="h-6 w-6" />,
  'spirit': <Sparkles className="h-6 w-6" />
};

const formatTimePeriod = (period: string) => {
  const map: Record<string, string> = {
    'last-week': 'WEEK',
    '21-days': '21 DAYS',
    '35-days': '35 DAYS',
    'last-month': 'MONTH',
    'last-3-months': '3 MONTHS',
    'long-term': 'LONG TERM'
  };
  return map[period] || period;
};

const getTopicDisplayName = (topic: Topic) => {
  const map: Record<Topic, string> = {
    'mind': 'Mind',
    'body-hormonal': 'Body - Hormonal',
    'body-metabolic': 'Body - Metabolic',
    'body-menstrual': 'Body - Menstrual',
    'body-reproductive': 'Body - Reproductive',
    'spirit': 'Spirit'
  };
  return map[topic];
};

const getTopicIcon = (topic: Topic) => {
  if (topic === 'mind') return topicIcons.mind;
  if (topic === 'spirit') return topicIcons.spirit;
  return topicIcons.body;
};

export const ReportDisplay = ({ data }: ReportDisplayProps) => {
  // Developer: Replace this mock data with actual data from your backend
  // You can fetch data based on the filters passed to this component
  
  return (
    <Card className="p-6 lg:p-8 bg-card border-border">
      <div className="space-y-8">
        {/* Report Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">MyLoOoP Health Report</h2>
          <div className="text-sm text-muted-foreground">
            <p>Time Period: {formatTimePeriod(data.timePeriod)}</p>
            <p>Generated: {new Date(data.generatedDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Top Level Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.topicScores.map((topicScore) => {
            const baseCategory = topicScore.topic.split('-')[0] as 'mind' | 'body' | 'spirit';
            const colorClass = topicColors[topicScore.topic];
            
            return (
              <Card 
                key={topicScore.topic} 
                className={`p-6 ${colorClass} border-0`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  {getTopicIcon(topicScore.topic)}
                  <h3 className="font-semibold text-sm">
                    {baseCategory.charAt(0).toUpperCase() + baseCategory.slice(1)}
                  </h3>
                  <p className="text-5xl font-bold">{topicScore.score}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Topic Breakdowns */}
        <div className="space-y-6">
          {data.topicScores.map((topicScore) => (
            <Card key={topicScore.topic} className="p-6 bg-muted/30 border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {getTopicDisplayName(topicScore.topic)}
              </h3>
              <div className="space-y-2 text-foreground">
                <p>Assessment Sessions: {topicScore.assessmentSessions}</p>
                <p>Average Score: {topicScore.averageScore.toFixed(1)}</p>
                {/* Developer: Add additional metrics here based on informationType filters:
                    - For 'quantitative': Add detailed numerical metrics, charts, trends
                    - For 'qualitative': Add text summaries, journal entries, insights
                    Example:
                    {includesQuantitative && (
                      <div className="mt-4">
                        <h4>Detailed Metrics</h4>
                        <ul>
                          <li>Metric 1: {data.metric1}</li>
                          <li>Metric 2: {data.metric2}</li>
                        </ul>
                      </div>
                    )}
                */}
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Note for Developer */}
        <div className="text-sm text-muted-foreground italic border-t border-border pt-4">
          Developer Note: This is a design mockup. Connect the data points above to your actual 
          journaling data architecture. Use the filters from ReportFilters to fetch appropriate 
          data from your backend API.
        </div>
      </div>
    </Card>
  );
};
