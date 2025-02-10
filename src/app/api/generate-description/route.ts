import OpenAI from 'openai'

export async function POST(req: Request) {
  const { productName, features } = await req.json()
  
  const openai = new OpenAI()
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: "Generate an engaging, creative product description for an apparel item."
    }, {
      role: "user",
      content: `Product: ${productName}\nFeatures: ${features.join(', ')}`
    }]
  })
  
  return Response.json({ description: completion.choices[0].message.content })
} 