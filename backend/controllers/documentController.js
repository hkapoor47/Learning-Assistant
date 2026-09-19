import Document from "../models/Document.js";

export const uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "Please upload a PDF file.",
                statusCode: 400,
            });
        }

        const document = await Document.create({
            userId: req.user._id,

            title: req.file.originalname,

            fileName: req.file.filename,

            filePath: `/uploads/${req.file.filename}`,

            filesize: req.file.size,

            extractedText: "",

            chunks: [],

            status: "processing",
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
        const documents = await Document.find({
            userId: req.user._id,
        }).sort({
            uploadedDate: -1,
        });

        res.status(200).json({
            success: true,
            documents,
        });
    } catch (error) {
        next(error);
    }
};