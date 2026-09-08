import dotenv from 'dotenv';
import { generateResumeContent, enhanceBulletPoint, generatePortfolioContent } from './src/services/geminiService.js';

dotenv.config();

async function testAllGeminiEndpoints() {
  console.log('--- TESTING REAL GEMINI API CALLS ---');

  const testResumeData = {
    personalInfo: { fullName: 'Alex Morgan', email: 'alex@example.com' },
    careerInfo: {
      targetRole: 'Full Stack Software Engineer',
      professionalSummary: 'Junior developer with 1 year experience building web apps with React and Node.js.'
    },
    skills: [
      { name: 'JavaScript', category: 'Technical' },
      { name: 'React.js', category: 'Technical' },
      { name: 'Node.js', category: 'Technical' }
    ],
    projects: [
      { id: 'p1', title: 'E-Commerce Platform', description: 'Built online store with shopping cart.', techStack: 'React, Node.js, Express' }
    ],
    workExperience: [
      { id: 'e1', company: 'Tech Corp', role: 'Junior Dev', startDate: '2023', endDate: '2024', description: 'Created React frontend components.' }
    ]
  };

  try {
    console.log('\n1. Testing generateResumeContent()...');
    const resumeResult = await generateResumeContent(testResumeData);
    console.log('✅ Resume Content Generated Successfully:');
    console.log(JSON.stringify(resumeResult, null, 2));

    console.log('\n2. Testing enhanceBulletPoint()...');
    const bulletResult = await enhanceBulletPoint(
      'Built responsive UI components in React and integrated with REST API backend',
      'Full Stack Software Engineer'
    );
    console.log('✅ Bullet Enhanced Successfully:');
    console.log(JSON.stringify(bulletResult, null, 2));

    console.log('\n3. Testing generatePortfolioContent()...');
    const portfolioResult = await generatePortfolioContent(testResumeData);
    console.log('✅ Portfolio Content Generated Successfully:');
    console.log(JSON.stringify(portfolioResult, null, 2));

    console.log('\n🎉 ALL 3 GEMINI ENDPOINTS COMPLETED SUCCESSFULLY!');
  } catch (error) {
    console.error('❌ Gemini Test Error:', error.message);
  }
}

testAllGeminiEndpoints();
