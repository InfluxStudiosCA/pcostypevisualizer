import { jsPDF } from 'jspdf';
import { ReportData, Topic } from '@/types/report';

const getTopicDisplayName = (topic: Topic): string => {
  const topicMap: Record<Topic, string> = {
    'mind': 'Mind',
    'body-hormonal': 'Body - Hormonal',
    'body-metabolic': 'Body - Metabolic',
    'body-menstrual': 'Body - Menstrual',
    'body-reproductive': 'Body - Reproductive',
    'spirit': 'Spirit'
  };
  return topicMap[topic];
};

const formatTimePeriod = (period: string): string => {
  const periodMap: Record<string, string> = {
    'last-week': 'Last Week',
    '21-days': 'Last 21 Days',
    '35-days': 'Last 35 Days',
    'last-month': 'Last Month',
    'last-3-months': 'Last 3 Months',
    'long-term': 'Long Term'
  };
  return periodMap[period] || period;
};

export const generateReportPDF = (data: ReportData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Header with gradient effect (simulated with rectangles)
  doc.setFillColor(99, 102, 241); // Primary color
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Health Report', margin, 25);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  yPosition = 55;
  
  // Report metadata
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const generatedDate = new Date(data.generatedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated: ${generatedDate}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Time Period: ${formatTimePeriod(data.timePeriod)}`, margin, yPosition);
  yPosition += 15;
  
  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;
  
  // Section: Overall Scores
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Overall Health Scores', margin, yPosition);
  yPosition += 12;
  
  // Calculate average scores for Mind, Body, Spirit
  const mindScore = data.topicScores.find(t => t.topic === 'mind');
  const bodyScores = data.topicScores.filter(t => t.topic.startsWith('body-'));
  const spiritScore = data.topicScores.find(t => t.topic === 'spirit');
  
  const avgBodyScore = bodyScores.length > 0
    ? Math.round(bodyScores.reduce((sum, t) => sum + t.score, 0) / bodyScores.length)
    : 0;
  
  // Draw score cards
  const cardWidth = (pageWidth - 3 * margin) / 3;
  const cardHeight = 35;
  const cardY = yPosition;
  
  // Mind Card
  if (mindScore) {
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(margin, cardY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('Mind', margin + 5, cardY + 10);
    doc.setFontSize(24);
    doc.setTextColor(99, 102, 241);
    doc.text(`${mindScore.score}`, margin + 5, cardY + 25);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`${mindScore.assessmentSessions} sessions`, margin + 5, cardY + 31);
  }
  
  // Body Card
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin + cardWidth + 5, cardY, cardWidth, cardHeight, 3, 3, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Body', margin + cardWidth + 10, cardY + 10);
  doc.setFontSize(24);
  doc.setTextColor(34, 197, 94);
  doc.text(`${avgBodyScore}`, margin + cardWidth + 10, cardY + 25);
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const totalBodySessions = bodyScores.reduce((sum, t) => sum + t.assessmentSessions, 0);
  doc.text(`${totalBodySessions} sessions`, margin + cardWidth + 10, cardY + 31);
  
  // Spirit Card
  if (spiritScore) {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin + 2 * (cardWidth + 5), cardY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('Spirit', margin + 2 * (cardWidth + 5) + 5, cardY + 10);
    doc.setFontSize(24);
    doc.setTextColor(251, 146, 60);
    doc.text(`${spiritScore.score}`, margin + 2 * (cardWidth + 5) + 5, cardY + 25);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`${spiritScore.assessmentSessions} sessions`, margin + 2 * (cardWidth + 5) + 5, cardY + 31);
  }
  
  yPosition = cardY + cardHeight + 20;
  
  // Check if we need a new page
  if (yPosition > pageHeight - 80) {
    doc.addPage();
    yPosition = margin;
  }
  
  // Section: Detailed Breakdown
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Detailed Topic Scores', margin, yPosition);
  yPosition += 12;
  
  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Topic', margin + 3, yPosition + 7);
  doc.text('Score', pageWidth - margin - 70, yPosition + 7);
  doc.text('Sessions', pageWidth - margin - 35, yPosition + 7);
  yPosition += 10;
  
  // Table rows
  doc.setFont('helvetica', 'normal');
  data.topicScores.forEach((topicScore, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
    }
    
    doc.setTextColor(60, 60, 60);
    doc.text(getTopicDisplayName(topicScore.topic), margin + 3, yPosition + 7);
    doc.text(`${topicScore.score}`, pageWidth - margin - 70, yPosition + 7);
    doc.text(`${topicScore.assessmentSessions}`, pageWidth - margin - 35, yPosition + 7);
    yPosition += 10;
  });
  
  // Footer
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by Health Tracking System', pageWidth / 2, footerY, { align: 'center' });
  
  // Generate filename
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `health-report-${dateStr}.pdf`;
  
  // Save the PDF
  doc.save(filename);
};
