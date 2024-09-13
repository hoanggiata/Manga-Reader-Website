import mongoose, {Schema,models} from "mongoose";

const userSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    }
},{timestamps:true});

const User = models.User || mongoose.model("User",userSchema);

export default User;