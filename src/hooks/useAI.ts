import { useState } from 'react';
import { Course, Deadline } from '../types';

// Using fetch directly to avoid browser polyfill issues with the official SDK
const generateContent = async (prompt: string, apiKey: string) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We check specifically for VITE_ prefixed keys, but fallback to runtime injection logic.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  const getDashboardInsight = async (courses: Course[], deadlines: Deadline[]) => {
    if (!apiKey) {
      setError('Missing VITE_GEMINI_API_KEY');
      return null;
    }
    setLoading(true);
    try {
      const prompt = `You are a brutal, highly analytical AI study dashboard. 
Your goal is to give a 1-sentence brutally honest, constructive academic insight.
Here are the user's courses: ${JSON.stringify(courses.map(c => ({ code: c.code, progress: c.gradeProgress })))}
Here are upcoming deadlines: ${JSON.stringify(deadlines)}
Write exactly one short, bold sentence advising the user what to focus on today. Format course codes in ALL CAPS.`;
      
      const insight = await generateContent(prompt, apiKey);
      return insight;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStudyPriorities = async (courses: Course[], deadlines: Deadline[]) => {
    if (!apiKey) {
      setError('Missing VITE_GEMINI_API_KEY');
      return null;
    }
    setLoading(true);
    try {
      const prompt = `You are an AI study assistant. Generate exactly 3 study priority tasks based on this data:
Courses: ${JSON.stringify(courses)}
Deadlines: ${JSON.stringify(deadlines)}

Return ONLY valid JSON in this exact structure:
[
  { 
    "title": "[Course Code]: [Short Task]", 
    "desc": "[1 sentence explanation of why this matters]", 
    "priority": "critical" | "high" | "medium"
  }
]`;
      
      let res = await generateContent(prompt, apiKey);
      res = res.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(res);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getDashboardInsight, getStudyPriorities, loading, error };
}
