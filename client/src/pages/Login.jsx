import { Link, Form, redirect, useNavigate, useActionData } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData);
  const error = { msg: '' }
  if (data.password.length < 6) {
    error.msg = 'password too short';
    return error
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('login successfully');
    return redirect('/dashboard')
  } catch (error) {
    error.msg = error?.response?.data?.msg
    return error
  }
}

const Login = () => {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === 'submitting'
  const errors = useActionData();

  const loginDemoUser = async () => {
    const data = {
      email: 'tester@gmail.com',
      password: '12345678'
    }
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Login successfully')
      navigation('/dashboard')

    } catch (error) {
      error.msg = error?.response?.data?.msg
      return error
    }
  }

  return (
    <Wrapper>
      <Form method='post' className="form">
        <Logo />
        <h4>login</h4>
        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type="email" name="email" defaultValue="warrior@gmail.com" />
        <FormRow type="password" name="password" defaultValue="12345678" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting......' : 'Submit'}
        </button>
        <button type="button" className="btn btn-block" onClick={() => loginDemoUser()}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
