import { FormRow } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useOutletContext } from 'react-router-dom'
import { Form } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {

  const formData = await request.formData()
  const file = formData.get('avatar');
  
  if (file && file.size > 500000) {
    toast.error('Image size too large')
    return null
  }
  try {
    await customFetch.patch('/users/update-user', formData)
    toast.success('Profile updated successfully')
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
      return null;
  }
}

const Profile = () => {
  const { user } = useOutletContext()
  const { name, lastName, email, location } = user

  return (
    <Wrapper>
      <Form method="post" className="form" encType='multipart/form-data'>
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor='avatar' className='form-label'>Select an image file (max 0.5 MB)</label>
            <input type="file" name="avatar" className="form-input" id="avatar" accept='image/*' />
          </div>
          <FormRow type='text' name="name" labelText='name' defaultValue={name}></FormRow>
          <FormRow type='text' name="lastName" labelText='last name' defaultValue={lastName}></FormRow>
          <FormRow type='email' labelText='email' name="email" defaultValue={email}></FormRow>
          <FormRow type='text' labelText='location' name="location" defaultValue={location}></FormRow>
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper >
  )
}

export default Profile