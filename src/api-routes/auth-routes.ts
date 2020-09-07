import  express from 'express'
import controllers from '../controllers/auth-controllers'
import validator from '../middleware/validator'

const router = express.Router()


router.get("/users", controllers.getAllUsers)
router.get("/user/:user_id", controllers.oneUser)

router.route("/signup").post(validator.userSignUpVerification, controllers.userRegistriration)

router.route("/signin").post(controllers.userSignin)

    

export default router

// 