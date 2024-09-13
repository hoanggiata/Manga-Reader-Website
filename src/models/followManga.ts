import mongoose, {Schema,models} from "mongoose";

const followMangaSchema = new Schema({
    email: {
        type:String,
        require:true
    },
    mangaId: {
        type:String,
        require:true
    },
},{timestamps:true});

const FollowManga = models.FollowManga || mongoose.model("FollowManga",followMangaSchema);

export default FollowManga;