import {Router} from 'express'
import {getAllJobs, getSingleJob, createJob, updateJob, deleteJob} from '../controllers/jobController.js'
import {validateJobInput, validateIdParam} from '../middleware/validationMiddleware.js' 

const router = Router()
router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(validateJobInput, getSingleJob).patch(validateJobInput, validateJobInput, updateJob).delete(validateIdParam, deleteJob)


export default router