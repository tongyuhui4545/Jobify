import { FormRow, FormRowSelect, SubmitButton } from '.'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants'
import { useAllJobsContext } from '../pages/AllJobs'

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext()
  const { search, jobType, jobStatus, sort } = searchValues
  const submit = useSubmit()

  const debounce = (onChange) => {
    return e => {
      const form = e.currentTarget.form;
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 1000)
    }
  }
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow type='search' name='search' defaultValue={search} onChange={debounce((form) => {
            submit(form)
          })} />
          <FormRowSelect labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            onChange={e => {
              submit(e.currentTarget.form)
            }}
            defaultValue={jobStatus}
          />
          <FormRowSelect labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            onChange={e => {
              submit(e.currentTarget.form)
            }}
            defaultValue={jobType}
          />
          <FormRowSelect name='sort' defaultValue={sort} list={['all', ...Object.values(JOB_SORT_BY)]} />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>Reset Search Values</Link>
          {/* TEMP */}
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer