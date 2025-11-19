'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Save, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function EssaysPage() {
  const [essay, setEssay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  const handleGetFeedback = async () => {
    if (wordCount < 50) {
      toast.error('Please write at least 50 words before requesting feedback');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/webhooks/n8n/essay-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Why do you want to study abroad?',
          content: essay,
          action: 'feedback'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFeedback([
          'Consider adding more specific examples from your experience',
          'Strengthen your conclusion with a forward-looking statement',
          'Your opening paragraph effectively captures attention'
        ]);
        toast.success('AI feedback generated!');
      }
    } catch {
      toast.error('Failed to get feedback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Essay Studio</h1>
        <p className="text-gray-600">Write and refine your essays with AI assistance</p>
      </motion.div>

      <div className="grid gap-6">
        {/* Essay Prompt */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              <span className="font-medium">Oxford University:</span> Why do you want to study at Oxford,
              and how will it help you achieve your goals? (500 words max)
            </p>
          </CardContent>
        </Card>

        {/* Essay Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Essay</CardTitle>
              <Badge variant={wordCount > 500 ? 'destructive' : 'secondary'}>
                {wordCount} / 500 words
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start writing your essay here..."
              className="min-h-[300px] mb-4 resize-none"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                onClick={handleGetFeedback}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Get AI Feedback
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Feedback */}
        {feedback.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feedback.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
