import {Router} from 'express'
import {getCurrentUser, getApplicationStats, updateUser} from '../controllers/userController.js'
import { authorizePermissions, checkForTestUser } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'

const router = Router() 

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats',authorizePermissions('admin'), getApplicationStats)
router.patch('/update-user', checkForTestUser, validateUpdateUserInput, upload.single('avatar'), updateUser)


export default router