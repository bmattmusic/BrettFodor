'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useChat } from 'ai/react'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "If you were a time traveler, which era would you visit first?",
    options: ["Roaring 20s", "Groovy 70s", "Radical 80s", "Grunge 90s"]
  },
  {
    id: 2,
    question: "Your perfect Saturday involves...",
    options: ["Art gallery hopping", "Street food festival", "Music festival", "Cozy bookstore browsing"]
  },
  {
    id: 3,
    question: "Pick a fictional character's wardrobe:",
    options: ["Wednesday Addams", "The Dude (Big Lebowski)", "Cher (Clueless)", "Neo (The Matrix)"]
  }
  // Add more fun questions...
]

export function FashionPersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [generating, setGenerating] = useState(false)
  
  const { messages, append } = useChat()

  async function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(curr => curr + 1)
    } else {
      setGenerating(true)
      // Generate personality result using AI
      await append({
        role: 'user',
        content: `Based on these answers: ${newAnswers.join(', ')}, create a fun, quirky fashion personality description. Include a made-up fashion archetype name, key characteristics, and style recommendations. Make it entertaining and imaginative.`
      })
      setShowResult(true)
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Discover Your Fashion Alter Ego
      </h2>
      
      {!showResult ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h3 className="text-xl font-medium mb-4">
            {quizQuestions[currentQuestion].question}
          </h3>
          <div className="grid gap-4">
            {quizQuestions[currentQuestion].options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className="p-4 rounded-lg border border-gray-200 hover:border-purple-400 
                  hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose dark:prose-invert max-w-none"
        >
          {generating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.filter(m => m.role === 'assistant').map((message, i) => (
                <div key={i}>
                  {message.content}
                </div>
              ))}
              <button
                onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers([])
                  setShowResult(false)
                }}
                className="mt-8 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
} 