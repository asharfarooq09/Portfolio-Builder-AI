import PortfolioForm from "../components/PortfolioForm";

const GeneratorPage = () => {
  return (
    <div>
      <div className="bg-secondary/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">AI Portfolio Generator</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to generate your professional portfolio
          </p>
        </div>
      </div>
      <PortfolioForm />
    </div>
  );
};

export default GeneratorPage;
