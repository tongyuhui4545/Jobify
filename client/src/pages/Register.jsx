import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import customFetch from '../utils/customerFetch'
import FormRow from "../components/FormRow";
import { toast } from 'react-toastify'
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('auth/register', data)
    toast.success('Registration successful')
    return redirect('/');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="john"></FormRow>
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Smith"
        ></FormRow>
        <FormRow type="text" name="location" defaultValue="earth"></FormRow>
        <FormRow type="email" name="email" defaultValue="john@gmail.com"></FormRow>
        <FormRow type="password" name="password" defaultValue=""></FormRow>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Submit'}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Log in
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
