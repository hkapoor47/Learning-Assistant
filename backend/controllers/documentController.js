import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import {extractTextFromPDF}from '../utils/pdfParse';
import {chunkText} from '..//utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';

export const uploadDocument = async(req, res,next) =>{
    try{
       if(!req.file){
        return res.status(400).json({
            success:false,
            error:'Please upload a PDF file',
            statusCode:400
        });

        const {title} = req.body;
        if(!title){
            await fs.unlink(req.file.path);
            return res.status(400).json({
                success:false,
                error:'Please provide a title for the document',
                statusCode:400
            });
        }

        const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
        const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

        const document = await Document.create({
            userId:req.user._id,
            title,
            fileName:req.file.originalname,
            filePath:fileUrl,
            fileSize: req.file.size,
            status:'processing'
        });

        processPDF(documnent._id, req.file.path).catch(err =>{
            console.error('Error processing PDF:', err);
        });

        res.status(201).json({
            success:true,
            data:document,
            message:'Document uploaded successfully',
            statusCode:201
        });
       }
    }catch(error){
       if(req.file){
        await fs. unlink(req.file.path).catch(()=>{});
       }
       next(error);
    }
};

const processPDF = async(documentId, filePath)=>{
    try{
        const {text}= await extractTextFromPDF(filePath);
        const chunks = chunkText(text, 500, 50);

        await Document.findIdAndUpdate(documentId,
            {
                extractText:text,
                chunks:chunks,
                status:'ready'
            }
        );
        console.log(`Document ${documentId} processed successfully`);
    }catch(error){
        console.error(`Error processing document ${documentId}:`, error);

        await Document.findByIdAndUpdate(documentId,
             {
                status:'failed'
            });
    }
};



export const getDocments = async(req, res, next)=>{
    try{
      const documents = await Document.aggregate(
    {
        $natch:{userId: new mongoose.Types.ObjectId(req.user._id)}
    },
    {
        $looup:{
            from:'flashcards',
            localField:'_id',
            foreignField:'documentId',
            as:'flashcardsSets'
        }
    },
    {
        $lookup:{
            from:'quizzes',
            localField:'_id',
            foreignField:'documentId',
            as:'quizzesSets'
        }
    },
    {
        $addFields:{
            flashcardsCount:{$size:'$flashcardsSets'},
            quizzesCount:{$size:'$quizzesSets'}
        }
    },{
        $project:{
            flashcardsSets:{ $size:'$flashcardsSets'},
            quizzesSets:{ $size:'$quizzesSets'}
        }
    },{
        $sort:{uploadedDate:-1}
    }
    );
    res.status (200).json({
        success:true,
        data:documents.length,
        data:documents
    });
}catch(error){

    }
};

export const getDocument =async(req,res,next)=>{
    try{
     const document = await Document.findOne({
        _id:req.params.id,
        userId:req.user._id
    });
    if(!document){
        return res.status(404).json({
            success:false,
            error:'Document not found',
            statusCode:404
        });
    }

    const flashCardsCount = await Flashcard.countDocuments({documentId:document._id , userId:req.user._id});
    const quizzesCount = await Quiz.countDocuments({documentId:document._id, userId:req.user._id});

    document.lastAccessed=Date.now();
    await document.save();

    const documentDate = document.toObject();
    documentData.flashCardsCount = flashCardsCount;
    documentData.quizCount = quizCount;


    res.status(200).json({
        success:true,
        data:document   
    });

}catch(error){
    next(error);
}
};

export const deleteDocument =async(req,res,next)=>{
    try{
      const document = await Document.findOne({
        _id:req.params.Id,
        userId: req.user._id
      });

      if(!document){
        return res.status(404).json({
            succes:false,
            error:'Document not found',
            statusCode:401
        });
      }

      await fs.unlink(document.filePath).catch(()=>{});
       
      await document.deleteOne();
      res.atatus(200).json({
        success:true,
        message:'Document delted successfully'
      });
    }catch(error){
        next(error);
    }
};

// export const updateDocument = async(req,res,next)=>{
//     try{

//     }catch(error){

//     }
// };

