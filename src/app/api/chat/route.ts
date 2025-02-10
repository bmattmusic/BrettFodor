import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a fun, quirky AI fashion personality expert. 
        Create entertaining and imaginative fashion personas based on quiz answers.
        Include made-up archetype names, personality traits, and style recommendations.
        Be creative and humorous while keeping suggestions tasteful and wearable.`
      },
      ...messages
    ]
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
} 