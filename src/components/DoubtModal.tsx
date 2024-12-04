'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"

const DoubtModal = () => {
    const [question, setQuestion] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!question || !description) {
            alert("Both question and description are required!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/doubt/postDoubt', {
                question,
                description,
                chapterId : "674f59030e24d4b3f571e063",
                isOwner : true
            });
            console.log("Doubt posted successfully:", response.data);
            alert("Your doubt has been posted successfully!");
            setQuestion("");
            setDescription("");
        } catch (error) {
            console.error("Error posting doubt:", error);
            alert("Failed to post your doubt. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-600 hover:bg-blue-500 text-lg font-semibold">
                    Ask Doubt
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Post Doubt</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="question" className="text-left text-lg font-bold">
                            Question
                        </Label>
                        <Input
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Write your question here..."
                            className="w-full rounded border border-gray-300 p-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-left text-lg font-bold">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a detailed description of your doubt..."
                            className="w-full rounded border border-gray-300 p-2"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className={`w-full text-white py-2 px-4 rounded ${
                                loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DoubtModal;
