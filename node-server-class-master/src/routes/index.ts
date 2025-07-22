import { Router } from "express"
import readerRoutes from "./readerRoutes"
import bookRoutes from "./bookRoutes"
import lendingRoutes from "./lendingRoutes" 
import userRoutes from "./userRoutes"

const rootRouter = Router()
rootRouter.use("/readers", readerRoutes)
rootRouter.use("/books", bookRoutes)
rootRouter.use("/lendings", lendingRoutes)
rootRouter.use("/users", userRoutes)

export default rootRouter
