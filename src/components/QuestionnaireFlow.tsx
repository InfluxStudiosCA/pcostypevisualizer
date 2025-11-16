import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import ThreeWayToggle from './ThreeWayToggle';
import PCOSVisualizer from './PCOSVisualizer';
import { questions, categoryTitles } from '@/data/questions';
import { Answers, AnswerValue } from '@/types/questionnaire';
import { usePhenotypeScoring } from '@/hooks/usePhenotypeScoring';
import { getPCOSTypeLabel } from '@/hooks/usePCOSType';
import loopLogo from '@/assets/loop-logo.png';

const QuestionnaireFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  
  // Initialize all answers to 'unknown'
  useState(() => {
    const initialAnswers: Answers = {};
    questions.forEach(q => {
      if (q.type === 'toggle') {
        initialAnswers[q.id] = 'unknown';
      } else if (q.type === 'dropdown') {
        initialAnswers[q.id] = '';
      }
    });
    setAnswers(initialAnswers);
  });

  const { result, metrics } = usePhenotypeScoring(answers);

  // Group questions by category for step navigation
  const questionsByCategory = questions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {} as Record<string, typeof questions>);

  const categories = ['physical', 'period', 'skin', 'diagnosis', 'family'] as const;
  const currentCategory = categories[currentStep];
  const currentQuestions = questionsByCategory[currentCategory] || [];

  const handleAnswer = (questionId: string, value: AnswerValue | string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const goToNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    const initialAnswers: Answers = {};
    questions.forEach(q => {
      if (q.type === 'toggle') {
        initialAnswers[q.id] = 'unknown';
      } else if (q.type === 'dropdown') {
        initialAnswers[q.id] = '';
      }
    });
    setAnswers(initialAnswers);
    setCurrentStep(0);
  };

  const progressPercent = ((currentStep + 1) / categories.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
          {/* Left Side - Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <img src={loopLogo} alt="Loop by Neuraura" className="h-16" />
              <div className="w-20" /> {/* Spacer for centering logo */}
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">Advanced Setup</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {categories.length}
              </p>
              <Progress value={progressPercent} className="h-2" />
            </div>

            {currentStep === 0 && (
              <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-foreground text-sm">
                    We would love to learn a little about your experience with PCOS to help us personalize your MyLoOoP experience.
                  </p>
                  <p className="text-foreground text-sm">
                    By answering these questions on some of the most common symptoms of PCOS we'll be able to provide information and insights that are more relevant to you.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    It's ok if you don't want to answer these questions or if you want to come back to them later.
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    Click here to read our full privacy policy
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                {categoryTitles[currentCategory]}
              </h2>

              <div className="space-y-4">
                {currentQuestions.map((question) => (
                  <Card key={question.id} className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="font-semibold text-foreground">{question.title}</h3>
                      {question.description && (
                        <p className="text-sm text-muted-foreground">{question.description}</p>
                      )}
                      
                      {question.type === 'toggle' ? (
                        <div className="pt-2">
                          <ThreeWayToggle
                            value={answers[question.id] as AnswerValue || 'unknown'}
                            onChange={(value) => handleAnswer(question.id, value)}
                          />
                        </div>
                      ) : question.type === 'dropdown' ? (
                        <Select
                          value={answers[question.id] as string || ''}
                          onValueChange={(value) => handleAnswer(question.id, value)}
                        >
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-card">
                            {question.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              {currentStep < categories.length - 1 ? (
                <Button
                  onClick={goToNext}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    // Scroll to top to see the full results visualization
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="gap-2"
                >
                  Complete Assessment
                </Button>
              )}
            </div>
          </div>

          {/* Right Side - Real-time Phenotype Visualization */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
              <CardContent className="pt-6 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Your PCOS Profile</h2>
                  <p className="text-sm text-muted-foreground">
                    This assessment updates in real-time as you answer questions
                  </p>
                </div>

                <div className="flex justify-center py-8">
                  <PCOSVisualizer 
                    metrics={metrics}
                    type={result.type}
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-background/20 backdrop-blur-md border border-primary/20 shadow-md">
                    <h3 className="font-semibold text-foreground mb-2">Four-Cluster Model</h3>
                    <p className="text-sm text-foreground">
                      {result.type !== 'unclear' 
                        ? getPCOSTypeLabel(result.type)
                        : 'Keep answering questions to determine your PCOS type'}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/20 backdrop-blur-md border border-primary/20 shadow-md">
                    <h3 className="font-semibold text-foreground mb-2">Alternative Classification</h3>
                    <p className="text-sm text-muted-foreground mb-1 italic">A simpler, more intuitive way to understand your PCOS type</p>
                    <p className="text-sm text-foreground">
                      {result.subtype !== 'unclear'
                        ? getPCOSTypeLabel(result.subtype)
                        : 'Complete more questions to see your alternative classification'}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-background/20 backdrop-blur-md border border-primary/20 shadow-md space-y-2">
                    <h3 className="font-semibold text-foreground mb-2">Scoring Breakdown</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Androgen Excess (AE):</span>
                        <span className="font-medium text-foreground uppercase">{result.criteria.ae}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Polycystic Ovaries (PCO):</span>
                        <span className="font-medium text-foreground uppercase">{result.criteria.pco}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ovulatory Dysfunction (OD):</span>
                        <span className="font-medium text-foreground uppercase">{result.criteria.od}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center italic">
                    * This is an assessment based on your responses, not a medical diagnosis. Please consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireFlow;
