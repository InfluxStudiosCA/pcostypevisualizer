import QuestionnaireFlow from '@/components/QuestionnaireFlow';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/reports">
            <Button variant="outline">View Reports</Button>
          </Link>
          <ThemeToggle />
        </div>
        <QuestionnaireFlow />
      </div>
    </div>
  );
};

export default Index;
