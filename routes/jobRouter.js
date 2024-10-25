import { Router } from 'express'
import { getAllJobs, getSingleJob, createJob, updateJob, deleteJob, showStats } from '../controllers/jobController.js'
import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'

const router = Router()
router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob)
router.route('/stats').get(showStats)
router.route('/:id').get(getSingleJob).patch(validateJobInput, checkForTestUser, updateJob).delete(validateIdParam, checkForTestUser, deleteJob)


export default router