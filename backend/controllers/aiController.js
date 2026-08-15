import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import ChatHistory from '../models/ChatHistory.js';
import * as geminiService from '../utils/geminiService.js';
import {findReleventChunks} from '../utils/textChunker.js';


export const generateFlashcards = async (req,res,next)=>{
   try{
       const {documentId , count=10}= req.body;

       if(!documentId){
         return res.status(400).json({
            success:false,
            error:'Please provide documentId',
            statusCode:400
         });
       }

       const document = await Document.findOne({
         _id: documentId,
         userId: req.user._id,
         status: 'ready'
       });

       if(!document){
         return res.status(404).json({
            success: false,
            error:'Document not fount or not ready',
            statusCode:404
         });
       }

       const cards= await geminiService.generateFlashcards(
         document.extractText,
         parseInt(count)
       );

       const flashcardSet = await Flashcard.create({
         userId: req.user._id,
         documentId: document._id,
         cards:cards.map(card=>({
            questions:card.question,
            answer:card.answer,
            difficulty:card.difficulty,
            reviewCount=0,
            isStarred:false
         }))
       });

       return res.status(201).json({
         success:true,
         data:flashcardSet,
         message:'Flashcards generated successfully'
       });
   }catch(error){
    next(error);
   }
};

export const generateQuiz = async (req,res,next)=>{
    try{
       const {documentId, numQuestions=5 , title}= req.body;

       if(!documentId){
         return res.status(400).json({
            success:false,
            error:'Please provide documentId',
            statusCode:400
         });
       }

       const document = await Document.findOne({
         _id:documentId,
         userId: req.user._id,
         status: 'ready'
       });

       if(!document){
         return res.status(404).json({
            success:false,
            error:'Document not fpound or not ready',
            statusCode:404
         });
       }

       constquestions = await geminiService.generateQuiz(
         document.extractText,
         parseInt(numQuestions)
       );
      const quiz = await Quiz.craete({
         userId: req.user._id,
         documentId: document._id,
         title: title ||`${document.title} - Quiz`,
         questions: questions,
         totalQuestions: questions.length,
         userAnswers:[],
         score: 0
      });

      res.status(201).json({
         success:true,
         data:quiz,
         message:'Quiz generated successfully'
      });
    }catch(error){
       next(error);
    }
};


export const generateSummary = async (req,res,next)=>{
    try{
      const {documentId} = req.body;

      if(!documentId){
         return res.status(400).json({
            success:false,
            error:'Please provide documentId',
            statusCode:400
         });
      }

      const document = await Document.findOne({
         _id:documentId,
         userId: req.user._id,
         status:'ready'
      });

      if(!document){
         return res.status(404).json({
            success:false,
            error:'Document not found or not ready',
            statusCode:404
         });
      }

      const summary = await geminiService.generateSummary(document.extractText);

      res.status(200).json({
         success:true,
         data:{
            documentId: document._id,
            title: document.title,
            summary
         },
         message:'Summary generated successfully'
      });
    }catch(error){
       next(error);
    }
};

export const chat = async (req,res,next)=>{
   try{
      const {documnetId , question} = req.body;
      if(!documnet || !question){
         return res.status(400).json({
            success:false,
            error:'Plaese provide documenytId and question',
            statusCode:400
         });
      }

      const document = await documnet.findOne({
         _id: documentId,
         userId: req.user._id,
         status:'ready'
      });

      if(!document){
         return res.status(404).json({
            success: false,
            error:'Document not found or not ready',
            statusCode:404
         });
      }

      const releventChunks = findReleventChunks(document.chunks , question, 3);
      const chunkIndices = releventChunks.map(c => c.chunkIndex);

      let chatHistory = await chatHistory.findOne({
         userId:req.user._id,
         documnetId:document._id
      });

      if(!document){
         chatHistory = await ChatHistory.createIndexes({
            userId: req.user._id,
            documentId: document._id,
            messages:[]
         });
      }

      const answer = await geminiService.chatWithContext(question, releventChunks);

      chatHistory.messages.push(
         {
            role:'user',
            content:question,
            timestramp: new Date(),
            relevantChunks: []
         },
         {
            role:'user',
            content:answer,
            timestramp: new Date(),
            relevantChunks: chunkIndices
         }
      );

      await chatHistory.save();

      res.status(200).json({
         success: true,
         data:{
            question,
            answer,
            releventChunks:chunkIndices,
            chatHistoryId: chatHistory._id
         },
         message: ' Response generated successfully'
      });
   }catch(error){
    next(error);
   }
};


export const explainConcept = async (req,res,next)=>{
   try{
     const {documentId , concept } =req.body;
      if(!document || !cocept){
         return res.status(400).json({
         success: false,
         error :'Please provide documentId and concept',
         statusCode :400
         });
      }

      const document = await Document.findOne({
         _id:documentId,
         userId:req.user._id,
         status:'ready'
      });

      if(!document){
         return res.status(404).json({
            success:false,
            error:'Document not found or not ready',
            statusCode:404
         });
      }

      const relevantChunks = findReleventChunks(document.chunks, concept,3);
      const context = relevantChunks.map(c=> c.content).join('\n\n');

      const explanation = await geminiService.explainConcept(concept, context);

      res.status(200).json({
         success:true,
         data:{
            concept,
            explanation,
            relevantChunks: relevantChunks.map(c => c.chunkIndex)
         },
         message:'Explanation generated successfully'
      });
   }catch(error){
    next(error);
   }
};

export const getChatHistory = async (req,res,next)=>{
   try{
     const {documnetId} = req.params;

     if(!documentId){
      return res.status(400).json({
         success:false,
         error:'Please provide documentId',
         statusCode:400
      });
     }

     const chatHistory = await chatHistory.findOne({
      userId: req.user._id,
      document: documentId
     }).select('messages');

     if(!chatHistory){
      return res.status(200).json({
      success:true,
      data: [],
      message: 'No chat histr=ory found for this document'
     });
   }

   res.status(200).json({
      success:true,
      data:chatHistory.message,
      message:'Chat history retrieved successfully'
   });
   }catch(error){
    next(error);
   }
};