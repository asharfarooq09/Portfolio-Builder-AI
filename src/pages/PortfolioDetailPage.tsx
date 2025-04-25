import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolio, Portfolio } from "../lib/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const portfolioData = await getPortfolio(id);
        if (!portfolioData) {
          toast({
            title: "Not Found",
            description: "The requested portfolio could not be found.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }

        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        toast({
          title: "Failed to Load",
          description: "There was an error loading the portfolio.",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [id, navigate]);

  const handleCopyToClipboard = () => {
    if (!portfolio) return;

    navigator.clipboard.writeText(portfolio.formData.content);
    toast({
      title: "Copied!",
      description: "Portfolio content copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-pulse-light">
          <div className="h-10 w-10 bg-primary/50 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {portfolio.formData.name}'s Portfolio
          </h1>
          <p className="text-gray-600">
            Created on{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(portfolio.createdAt.toDate())}
          </p>
        </div>

        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
        </div>
      </div>

      <Card className="shadow-lg border border-gray-200 animate-fade-up">
        <CardContent className="pt-6 flex-grow">
          <p className="text-sm text-gray-500 mb-4">
            Created: {formatDate(portfolio.createdAt)}
          </p>
          <h4 className="text-sm font-medium mb-1">Content:</h4>
          <p className="line-clamp-3 text-sm text-gray-600 mb-4">
            {portfolio.formData.content}
          </p>
          <h4 className="text-sm font-medium mb-1">Skills:</h4>
          <p className="line-clamp-3 text-sm text-gray-600 mb-4">
            {portfolio.formData.skills}
          </p>
          <h4 className="text-sm font-medium mb-1">Projects:</h4>
          <p className="line-clamp-3 text-sm text-gray-600 mb-4">
            {portfolio.formData.projects}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDetailPage;
