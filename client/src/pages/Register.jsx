import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import customFetch from '../utils/customFetch'

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    return redirect("/");
  } catch (err) {
    console.log(err);
    
    return err;
  }
};

const Register = () => {
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
        <FormRow
          type="email"
          name="email"
          defaultValue="john@gmail.com"
        ></FormRow>
        <FormRow type="password" name="password" defaultValue=""></FormRow>
        <button type="submit" className="btn btn-block">
          Submit
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
