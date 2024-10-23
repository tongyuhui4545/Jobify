import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link, Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const Job = ({
    _id, position, company, jobLocation, jobType, createdAt, jobStatus
}) => {
    const date = day(createdAt).format('MMM Do, YYYY')
    const navigate = useNavigate()
    const onDeleteJob = async (e, id) => {
        e.preventDefault()
        try {
            await customFetch.delete(`/jobs/${id}`);
            toast.success('Job deleted');
            navigate('/dashboard/all-jobs');
        } catch (error) {
            toast.error('Failed to delete job');
        }
    }

    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation}></JobInfo>
                    <JobInfo icon={<FaCalendarAlt />} text={date}></JobInfo>
                    <JobInfo icon={<FaBriefcase />} text={jobType}></JobInfo>
                    <div className={`status ${jobStatus}`}>{jobStatus}</div>
                </div>
                <footer className="actions">
                    <Link className='btn edit-btn' to={`../edit-job/${_id}`}>Edit</Link>
                    <Form>
                        <button type="submit" className='btn delete-btn' onClick={(e) => onDeleteJob(e, _id)}>Delete</button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Job