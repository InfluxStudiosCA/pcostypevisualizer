import QuestionnaireFlow from '@/components/QuestionnaireFlow';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-6">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>
        <QuestionnaireFlow />
      </div>
    </div>
  );
};

export default Index;
