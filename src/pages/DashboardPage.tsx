import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserPortfolios, Portfolio } from "../lib/firestore";
import { Button } from "@/components/ui/button";
import PortfolioCard from "../components/PortfolioCard";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolios = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const userPortfolios = await getUserPortfolios(currentUser.uid);
      setPortfolios(userPortfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      toast({
        title: "Failed to Load",
        description: "There was an error loading your portfolios.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [currentUser]);

  const handlePortfolioDeleted = () => {
    fetchPortfolios();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Portfolios</h1>
          <p className="text-gray-600">Manage your generated portfolios</p>
        </div>
        <Link to="/generator" className="mt-4 md:mt-0">
          <Button>Create New Portfolio</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse-light">
            <div className="h-10 w-10 bg-primary/50 rounded-full"></div>
          </div>
        </div>
      ) : portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="animate-fade-up">
              <PortfolioCard
                portfolio={portfolio}
                onDelete={handlePortfolioDeleted}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No portfolios yet</h3>
          <p className="text-gray-600 mb-6">
            You haven't created any portfolios yet. Create your first portfolio
            now!
          </p>
          <Link to="/generator">
            <Button>Create Portfolio</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
