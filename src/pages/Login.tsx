import { useContext } from 'react';
import { Redirect } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../shared/auth';
import styled from 'styled-components';

export default function LoginScreen() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isSignedIn } = useContext(AuthContext);
  if (isSignedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <div className="formbox">
      <h1 style={{fontSize: 60, paddingTop: 20}}>LO Tracker</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit((data) => login())}>
        <label>Email</label><br/>
        <TextInput style={{width: 250}} {...register("email", { required: true })}/><br/>

        <label>Password</label><br/>
        <TextInput style={{width: 250}} {...register("password")}/><br/><br/>

        {errors.email?<span>wrong format.</span>:<br/>}

        <input type="submit" style={{width: 100, background: "lightgreen"}} value="sign in"/>
      </form>
    </div>
  )
};

const TextInput = styled.input`
  text-align: center;
`;

