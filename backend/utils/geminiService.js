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
        
        
        const questionBlocks = generatedText.split('---').filter(q => q.trim());

        for(const block of questionBlocks){
            const lines = card.trim().split('\n');
            let question ='',options=[], correctAnswer = '',explanation='', difficulty ='medium';

            for(const line of lines){
                   const trimmed = line.trim();
                   if(trimmed.startsWith('Q:')){
                    question = trimmed.substring(2).trim();
                   }else if(trimmed.match(/^O\d:/)){
                    options.push(trimmed.substring(3).trim());
                   }else if(trimmed.startsWith('C:')){
                    correctAnswer= trimmed.substring(2).trim();
                   }else if (trimmed.startsWith('E:')){
                    explaination = trimmed.substring(2).trim();
                   }else if(trimmed.startsWith('D:')){
                    const diff = trimmed.substring(2).trim().toLowerCase();
                    if(['easy', 'medium','hard'].includes(diff)){
                        difficulty:diff;                    }
                   }
                    }
                }
                if(question && options.length === 4 && correctAnswer){
                     questions.push({
                        question, options,correctAnswer,explaination, difficulty
                     });
                }
                return questions.slice(0,numQuestions);
            }catch(error){
                console.log('Gemini API error:', error);
                throw new Error('Failed to generate quiz');
        }
    };

    /**
     * @param {string} text
     * @returns {Promide<string>}
     */

    export const generateSummary = async(text)=>{
        const prompy = `Provide a concise summary of the following text , highlighting the key concept , main ideas , and keep the summary clear and structured.
        
        Text:
        ${
            text.substring(0,20000)
        }`;

        try{
            const response = await ai.models.generateContent({
                 model:"gemini-2.5-flash-lite",
                 contents:prompt,
            });
        }catch(error){
            console.error('Gemini API error:', error);
            throw new Error('Failed to generate summary');
        }
    };

    /**
     * @param {string} question
     * @param {Array<Object>} chunks
     * @returns {Promise<string>}
     */

    export const chatWithContext = async (question, chunks) =>{
        const context = chunks.map((c, i) => `[Chunk ${i+1}]\n${c.content}`).join('\n\n');
        console.log("content____", context);

        const prompt = ` Based on the following context from a document , Analyse the context and answer the user's question.
        If the answer is not in the context , say so.
        
        Context:
        ${context}
        
        Question: ${question}
        
        Answer: `;

        try{
            const response = await ai.models.generateContent({
                model:"gemini-2.5-flash-lite",
                contents:prompt,
            });
            const generatedText = response.text;
            return generatedText
        }catch(error){
            console.error('Gemini Api error: error');
            throw new error('Failed to process chat request');
        }
    };

    /**
     * @param {string} concept
     * @param {string} context
     * @returns {Promise<string>}
     */

    export const explainConcept = async (concept , context)=>{
        const prompt =`Explain the concept of "${concept}" based on the following contexts.
        Provide a clear , educational explanation that's easy to understand.
        Include examples if relevant.
        
        context:
        ${context.substring(0,10000)}`;

        try{
            const response = await ai.models.generateContent({
                model:"gemini-2.5-flash-lite",
                contents:prompt,
            });
            const generatedText = response.text;
            return generatedText
        }catch(error){
           console.error('Gemini API error:', error);
           throw new Error('Failed to explain concept');
        }
    };