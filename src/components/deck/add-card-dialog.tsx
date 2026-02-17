"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function AddCardDialog({ deckId }: { deckId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>("STANDARD");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [codeTemplate, setCodeTemplate] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [blankAnswers, setBlankAnswers] = useState("");

  function resetForm() {
    setType("STANDARD");
    setFront("");
    setBack("");
    setCodeTemplate("");
    setCodeLanguage("javascript");
    setExpectedOutput("");
    setCodeSnippet("");
    setBlankAnswers("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const cardData: Record<string, unknown> = {
      deckId,
      type,
      front,
      back,
    };

    if (type === "CODE") {
      cardData.codeTemplate = codeTemplate;
      cardData.codeLanguage = codeLanguage;
      cardData.expectedOutput = expectedOutput || undefined;
    } else if (type === "FILL_IN_BLANK") {
      cardData.codeSnippet = codeSnippet;
      cardData.blankAnswers = blankAnswers.split(",").map((a) => a.trim()).filter(Boolean);
    }

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create card");
      }

      toast.success("Card added!");
      resetForm();
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add card");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
          <DialogDescription>
            Create a flashcard for this deck
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={type} onValueChange={setType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="STANDARD">Standard</TabsTrigger>
              <TabsTrigger value="CODE">Code</TabsTrigger>
              <TabsTrigger value="FILL_IN_BLANK">Fill-in-Blank</TabsTrigger>
            </TabsList>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="front">Front (Question) *</Label>
                <textarea
                  id="front"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Enter the question..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="back">Back (Answer) *</Label>
                <textarea
                  id="back"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Enter the answer..."
                  required
                />
              </div>

              <TabsContent value="CODE" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codeTemplate">Code Template *</Label>
                  <textarea
                    id="codeTemplate"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-code ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={codeTemplate}
                    onChange={(e) => setCodeTemplate(e.target.value)}
                    placeholder="// Starter code for the user..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedOutput">Expected Output</Label>
                  <Input
                    id="expectedOutput"
                    value={expectedOutput}
                    onChange={(e) => setExpectedOutput(e.target.value)}
                    placeholder="Expected console output"
                  />
                </div>
              </TabsContent>

              <TabsContent value="FILL_IN_BLANK" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="codeSnippet">
                    Code Snippet (use {"{{answer}}"} for blanks) *
                  </Label>
                  <textarea
                    id="codeSnippet"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-code ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder={`const result = arr.{{filter}}((item) => item > 5)`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blankAnswers">
                    Answers (comma-separated, in order)
                  </Label>
                  <Input
                    id="blankAnswers"
                    value={blankAnswers}
                    onChange={(e) => setBlankAnswers(e.target.value)}
                    placeholder="filter"
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Add Card
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
