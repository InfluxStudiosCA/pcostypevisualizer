import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ReportFilters } from '@/components/ReportFilters';
import { ReportDisplay } from '@/components/ReportDisplay';
import { ReportFilters as ReportFiltersType, ReportData } from '@/types/report';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Reports = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handlePreview = (filters: ReportFiltersType) => {
    // Developer: Replace this with actual API call to fetch report data
    // Example: const data = await fetchReportData(filters);
    
    // Mock data for design purposes
    const mockData: ReportData = {
      generatedDate: new Date().toISOString(),
      timePeriod: filters.timePeriod,
      topicScores: filters.topics.map(topic => ({
        topic,
        score: Math.floor(Math.random() * 100),
        assessmentSessions: Math.floor(Math.random() * 20) + 1,
        averageScore: Math.random() * 100
      }))
    };

    setReportData(mockData);
    setShowPreview(true);
    toast.success('Report preview generated');
  };

  const handleDownloadPDF = (filters: ReportFiltersType) => {
    // Developer: Implement PDF generation and download functionality
    // You can use libraries like jsPDF or react-pdf
    // Example:
    // const pdfData = generatePDF(filters);
    // downloadPDF(pdfData);
    
    toast.success('PDF download started (placeholder)');
    console.log('Download PDF with filters:', filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 space-y-6">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 lg:gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
                <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </Link>
            <h1 className="text-xl lg:text-3xl font-bold text-foreground">Health Reports</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Filters Section - Top 1/3 */}
        <ReportFilters onPreview={handlePreview} onDownloadPDF={handleDownloadPDF} />

        {/* Report Preview Section - Bottom 2/3 */}
        {showPreview && reportData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ReportDisplay data={reportData} />
          </div>
        )}

        {!showPreview && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Select your filters and click "Preview Report" to see your health report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
