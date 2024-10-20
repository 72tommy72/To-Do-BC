// 2)task

import { TaskModel } from "../../../DB/models/task.model.js";
import { UserModel } from "../../../DB/models/user.model.js";
import { catchError } from "../../utlis/catchError.js";

// 1-add task with status (toDo)(user must be logged in)
export const addTask = catchError(async (req, res, next) => {
    //data
    const { userId, title, description, assignTo, deadline, status } = req.body;
    //check user
    const user = await UserModel.findById(userId);
    //create task
    const task = await TaskModel.create({
        title,
        description,
        assignTo,
        deadline,
        status,
    });
    return res.json({
        success: true,
        message: "Task created successfully",
        result: task,
    });
});
// 2-update task (title , description , status)
export const updateTask = catchError(async (req, res, next) => {
    //data
    const { id } = req.params;
    const { title, description, status } = req.body;
    //create task
    const task = await TaskModel.findOneAndUpdate(
        { _id: id },
        {
            title,
            description,
            status,
        }
    );
    return res.json({
        success: true,
        message: "Task created successfully",
    });
});
// 3-delete task(user must be logged in) (creator only can delete task)
export const deleteTaskByUser = catchError(async (req, res, next) => {
    //data
    const { id } = req.params;
    const { userId } = req.body;
    //delete task
    const user = await TaskModel.findOne({ userId });
    if (!user) return next(new Error("User Not Found"));
    const task = await TaskModel.findByIdAndDelete({ _id: id, userId });
    //response
    return res.json({
        success: true,
        message: "Task deleted successfully",
    });
});
// 4-get all tasks with user data
export const getAllTaskByUser = catchError(async (req, res, next) => {
    //data
    const { userId } = req.body;
    //all task
    // const user = await TaskModel.findOne({ userId });
    // if (!user) return next(new Error("User Not Found"));
    const task = await TaskModel.find({  userId });
    //response
    return res.json({
        success: true,
        message: "Task deleted successfully",
        result:task
    });
});
// 5-get tasks of oneUser with user data (user must be logged in)
export const getAllTaskByUserData = catchError(async (req, res, next) => {
    //data
    const { userId } = req.body;
    //all task
    const task = await TaskModel.find( req.user._id );
    //response
    return res.json({
        success: true,
        message: "Task deleted successfully",
        result:task
    });
});
// 6-get all tasks that not done after deadline
export const getAllTask= catchError(async (req, res, next) => {
    //all task
    const task = await TaskModel.find({
        status: { $ne: "done" },
        deadline: { $lt: new Date() }
    });
    //response
    return res.json({
        success: true,
        message: "Task deleted successfully",
        result:task
    });
});