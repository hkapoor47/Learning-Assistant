import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema({
    userId:{
        tyep:String,
        ref:'User',
        required:true
    },
    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document',
        required:true
    },
    messages:[{
        role:{
            type:String,
            enum:['user','assistant'],
            required:true
        },
        content: {
            type:String,
            required:true
        },
        timstramp:{
           type:Date,
           default:Date.now
        },
      relevantChunks:{
        type:[Number],
        default:[]
      }
    }]
},{
    timestramps:true
});

chatHistorySchema.index({userId:1, documentId:1});

const ChatHistory =mongoose.model('ChatHistory', chatHistorySchema);

export default ChatHistory;