import mongoose, {Schema,models} from "mongoose";

const userChapterSchema = new Schema({
    email: {
        type:String,
        require:true
    },
    chapterId: {
        type:String,
        require:true
    },
    mangaId: {
        type:String,
        require:true
    },
},{timestamps:true});

const UserChapter = models.UserChapter || mongoose.model("UserChapter",userChapterSchema);

export default UserChapter;