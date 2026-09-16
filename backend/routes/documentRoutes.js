import express from "express";

import upload from "../config/multer.js";

import {
    uploadDocument,
    getDocuments,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getDocuments);

router.post(
    "/upload",
    upload.single("document"),
    uploadDocument
);

export default router;