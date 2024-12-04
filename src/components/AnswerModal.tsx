'use client';
import React, { useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const AnswerModal = ({ doubtId }: { doubtId: string }) => {
  const [answer, setAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError('Answer is required');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/answer/postAnswer', {
        doubtId, 
        content: answer,
      });

      if (response.status === 201) {
        setAnswer('');
        alert('Answer submitted successfully!');
      }
    } catch (error) {
      console.log('Error posting answer: ', error);
      setError('Failed to submit answer. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 hover:bg-blue-500 text-lg font-semibold">
          Answer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Post Answer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="answer" className="text-left text-lg font-bold">
              Answer
            </Label>
            <Textarea
              id="answer"
              placeholder="Provide a detailed answer..."
              value={answer}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default AnswerModal;
