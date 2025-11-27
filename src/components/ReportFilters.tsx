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
    <Card className="p-4 lg:p-6 bg-card border-border">
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1 space-y-4">
            {/* Time Period Section */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Time Period</h3>
              <RadioGroup value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last-week" id="last-week" />
                    <Label htmlFor="last-week" className="text-xs font-normal cursor-pointer">Week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="21-days" id="21-days" />
                    <Label htmlFor="21-days" className="text-xs font-normal cursor-pointer">21 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="35-days" id="35-days" />
                    <Label htmlFor="35-days" className="text-xs font-normal cursor-pointer">35 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last-month" id="last-month" />
                    <Label htmlFor="last-month" className="text-xs font-normal cursor-pointer">Month</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last-3-months" id="last-3-months" />
                    <Label htmlFor="last-3-months" className="text-xs font-normal cursor-pointer">3 Months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long-term" id="long-term" />
                    <Label htmlFor="long-term" className="text-xs font-normal cursor-pointer">Long Term</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Information Type Section */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Information Type</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="top-level" 
                    checked={informationTypes.includes('top-level')}
                    onCheckedChange={() => handleInformationTypeToggle('top-level')}
                  />
                  <Label htmlFor="top-level" className="text-xs font-normal cursor-pointer">Top Level Scores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quantitative" 
                    checked={informationTypes.includes('quantitative')}
                    onCheckedChange={() => handleInformationTypeToggle('quantitative')}
                  />
                  <Label htmlFor="quantitative" className="text-xs font-normal cursor-pointer">Quantitative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="qualitative" 
                    checked={informationTypes.includes('qualitative')}
                    onCheckedChange={() => handleInformationTypeToggle('qualitative')}
                  />
                  <Label htmlFor="qualitative" className="text-xs font-normal cursor-pointer">Qualitative</Label>
                </div>
              </div>
            </div>

            {/* Topics Section */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Topics</h3>
              <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mind" 
                    checked={topics.includes('mind')}
                    onCheckedChange={() => handleTopicToggle('mind')}
                  />
                  <Label htmlFor="mind" className="text-xs font-normal cursor-pointer">Mind</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="body-hormonal" 
                    checked={topics.includes('body-hormonal')}
                    onCheckedChange={() => handleTopicToggle('body-hormonal')}
                  />
                  <Label htmlFor="body-hormonal" className="text-xs font-normal cursor-pointer">Hormonal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="body-metabolic" 
                    checked={topics.includes('body-metabolic')}
                    onCheckedChange={() => handleTopicToggle('body-metabolic')}
                  />
                  <Label htmlFor="body-metabolic" className="text-xs font-normal cursor-pointer">Metabolic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="body-menstrual" 
                    checked={topics.includes('body-menstrual')}
                    onCheckedChange={() => handleTopicToggle('body-menstrual')}
                  />
                  <Label htmlFor="body-menstrual" className="text-xs font-normal cursor-pointer">Menstrual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="body-reproductive" 
                    checked={topics.includes('body-reproductive')}
                    onCheckedChange={() => handleTopicToggle('body-reproductive')}
                  />
                  <Label htmlFor="body-reproductive" className="text-xs font-normal cursor-pointer">Reproductive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="spirit" 
                    checked={topics.includes('spirit')}
                    onCheckedChange={() => handleTopicToggle('spirit')}
                  />
                  <Label htmlFor="spirit" className="text-xs font-normal cursor-pointer">Spirit</Label>
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
        <div className="flex lg:hidden flex-col sm:flex-row gap-2">
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
