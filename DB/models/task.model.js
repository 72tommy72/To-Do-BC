import { model, Schema, Types } from "mongoose";

// tasks collection-->schema(title , description , status{toDo , doing , done} , userId , assignTo , deadline)
export const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignTo: {
        type: String,
        required: true,
    },
    deadline: Date,
    status: {
        type: String,
        enum: ["toDo", "doing", "done"],
        default: "toDo"
    },
    userId: {
        type: Types.ObjectId,
        ref: "UserModel"
    }
}, { timestamps: true })

export const TaskModel = model("TaskModel", taskSchema)