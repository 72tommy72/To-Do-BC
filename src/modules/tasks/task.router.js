import { Router} from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { addTask, deleteTaskByUser, updateTask,getAllTaskByUser ,getAllTaskByUserData, getAllTask} from "./task.controller.js";

const router = Router()
router.post('/addtask',isAuthenticated,addTask)
router.patch('/updatetask',isAuthenticated,updateTask)
router.delete('/deletetask',isAuthenticated,deleteTaskByUser)
router.delete('/getAllTaskByUser',isAuthenticated,getAllTaskByUser)
router.delete('/getAllTaskByUserData',isAuthenticated,getAllTaskByUserData)
router.delete('/getAllTask',isAuthenticated,getAllTask)

export default router;