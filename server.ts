import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Set up body parsing middleware
app.use(express.json({ limit: "50mb" }));

// Initialize Gemini Client lazily or check key availability on endpoint call
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API for Resume Parsing using Gemini
app.post("/api/parse-resume", async (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText || typeof rawText !== "string" || rawText.trim() === "") {
      return res.status(400).json({ error: "No resume text was provided or text is empty." });
    }

    const ai = getAiClient();

    const systemInstruction = `
      You are an expert resume parser. Your job is to extract and structure all information from a raw resume text into a highly structured JSON object matching the exact schema provided.
      
      Guidelines:
      - Clean up formatting and correct obvious spelling mistakes while keeping the core content truthful.
      - Shorten bullet points or adjust wording slightly so it is punchy and fits nicely in a creative/brutalist design layout.
      - For "quickBadges", synthesize 3 short, uppercase badge values representing the candidate, such as ["AVAILABLE NOW", "REMOTE", "5+ YR EXP"] or similar, based on their information.
      - For "signatureText", synthesize a short stamp string in the format "NAME / ROLE" (e.g. "CHIRAG / CREATIVE DEV" or "SARAH / DESIGNER").
      - Ensure that all arrays have entries (e.g., work experience, projects, skills, education) if they were present in the source text.
      - Do not invent experience or credentials that are not in the raw text, but structure them neatly.
    `;

    const prompt = `Extract all information from the following raw resume text and return it as a structured JSON object: \n\n${rawText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["fullName", "title", "profile", "contact", "experience", "education", "projects", "skills", "quickBadges", "signatureText"],
          properties: {
            fullName: {
              type: Type.STRING,
              description: "The full name of the candidate, e.g. CHIRAG SHARMA."
            },
            title: {
              type: Type.STRING,
              description: "The professional title of the candidate, e.g. CREATIVE FRONTEND DEVELOPER."
            },
            profile: {
              type: Type.STRING,
              description: "A short, engaging 2-3 sentence summary profile or bio of the candidate."
            },
            contact: {
              type: Type.OBJECT,
              required: ["phone", "email", "location", "github", "linkedin", "website"],
              properties: {
                phone: { type: Type.STRING },
                email: { type: Type.STRING },
                location: { type: Type.STRING, description: "City and state/country, e.g. San Francisco, CA" },
                github: { type: Type.STRING, description: "GitHub profile URL or handle, e.g. github.com/username" },
                linkedin: { type: Type.STRING, description: "LinkedIn profile URL or handle, e.g. linkedin.com/in/username" },
                website: { type: Type.STRING, description: "Portfolio or personal website, e.g. username.design" }
              }
            },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["company", "role", "dates", "location", "description"],
                properties: {
                  company: { type: Type.STRING },
                  role: { type: Type.STRING },
                  dates: { type: Type.STRING, description: "Dates of employment, e.g. 2021 - 2024 or PRESENT" },
                  location: { type: Type.STRING },
                  description: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2-4 core achievements or duties as punchy bullet points."
                  }
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["title", "role", "dates", "description"],
                properties: {
                  title: { type: Type.STRING },
                  role: { type: Type.STRING, description: "Role on project, e.g. Creator, Contributor, Lead" },
                  dates: { type: Type.STRING },
                  description: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "1-2 punchy bullet points describing the project."
                  }
                }
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["school", "degree", "dates", "details"],
                properties: {
                  school: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  dates: { type: Type.STRING },
                  details: { type: Type.STRING, description: "Additional details like GPA, honors, major, etc." }
                }
              }
            },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["category", "skills"],
                properties: {
                  category: { type: Type.STRING, description: "Skill category, e.g. LANGUAGES, TOOLS, LIBRARIES." },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            quickBadges: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 3 short uppercase badge values like ['AVAILABLE NOW', 'REMOTELY', '4+ YR EXP']."
            },
            signatureText: {
              type: Type.STRING,
              description: "A short, capitalized signature stamp text like 'NAME / DESIGNER'."
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/parse-resume:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during resume parsing."
    });
  }
});

// Configure Vite or Static Assets serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
