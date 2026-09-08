import { GoogleGenAI } from '@google/genai';

function getGeminiClient() {
  const rawKey = process.env.GEMINI_API_KEY;
  const apiKey = rawKey ? rawKey.trim() : '';
  if (!apiKey || apiKey.includes('your_actual_gemini_api_key_here')) {
    throw new Error('Gemini API key is not configured on the server. Please set GEMINI_API_KEY in backend/.env');
  }
  return new GoogleGenAI({ apiKey });
}

function cleanJsonResponse(text) {
  let cleaned = text.trim();
  // Remove markdown codeblock syntax if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
  }
  return cleaned;
}

export async function generateResumeContent(resumeData) {
  const ai = getGeminiClient();
  const targetRole = resumeData?.careerInfo?.targetRole || 'Software Engineer';

  const prompt = `
You are an expert ATS (Applicant Tracking System) resume optimization specialist and tech career counselor.

User's Current Resume Data:
- Target Job Role: ${targetRole}
- Current Summary: ${resumeData?.careerInfo?.professionalSummary || 'None provided'}
- Current Objective: ${resumeData?.careerInfo?.careerObjective || 'None provided'}
- Education: ${JSON.stringify(resumeData?.education || [])}
- Skills: ${JSON.stringify(resumeData?.skills || [])}
- Projects: ${JSON.stringify(resumeData?.projects || [])}
- Experience: ${JSON.stringify(resumeData?.workExperience || [])}
- Certifications: ${JSON.stringify(resumeData?.certifications || [])}
- Achievements: ${JSON.stringify(resumeData?.achievements || [])}

STRICT SAFETY & TRUTH RULES:
1. NEVER invent fake degrees, universities, or GPAs.
2. NEVER invent fake companies, job titles, or employment dates.
3. NEVER invent fake certifications or issuers.
4. NEVER invent fake work experience or project technologies.
5. Preserve all factual details provided by the user.
6. Improve the phrasing, impact, action verbs, and ATS keyword optimization for the target role: "${targetRole}".

Respond ONLY with a valid JSON object strictly matching this schema:
{
  "professionalSummary": "A compelling 3-4 sentence professional summary tailored to ${targetRole}",
  "careerObjective": "A concise 1-2 sentence career objective focused on value addition",
  "improvedSkills": [
    { "name": "Skill Name", "category": "Technical | Tools | Soft Skills" }
  ],
  "improvedProjects": [
    { "id": "proj-id", "title": "Title", "description": "Enhanced impact-driven project description", "techStack": "Tech stack" }
  ],
  "improvedExperience": [
    { "id": "exp-id", "company": "Company", "role": "Role", "description": "Enhanced bullet points using action verbs and quantifiable metrics" }
  ],
  "improvedAchievements": [
    { "id": "ach-id", "title": "Title", "description": "Enhanced achievement description" }
  ],
  "roleKeywords": ["Keyword1", "Keyword2", "Keyword3"]
}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  const rawText = response.text;
  const jsonString = cleanJsonResponse(rawText);
  return JSON.parse(jsonString);
}

export async function enhanceBulletPoint(bulletText, targetRole = 'Software Engineer') {
  const ai = getGeminiClient();

  const prompt = `
You are a professional resume editor. Rewrite the following bullet point to make it more impactful, concise, and ATS-friendly for a "${targetRole}" position.

Original Bullet Point: "${bulletText}"

RULES:
1. Use strong action verbs at the beginning.
2. Maintain strict truthfulness — DO NOT invent facts, metrics, or technologies not implied in the original text.
3. Keep it under 2 sentences.

Respond ONLY with a valid JSON object in this format:
{
  "enhancedBullet": "The improved action-driven bullet point text"
}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  const jsonString = cleanJsonResponse(response.text);
  return JSON.parse(jsonString);
}

export async function generatePortfolioContent(resumeData) {
  const ai = getGeminiClient();
  const fullName = resumeData?.personalInfo?.fullName || 'Job Candidate';
  const targetRole = resumeData?.careerInfo?.targetRole || 'Software Engineer';

  const prompt = `
You are a web portfolio copywriter. Create compelling, professional website copy for ${fullName} applying for ${targetRole} positions based on their resume background.

Resume Details:
- Personal Summary: ${resumeData?.careerInfo?.professionalSummary || ''}
- Skills: ${JSON.stringify(resumeData?.skills || [])}
- Projects: ${JSON.stringify(resumeData?.projects || [])}
- Experience: ${JSON.stringify(resumeData?.workExperience || [])}

STRICT RULES:
1. Do not fabricate fake background details.
2. Keep the tone modern, professional, welcoming, and concise.

Respond ONLY with a valid JSON object in this format:
{
  "headline": "A catchy 1-line portfolio headline (e.g. Building Scalable Web Solutions & AI Applications)",
  "aboutMe": "A 3-4 sentence warm, engaging 'About Me' introduction for recruiters",
  "projectDescriptions": [
    { "title": "Project Title", "shortTagline": "1-line catchy summary for portfolio cards" }
  ],
  "skillsSummary": "A brief 2-sentence highlight of core technical expertise",
  "professionalTagline": "A short bio tagline"
}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  const jsonString = cleanJsonResponse(response.text);
  return JSON.parse(jsonString);
}
