
import { GoogleGenAI } from "@google/genai";
import type { ProfileData } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder check. In a real environment, the key would be set.
  // We will proceed assuming it's available for the purpose of this generation.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const buildPrompt = (data: ProfileData): string => {
  return `
You are an expert GitHub profile README generator. Your task is to create a visually appealing, professional, and creative README.md file in Markdown format based on the user's provided information.

**User Information:**
- GitHub Username: ${data.username}
- Name/Nickname: ${data.name || 'Not provided'}
- Bio/Tagline: ${data.bio || 'A passionate developer exploring new technologies.'}
- I'm currently working on: ${data.workingOn || 'exciting new projects!'}
- I'm currently learning: ${data.learning || 'new skills and technologies.'}
- I'm looking to collaborate on: ${data.collaborateOn || 'open source projects.'}
- How to reach me: ${data.contact || 'Not provided'}
- My hobbies: ${data.hobbies || 'Not provided'}
- Tech Stack: ${data.techStack || 'Not provided'}

**Instructions:**
1.  Start with a creative greeting. Use the user's name if provided.
2.  **Immediately after the greeting**, embed a dynamic typing animation using the \`readme-typing-svg\` service.
    - Here is the URL structure: \`![Typing SVG](https://readme-typing-svg.vercel.app/?font=Fira+Code&weight=600&size=25&pause=1000&color=BD93F9&center=true&vCenter=true&width=435&lines=Line1;Line2)\`
    - For the \`lines\` parameter: The first line should be something like "Hi there, I'm ${data.name || data.username}!" or "Welcome to my profile!". The second line should be the user's bio/tagline.
    - **Crucial**: You must URL-encode the text for the \`lines\` parameter. For example, spaces become %20, commas become %2C, etc. Semicolons (%3B) are used to separate the lines.
3.  Use emojis throughout the README to make it more engaging and visually appealing.
4.  Structure the information into logical sections (e.g., "👋 About Me", "🚀 What I'm Up To", "💻 Tech Stack", "📫 Let's Connect", "📊 GitHub Stats").
5.  For the "Tech Stack" section, create shields.io badges for each technology listed. The technologies are comma-separated. For each technology (e.g., 'React'), create a badge like \`https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB\`. You must find appropriate slugs and hex colors for each technology. If a logo is not available, omit the logo parameter.
6.  Include a section for GitHub stats cards using the user's username. Include both the main stats card and the top languages card. Use the Dracula theme.
    - Stats Card: \`https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=dracula&include_all_commits=true&count_private=true\`
    - Top Langs Card: \`https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=dracula\`
7.  Combine all these elements into a single, cohesive Markdown output.
8.  The entire output MUST be valid Markdown. Do not include any explanations, introductory text, or concluding remarks. Just return the raw Markdown content.
9.  If a section has no data (e.g., hobbies is 'Not provided'), be creative. You can either omit the section or add a playful placeholder.
`;
};

export const generateProfileReadme = async (data: ProfileData): Promise<string> => {
  if (!data.username) {
    throw new Error("GitHub username is required.");
  }

  try {
    const prompt = buildPrompt(data);
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    if (response.text) {
      return response.text;
    } else {
      throw new Error("Received an empty response from the AI model.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate profile. Please check your API key and try again.");
  }
};
