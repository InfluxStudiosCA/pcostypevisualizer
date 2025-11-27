import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileDown, Eye } from 'lucide-react';
import { ReportFilters as ReportFiltersType, TimePeriod, InformationType, Topic } from '@/types/report';

interface ReportFiltersProps {
  onPreview: (filters: ReportFiltersType) => void;
  onDownloadPDF: (filters: ReportFiltersType) => void;
}

export const ReportFilters = ({ onPreview, onDownloadPDF }: ReportFiltersProps) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('last-week');
  const [informationTypes, setInformationTypes] = useState<InformationType[]>(['top-level']);
  const [topics, setTopics] = useState<Topic[]>(['mind', 'body-hormonal', 'body-metabolic', 'body-menstrual', 'body-reproductive', 'spirit']);

  const handleInformationTypeToggle = (type: InformationType) => {
    setInformationTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleTopicToggle = (topic: Topic) => {
    setTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const getFilters = (): ReportFiltersType => ({
    timePeriod,
    informationTypes,
    topics
  });

  return (
    <Card className="p-6 lg:p-8 bg-card border-border">
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-8">
            {/* Time Period Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Time Period</h3>
              <RadioGroup value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="last-week" id="last-week" />
                    <Label htmlFor="last-week" className="font-normal cursor-pointer">The last week</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="21-days" id="21-days" />
                    <Label htmlFor="21-days" className="font-normal cursor-pointer">21 Days</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="35-days" id="35-days" />
                    <Label htmlFor="35-days" className="font-normal cursor-pointer">35 Days</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="last-month" id="last-month" />
                    <Label htmlFor="last-month" className="font-normal cursor-pointer">The last month</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="last-3-months" id="last-3-months" />
                    <Label htmlFor="last-3-months" className="font-normal cursor-pointer">The last 3 months</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="long-term" id="long-term" />
                    <Label htmlFor="long-term" className="font-normal cursor-pointer">Long-term trends</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Information Type Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Information Type</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="top-level" 
                    checked={informationTypes.includes('top-level')}
                    onCheckedChange={() => handleInformationTypeToggle('top-level')}
                  />
                  <Label htmlFor="top-level" className="font-normal cursor-pointer">Just the highlights: top level scores</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="quantitative" 
                    checked={informationTypes.includes('quantitative')}
                    onCheckedChange={() => handleInformationTypeToggle('quantitative')}
                  />
                  <Label htmlFor="quantitative" className="font-normal cursor-pointer">The nuts and bolts: quantitative metrics</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="qualitative" 
                    checked={informationTypes.includes('qualitative')}
                    onCheckedChange={() => handleInformationTypeToggle('qualitative')}
                  />
                  <Label htmlFor="qualitative" className="font-normal cursor-pointer">The buttons and bows: qualitative data</Label>
                </div>
              </div>
            </div>

            {/* Topics Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Topics</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="mind" 
                    checked={topics.includes('mind')}
                    onCheckedChange={() => handleTopicToggle('mind')}
                  />
                  <Label htmlFor="mind" className="font-normal cursor-pointer">Mind</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="body-hormonal" 
                    checked={topics.includes('body-hormonal')}
                    onCheckedChange={() => handleTopicToggle('body-hormonal')}
                  />
                  <Label htmlFor="body-hormonal" className="font-normal cursor-pointer">Body - Hormonal</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="body-metabolic" 
                    checked={topics.includes('body-metabolic')}
                    onCheckedChange={() => handleTopicToggle('body-metabolic')}
                  />
                  <Label htmlFor="body-metabolic" className="font-normal cursor-pointer">Body - Metabolic</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="body-menstrual" 
                    checked={topics.includes('body-menstrual')}
                    onCheckedChange={() => handleTopicToggle('body-menstrual')}
                  />
                  <Label htmlFor="body-menstrual" className="font-normal cursor-pointer">Body - Menstrual</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="body-reproductive" 
                    checked={topics.includes('body-reproductive')}
                    onCheckedChange={() => handleTopicToggle('body-reproductive')}
                  />
                  <Label htmlFor="body-reproductive" className="font-normal cursor-pointer">Body - Reproductive</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="spirit" 
                    checked={topics.includes('spirit')}
                    onCheckedChange={() => handleTopicToggle('spirit')}
                  />
                  <Label htmlFor="spirit" className="font-normal cursor-pointer">Spirit</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex flex-col gap-3 min-w-[180px]">
            <Button onClick={() => onPreview(getFilters())} className="w-full" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview Report
            </Button>
            <Button onClick={() => onDownloadPDF(getFilters())} className="w-full">
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex lg:hidden flex-col sm:flex-row gap-3">
          <Button onClick={() => onPreview(getFilters())} className="flex-1" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Report
          </Button>
          <Button onClick={() => onDownloadPDF(getFilters())} className="flex-1">
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </Card>
  );
};
