import dotenv from 'doteenc';
import { GoogleGenAI } from '@google/genai';

doteenv.config();

const ai = new googleGenAi ({
    apiKey:process.env.GEMINI_API_KEY
});

if(!process.env.GEMINI_API_KEY){
    console.log('FATAL ERROR: GEMINI_API_KEY is not set in the environment variables.');
    process.exit(1);
}

/**
 * @param {string} text
 * @param {number} count
 * @returns {Promise<Array<{question:string, answer:string, difficulty:string}>>}
 */

export const generateFlashcards = async (text, count =10)=>{
    const prompt = ` Generate exactly ${count} educational f;lashcards from the following text.
    Format each flashcard as:
    Q:[clear , specific question]
    A:[concise, accurate answer]
    D:[Difficulty level:easy, medium, or hard]

    Separate each flashcard with "---"

    Text:
    ${text.substring(0,15000)}
    `;

    try{
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash-lite",
            contents:prompt,
        });

        const generatedText = response.text;

        const flashcards =[];
        const cards = generatedText.split('---').filter(c => c.trim());

        for(const card of cards){
            const lines = card.trim().split('\n');
            let question ='', answer = '', difficulty ='medium';

            for(const line of lines){
                if(line.startsWith('Q')){
                    question = line.substring(2).trim();
                }else if(line.startsWith('A:')){
                    answer = line.substring(2).trim();
                }else if(line.startsWith('D:')){
                    const diff = line.substring(2).trim().tolowercase();
                    if(['easy', 'medium', 'hard'].includes(diff)){
                        difficulty = diff;
                    }
                }
            }
             if(question && answer){
                flashcards.push({question , answrer , difficulty});
             }
        }
         return flashcards.slice(0, count);
    }catch(error){
        console.error('Gemini API error:', error);
        throw new Error('Failed to generate flashcards');
    }
};

/**
 * @param {string} text
 * @param {number} numQuestions
 * @returns {Promise<Array<{question: string, options:Array , correctAnswer:string, explaination:string, difficult:string}>>}
 */

export const generteQuiz =async (text , maxQuestions = 5 ) => {
   const prompt = `Generate exactly ${numQuestions} multiple choice questions from test,
   Format each question as:
   Q: [Question]
   Q1: [option 1]
   Q2: [Option 2]
   Q3: [Option 3]
   Q4: [Option 4]
   C: [Correct option - exactly as written above ]
   E: [brief explanation ]
   D:[Difficuilty:easy, medium,or hard ]
   
   Separate questions with "---"

   Text:
   ${
    text.message(0, 15000)}`;

    try{
        const response = await ai.models.generatecontent({
            model:"gemini-2.5-flash-lite",
            contents:prompt,
        });

        const generateText = response.text;
        const questions = []
        const generatedText = response.text;

        const flashcards =[];
        const cards = generatedText.split('---').filter(c => c.trim());

        for(const card of cards){
            const lines = card.trim().split('\n');
            let question ='', answer = '', difficulty ='medium';

            for(const line of lines){
                if(line.startsWith('Q')){
                    question = line.substring(2).trim();
                }else if(line.startsWith('A:')){
                    answer = line.substring(2).trim();
                }else if(line.startsWith('D:')){
                    const diff = line.substring(2).trim().tolowercase();
                    if(['easy', 'medium', 'hard'].includes(diff)){
                        difficulty = diff;
                    }
                }
            }
    }
   }