import express from'express';
import { 
    generateFlashCards,
    generateQuiz,
    generateSummary,
    chat,
    explainConcept,
    getChatHistroy
} from '../controller/aiController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/generate-flashcards',generateFlashcards);
router.post('/generate-quiz',generateQuiz);
router.post('/generate-summary',generateSummary);
router.post('/chat',chat);
router.post('/explain-concept',explainConcept);
router.post('/chat-history/:documentId',getChatHistroy);

export default router;
