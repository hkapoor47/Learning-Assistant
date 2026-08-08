import express from 'express';
import {
    getFlashcards,
    getAllFlashcardSets,
    reviewFlashCard,
    toggleStarFlashcard,
    deleteFlashcardset,
} from '../controllers/flashcardController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/',getFlashcardSets);
router('/:documentId', getFlashcards);
router.post('/:cardId/review', reviewFlashCard);
router.put('/:cardId/star', toggleFlashcard);
router.deleted('/:id', deleteFlashcardSet);


export default router;