import { Card } from '@/components/ui/card';
import { ReportData, Topic } from '@/types/report';
import { ChevronDown } from 'lucide-react';
import mindIcon from '@/assets/mind-icon.png';
import bodyIcon from '@/assets/body-icon.png';
import spiritIcon from '@/assets/spirit-icon.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';

interface ReportDisplayProps {
  data: ReportData;
}

const topicColors: Record<string, string> = {
  'mind': 'bg-background/40 backdrop-blur-md border border-foreground/10',
  'body': 'bg-background/40 backdrop-blur-md border border-foreground/10',
  'spirit': 'bg-background/40 backdrop-blur-md border border-foreground/10'
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
    'body-hormonal': 'Hormonal',
    'body-metabolic': 'Metabolic',
    'body-menstrual': 'Menstrual',
    'body-reproductive': 'Reproductive',
    'spirit': 'Spirit'
  };
  return map[topic];
};

export const ReportDisplay = ({ data }: ReportDisplayProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Group body topics
  const bodyTopics = data.topicScores.filter(t => t.topic.startsWith('body-'));
  const mindScore = data.topicScores.find(t => t.topic === 'mind');
  const spiritScore = data.topicScores.find(t => t.topic === 'spirit');
  
  // Calculate average body score
  const avgBodyScore = bodyTopics.length > 0 
    ? Math.round(bodyTopics.reduce((sum, t) => sum + t.score, 0) / bodyTopics.length)
    : 0;

  const toggleSection = (topic: string) => {
    setOpenSections(prev => ({ ...prev, [topic]: !prev[topic] }));
  };

  // Developer: Replace this mock data with actual data from your backend
  
  return (
    <Card className="p-4 lg:p-8 bg-card border-border">
      <div className="space-y-6">
        {/* Report Header */}
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">MyLoOoP Health Report</h2>
          <div className="text-xs lg:text-sm text-muted-foreground">
            <p>Time Period: {formatTimePeriod(data.timePeriod)}</p>
            <p>Generated: {new Date(data.generatedDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Top Level Scores - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Mind Card */}
          {mindScore && (
            <Card className={`p-6 ${topicColors.mind} shadow-lg`}>
              <div className="flex flex-col items-center text-center space-y-3">
                <img src={mindIcon} alt="Mind" className="h-16 w-16" />
                <h3 className="font-semibold text-lg text-foreground">Mind</h3>
                <p className="text-3xl font-bold text-foreground">{mindScore.score}</p>
              </div>
            </Card>
          )}

          {/* Body Card - Combined */}
          <Card className={`p-6 ${topicColors.body} shadow-lg`}>
            <div className="flex flex-col items-center text-center space-y-3">
              <img src={bodyIcon} alt="Body" className="h-16 w-16" />
              <h3 className="font-semibold text-lg text-foreground">Body</h3>
              <p className="text-3xl font-bold text-foreground">{avgBodyScore}</p>
            </div>
          </Card>

          {/* Spirit Card */}
          {spiritScore && (
            <Card className={`p-6 ${topicColors.spirit} shadow-lg`}>
              <div className="flex flex-col items-center text-center space-y-3">
                <img src={spiritIcon} alt="Spirit" className="h-16 w-16" />
                <h3 className="font-semibold text-lg text-foreground">Spirit</h3>
                <p className="text-3xl font-bold text-foreground">{spiritScore.score}</p>
              </div>
            </Card>
          )}
        </div>

        {/* Detailed Collapsible Topic Breakdowns */}
        <div className="space-y-3">
          {/* Mind Details */}
          {mindScore && (
            <Collapsible open={openSections.mind} onOpenChange={() => toggleSection('mind')}>
              <Card className="overflow-hidden border-border">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="text-lg font-bold text-foreground">Mind</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openSections.mind ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-4 space-y-2 text-sm text-foreground">
                    <p>Assessment Sessions: {mindScore.assessmentSessions}</p>
                    <p>Average Score: {mindScore.averageScore.toFixed(1)}</p>
                    {/* Developer: Connect to your data architecture here
                        Add metrics like: mood trends, stress levels, mental clarity scores, etc. */}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* Body Details - with subcategories */}
          <Collapsible open={openSections.body} onOpenChange={() => toggleSection('body')}>
            <Card className="overflow-hidden border-border">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-bold text-foreground">Body</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openSections.body ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-4 space-y-4">
                  {bodyTopics.map((topicScore) => (
                    <div key={topicScore.topic} className="border-l-2 border-primary pl-4 space-y-1">
                      <h4 className="font-semibold text-foreground">{getTopicDisplayName(topicScore.topic)}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Score: {topicScore.score}</p>
                        <p>Sessions: {topicScore.assessmentSessions}</p>
                        <p>Average: {topicScore.averageScore.toFixed(1)}</p>
                      </div>
                      {/* Developer: Connect subcategory-specific metrics:
                          - Hormonal: hormone levels, cycle tracking
                          - Metabolic: weight, energy, blood sugar
                          - Menstrual: cycle regularity, symptoms
                          - Reproductive: fertility markers, concerns */}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Spirit Details */}
          {spiritScore && (
            <Collapsible open={openSections.spirit} onOpenChange={() => toggleSection('spirit')}>
              <Card className="overflow-hidden border-border">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="text-lg font-bold text-foreground">Spirit</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openSections.spirit ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-4 space-y-2 text-sm text-foreground">
                    <p>Assessment Sessions: {spiritScore.assessmentSessions}</p>
                    <p>Average Score: {spiritScore.averageScore.toFixed(1)}</p>
                    {/* Developer: Connect to your data architecture here
                        Add metrics like: mindfulness practices, gratitude entries, connection scores, etc. */}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}
        </div>

        {/* Footer Note for Developer */}
        <div className="text-xs text-muted-foreground italic border-t border-border pt-4">
          Developer Note: This is a design mockup. Connect each metric to your actual journaling data. 
          Use the filters from ReportFilters to fetch and populate the data structure.
        </div>
      </div>
    </Card>
  );
};
