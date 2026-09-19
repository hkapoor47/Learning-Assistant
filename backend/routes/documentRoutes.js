import express from "express";

import upload from "../config/multer.js";
import protect from "../middleware/auth.js";

import {
    uploadDocument,
    getDocuments,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", protect, getDocuments);

router.post(
    "/upload",
    protect,
    upload.single("document"),
    uploadDocument
);

export default router;