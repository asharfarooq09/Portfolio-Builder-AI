import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { generatePortfolio } from "../lib/gemini";
import { savePortfolio, PortfolioFormData } from "../lib/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PortfolioForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<PortfolioFormData>({
    name: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    content: "",
  });

  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        toast({
          title: "Missing Information",
          description: `Please provide your ${key}.`,
          variant: "destructive",
        });
        return;
      }
    }

    setIsGenerating(true);
    try {
      const content = await generatePortfolio(formData);
      console.log(formData);

      setGeneratedContent(content);
      toast({
        title: "Portfolio Generated",
        description: "Your portfolio has been successfully generated!",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!generatedContent) {
      toast({
        title: "Nothing to Save",
        description: "Please generate a portfolio first.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await savePortfolio(currentUser.uid, generatedContent, formData);
      toast({
        title: "Portfolio Saved",
        description: "Your portfolio has been saved successfully!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatFormData = () => {
    if (!formData) return "";

    return `# ${formData.name}'s Portfolio

1. Skills
${formData.skills}

2. Experience
${formData.experience}

3. Education
${formData.education}

4. Projects
${formData.projects}

5. Additional Content
${formData.content}
`;
  };

  const handleCopyToClipboard = () => {
    const markdownContent = formatFormData();
    if (!markdownContent) return;

    navigator.clipboard.writeText(markdownContent);
    toast({
      title: "Copied!",
      description: "Portfolio form data copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const markdownContent = formatFormData();
    if (!markdownContent) return;

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-portfolio.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description:
        "Portfolio form data has been downloaded as a markdown file.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-up">
          <h2 className="text-2xl font-bold mb-6">Create Your Portfolio</h2>
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium mb-2"
              >
                Skills (separate with commas)
              </label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, TypeScript, Node.js, UI/UX Design..."
                className="w-full"
                rows={3}
              />
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium mb-2"
              >
                Work Experience
              </label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Senior Developer at XYZ Corp (2019-Present): Led development of..."
                className="w-full"
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="customContent"
                className="block text-sm font-medium mb-2"
              >
                Custom Content (you can edit or paste here)
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Once generated, you can tweak your markdown here..."
                className="w-full"
                rows={4}
              />
            </div>

            <div>
              <label
                htmlFor="education"
                className="block text-sm font-medium mb-2"
              >
                Education
              </label>
              <Textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="BS in Computer Science, University of ABC (2015-2019)"
                className="w-full"
                rows={3}
              />
            </div>

            <div>
              <label
                htmlFor="projects"
                className="block text-sm font-medium mb-2"
              >
                Projects
              </label>
              <Textarea
                id="projects"
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                placeholder="E-commerce Platform: Developed a full-stack application using..."
                className="w-full"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Portfolio"}
            </Button>
          </form>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Portfolio Preview</h2>
            {generatedContent && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleCopyToClipboard}
                  className="text-sm"
                >
                  Copy to Clipboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="text-sm"
                >
                  Download
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-sm"
                >
                  {isSaving ? "Saving..." : "Save Portfolio"}
                </Button>
              </div>
            )}
          </div>

          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6">
              {generatedContent ? (
                <CardContent className="pt-6 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">
                    {formData.name}
                  </h3>
                  <h4 className="text-sm font-medium mb-1">Content:</h4>
                  <p className="line-clamp-3 text-sm text-gray-600 mb-4">
                    {formData.content}
                  </p>
                  <h4 className="text-sm font-medium mb-1">Skills:</h4>
                  <p className="line-clamp-3 text-sm text-gray-600 mb-4">
                    {formData.skills}
                  </p>
                  <h4 className="text-sm font-medium mb-1">Projects:</h4>
                  <p className="line-clamp-3 text-sm text-gray-600 mb-4">
                    {formData.projects}
                  </p>
                </CardContent>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  {isGenerating ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-pulse-light">
                        <div className="h-10 w-10 bg-primary/50 rounded-full"></div>
                      </div>
                      <p className="mt-4">Generating your portfolio...</p>
                    </div>
                  ) : (
                    <p>
                      Fill out the form and click Generate to see your portfolio
                      preview
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;
