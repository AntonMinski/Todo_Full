import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import classes from './AuthForm.module.css';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import toast from '../../api/toast';




const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmRef = useRef();

  // const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();


  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const login = (enteredEmail, enteredPassword, login_url) => {
    axios
      .post(login_url, {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((response) => {
        // authCtx.login(response.data.access_token);
        const tokens = {
          access_token: response.data.access_token,
          refreshToken: response.data.refreshToken,
        };

        dispatch(authActions.setLogin(tokens));
        // console.log(response)

        history.replace("/"); // redirect after login
        setIsLogin(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  const SubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let login_url = `${process.env.REACT_APP_BASE_URL}/login`;
    // let passwordConfirm;

    

    if (!isLogin) { 
      
      const reg_url = `${process.env.REACT_APP_BASE_URL}/register`; 
      const passwordConfirm = passwordConfirmRef.current.value;

      axios.post(reg_url, {
        email: enteredEmail,
        password: enteredPassword,
        password_confirm: passwordConfirm,

    }).then(response => {
      toast.success('Account created')
      setTimeout(login(enteredEmail, enteredPassword, login_url), 3000)

    }).catch(error => toast.error(error.response.data.message))
    } else {
    
      login(enteredEmail, enteredPassword, login_url)
    }
  }

     
  return (
    <div className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        {!isLogin && <div className={classes.control}>
          <label htmlFor='password_confirm'>Password Confirmation</label>
          <input type='password' id='password_confirm' required 
          ref={passwordConfirmRef} />
        </div>}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
