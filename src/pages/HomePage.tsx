import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <section className="container mx-auto py-16 px-4 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Create Professional Portfolios with{" "}
              <span className="text-primary">AI</span> in Minutes
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your experience and skills into a stunning portfolio
              using our AI-powered generation tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {currentUser ? (
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl animate-fade-up delay-150">
            <img
              src="/heroImage.webp"
              alt="AI Portfolio Generation"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16 px-4 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform creates professional portfolios in just
              three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Input Your Details</h3>
              <p className="text-muted-foreground">
                Enter your skills, experience, education, and projects into our
                simple form.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Generation</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your information and creates a professional,
                well-structured portfolio.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Save & Share</h3>
              <p className="text-muted-foreground">
                Preview your portfolio, save it to your account, and copy to use
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 md:py-24">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have created stunning portfolios
            using our AI-powered platform.
          </p>
          <Link to="/login">
            <Button size="lg" className="px-8">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
