import { Link, Form, redirect, useActionData } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from '../utils/customerFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData);
  const errors = {msg:''}
  if(data.password.length < 3){
    errors.msg = 'password too short';
    return errors
  }
  try {
    await customFetch.post('/auth/login', data);  
    toast.success('login successfully');
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
const errors = useActionData()
  return (
    <Wrapper>
      <Form method='post' className="form">
        <Logo />
        <h4>login</h4>
        {errors?.msg && <p style={{color:'red'}}>{error.msg}</p>}
        <FormRow type="email" name="email" defaultValue="email" />
        <FormRow type="password" name="password" defaultValue="password" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button type="button" className="btn btn-block">
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
