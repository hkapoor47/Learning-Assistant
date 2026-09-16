import Document from "../models/Document.js";

export const uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF file.",
            });
        }

        const document = await Document.create({
            name: req.file.originalname,
            fileName: req.file.filename,
            filePath: `/uploads/${req.file.filename}`,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
        });

        res.status(201).json({
            success: true,
            message: "Document uploaded successfully.",
            document,
        });
    } catch (error) {
        next(error);
    }
};

export const getDocuments = async (req, res, next) => {
    try {
        const documents = await Document.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            documents,
        });
    } catch (error) {
        next(error);
    }
};