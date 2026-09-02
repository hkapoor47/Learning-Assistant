
import mongoose from 'mongoose';
 
const flashcardSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
      },
      title: {
        type: String,
        trim: true,
        default: 'Untitled Set'
      },
      cards: [{
        question: { type: String, required: true },
        answer: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        lastReviewed: {
            type: Date,
            default: null
        },
        isStarred: {
            type: Boolean,
            default: false
        },
        isShared: {
            type: Boolean,
            default: false
        },
      }],
    },
    {
        timestamps: true,
    }
);
 
flashcardSchema.index({ userId: 1, documentId: 1 });
const Flashcard = mongoose.model("Flashcard", flashcardSchema);
 
export default Flashcard;
 
