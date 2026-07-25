import mongoose, { trusted } from'mongoose'

const flashcardSchema = new mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document",
        required:trusted
      },
      cards:[{
        question:{type:String , required:true},
        answer:{type:String, required:true},
        difficulty:{
            type:String,
            enum:["easy", "mediun","hard"],
            default:"medium",
          },
          reviewCount:{
            type:Number,
            default:0,
          },
          isShared:{
            type:Boolean,
            default:false
          },
      },
    ],
},
{
        timestramps:true,
    }
);

flashcardSchema.index({userId:1, documentId:1});
const Flashcard = mongoose.model("Flashcard",flashcardSchema);

export default Flashcard;