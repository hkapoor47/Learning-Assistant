

import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import { extractTextFromPDF } from '../utils/pdfParse.js';
import { chunkText } from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';
 
export const uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Please upload a PDF file',
                statusCode: 400
            });
        }
 
        const { title } = req.body;
        if (!title) {
            await fs.unlink(req.file.path);
            return res.status(400).json({
                success: false,
                error: 'Please provide a title for the document',
                statusCode: 400
            });
        }
 
        const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
        const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
 
        const document = await Document.create({
            userId: req.user._id,
            title,
            fileName: req.file.originalname,
            filePath: fileUrl,
            fileSize: req.file.size,
            status: 'processing'
        });
 
        processPDF(document._id, req.file.path).catch(err => {
            console.error('Error processing PDF:', err);
        });
 
        res.status(201).json({
            success: true,
            data: document,
            message: 'Document uploaded successfully',
            statusCode: 201
        });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        next(error);
    }
};
 
const processPDF = async (documentId, filePath) => {
    try {
        const { text } = await extractTextFromPDF(filePath);
        const chunks = chunkText(text, 500, 50);
 
        await Document.findByIdAndUpdate(documentId, {
            extractedText: text,
            chunks: chunks,
            status: 'ready'
        });
        console.log(`Document ${documentId} processed successfully`);
    } catch (error) {
        console.error(`Error processing document ${documentId}:`, error);
 
        await Document.findByIdAndUpdate(documentId, {
            status: 'failed'
        });
    }
};
 
export const getDocuments = async (req, res, next) => {
    try {
        const documents = await Document.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(req.user._id) }
            },
            {
                $lookup: {
                    from: 'flashcards',
                    localField: '_id',
                    foreignField: 'documentId',
                    as: 'flashcardSets'
                }
            },
            {
                $lookup: {
                    from: 'quizzes',
                    localField: '_id',
                    foreignField: 'documentId',
                    as: 'quizSets'
                }
            },
            {
                $addFields: {
                    flashcardsCount: { $size: '$flashcardSets' },
                    quizzesCount: { $size: '$quizSets' }
                }
            },
            {
                // Exclusion projection: drops the raw joined arrays
                // but keeps every other field (title, fileName, status, etc.)
                $project: {
                    flashcardSets: 0,
                    quizSets: 0
                }
            },
            {
                $sort: { uploadedDate: -1 }
            }
        ]);
 
        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });
    } catch (error) {
        next(error);
    }
};
 
export const getDocument = async (req, res, next) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
 
        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found',
                statusCode: 404
            });
        }
 
        const flashCardsCount = await Flashcard.countDocuments({ documentId: document._id, userId: req.user._id });
        const quizzesCount = await Quiz.countDocuments({ documentId: document._id, userId: req.user._id });
 
        document.lastAccessed = new Date();
        await document.save();
 
        const documentData = document.toObject();
        documentData.flashCardsCount = flashCardsCount;
        documentData.quizzesCount = quizzesCount;
 
        res.status(200).json({
            success: true,
            data: documentData
        });
    } catch (error) {
        next(error);
    }
};
 
export const deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
 
        if (!document) {
            return res.status(404).json({
                success: false,
                error: 'Document not found',
                statusCode: 404
            });
        }
 
        await fs.unlink(document.filePath).catch(() => {});
 
        await document.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
 
// export const updateDocument = async(req,res,next)=>{
//     try{
//
//     }catch(error){
//
//     }
// };
 
