import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Portfolio, deletePortfolio } from "../lib/firestore";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PortfolioCardProps {
  portfolio: Portfolio;
  onDelete: () => void;
}

const PortfolioCard = ({ portfolio, onDelete }: PortfolioCardProps) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePortfolio(portfolio.id);
      toast({
        title: "Portfolio Deleted",
        description: "Your portfolio has been successfully deleted.",
      });
      onDelete();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="card-hover h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-lg font-semibold mb-2">
          {portfolio.formData.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Created: {formatDate(portfolio.createdAt)}
        </p>
        <p className="line-clamp-3 text-sm text-gray-600 mb-4">
          {portfolio.formData.content}
        </p>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">Skills</h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {portfolio.formData.skills}
          </p>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        <Link to={`/portfolio/${portfolio.id}`}>
          <Button variant="outline">View</Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                portfolio.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PortfolioCard;
