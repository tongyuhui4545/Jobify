import Job from "./Job"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAllJobsContext } from "../pages/AllJobs"

const JobsContainer = () => {
  const data = useAllJobsContext()
  let jobs = data.jobs || []

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job}></Job>
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer