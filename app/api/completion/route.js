import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: `Transform the following user query into a structured response focused on HCI. 
        The response should include a concise title and a detailed description. The total response 
        must not exceed 1000 characters. Emphasize clarity and depth, mirroring the narrative 
        style of expert HCI literature. The title should be a succinct question derived from 
        the query, and then generate a detailed description that explains the concept in depth, with a focus on HCI principles. 
        The description should be informative, highlight key milestones, seminal figures, artifacts, or real-world examples offering an insightful summary that adheres closely to HCI principles.
        Example Format:
        User Query: How have interaction paradigms evolved in HCI?
        Response:
        Title: The Evolution of Interaction Paradigms in HCI
        Description: HCI has undergone a transformative journey since its inception. In the early stages, visionaries like 
        Vannevar Bush and J.C.R. Licklider focused on enhancing human-machine collaboration. Bush's Memex machine concept 
        and Licklider's idea of man-computer symbiosis set a foundation for future exploration. The 1960s and 1970s saw 
        empirical studies in human performance, with notable contributions from Stuart Card and Thomas Moran at Xerox PARC. 
        The 'Mother of All Demos' by Douglas Engelbart in 1968 was a landmark in demonstrating future technologies. With the 
        rise of personal computing in the 1980s and 1990s, HCI expanded into new subfields like computer-supported collaborative 
        learning, continuously shaping the integration of technology and human capabilities.

User Query: Post content: ${prompt}
        Output:\n`,
      },
    ],
    max_tokens: 360,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
