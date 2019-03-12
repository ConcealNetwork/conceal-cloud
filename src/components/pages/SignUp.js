import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AppContext } from '../ContextProvider';
import { useFormInput, useFormValidation } from '../../helpers/hooks';


const SignUp = () => {
  const { actions, state } = useContext(AppContext);
  const { signUpUser } = actions;
  const { layout, user, userSettings } = state;
  const { formSubmitted, message } = layout;


  const { value: userName, bind: bindUserName } = useFormInput('');
  const { value: email, bind: bindEmail } = useFormInput('');
  const { value: password, bind: bindPassword } = useFormInput('');

  const formValidation = (
    userName !== '' && userName.length >= 3 &&
    email !== '' && email.length >= 3 &&
    password !== '' && password.length >= userSettings.minimumPasswordLength
  );
  const formValid = useFormValidation(formValidation);

  if (user.loggedIn) return <Redirect to="/" />;

  return (
    <div className="signin-wrapper">

      <div className="signin-box">
        <h2 className="slim-logo"><a href="/">Conceal Cloud</a> <span className="beta-header">BETA</span></h2>
        <h3 className="signin-title-secondary">Sign Up</h3>

        {message &&
          <div className="alert alert-outline alert-danger text-center">{message}</div>
        }

        <form onSubmit={e => signUpUser(e, userName, email, password)}>
          <div className="form-group">
            <input
              {...bindUserName}
              placeholder="User Name"
              type="text"
              name="userName"
              className="form-control"
              minLength={3}
            />
          </div>
          <div className="form-group">
            <input
              {...bindEmail}
              placeholder="E-mail"
              type="email"
              name="email"
              className="form-control"
              minLength={3}
            />
          </div>
          <div className="form-group mg-b-50">
            <input
              {...bindPassword}
              placeholder="Password"
              type="password"
              name="password"
              className="form-control"
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={formSubmitted || !formValid}
            className="btn btn-primary btn-block btn-signin"
          >
            {formSubmitted ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mg-b-0">Already have an account? <Link to="/login">Sign In</Link></p>
        <p className="mg-b-0">Forgot your password? <Link to="/reset_password">Reset It</Link></p>
        <hr />
        <p className="mg-b-0 box-footer">
          Copyright 2019 &copy; All Rights Reserved. Conceal Network<br /><Link to="/terms">Terms &amp; Conditions</Link>
        </p>
      </div>
      ​
    </div>
  )
};

export default SignUp;
