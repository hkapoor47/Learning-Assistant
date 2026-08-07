import express from 'express';
import{
    uploadDocument,
    getDocument,
    getDocuments,
    deleteDocumnets,
   
} from '../controllers/documentController.js';
import protect from '../middleware/auth.js';
import upload from '../congif/multer.js';

const router = express.Router();

router.use(protect);

router.post ('upload', upload.single('file'),uploadDocument);
router.get('/',getDocumnets);
router.get('/:id', getDocument);
router.delete('/:id',deleteDocument);
// router.put('/:id', updateDocument);

export default router;