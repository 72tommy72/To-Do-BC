import userRouter from './modules/user/user.router.js'
import taskRouter from './modules/tasks/task.router.js'
export const appRouter=(app , express)=>{

    app.use(express.json())
    //user
    app.use("user" ,userRouter)
    //task
    app.use("task" ,taskRouter)
    //not found page
    app.use("*",(req, res, next )=>{
        return next(new Error('Page Not Found'))
    })
    //error handler
    app.use((error, req, res, next )=>{
        res.json({
            success : false,
            message : error.message,
            stack: error.stack
        })
    })
}