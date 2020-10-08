import  express from 'express'
import userControllers from '../controllers/auth-controllers'
import validator from '../middleware/validator'


const router = express.Router()


router.get("/users", userControllers.getAllUsers)
router.get("/user/:user_id", userControllers.oneUser)


router.route("/account")
.get( userControllers.getAllAccount)
.post(userControllers.createAccount)


router.route("/signup").post(validator.userSignUpVerification, userControllers.userRegistriration)

router.route("/signin").post(userControllers.userSignin)

    

export default router

// 