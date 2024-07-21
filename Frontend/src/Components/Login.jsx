import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  getUserName,
  loginError,
  loginRequest,
  loginSuccess,
} from '../features/auth/auth.actions';
import styles from './login.module.css';
import Registration from './Registration';
import { useDispatch } from 'react-redux';
import { getValue } from '../Utils/LocalStorage';
import { Navigate } from 'react-router-dom';
import { ListenerContext } from '../Contexts/ListenerProvider';

export default function FormDialog() {
  const dispatch = useDispatch();

  const [loginModal, setLoginModal] = useState(true);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [loginModalOtp, setLoginModalOtp] = useState(false);
  const [loginModalEmailOtp, setLoginModalEmailOtp] = useState(false);
  const [loginOtpNumberChecker, setLoginOtpNumberChecker] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [error, setError] = useState(false);
  const { open, setOpen } = useContext(ListenerContext);

  const handleContinueRegistration = async () => {
    if (emailOrMobile.length === 0) {
      setError(true);
      return;
    }

    try {
      const response = await fetch(
        'https://justice-json-043.onrender.com/auth/otplogin',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            emailOrMobile,
          }),
        }
      );
      const json = await response.json();
      console.log(json);

      if (json.status === 401) {
        return;
      }
      setLoginModalOtp(!loginModalOtp);
      setLoginModal(!loginModal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtp = async () => {
    console.log('verifyOtp');
    if (loginOtpNumberChecker.length !== 4) {
      return;
    }
    try {
      const response = await fetch(
        `https://justice-json-043.onrender.com/auth/otpverify?emailOrMobile=${emailOrMobile}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            code: Number(loginOtpNumberChecker),
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.status === 200) {
        dispatch(loginSuccess(json));
        getProfile();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackInLoginEmail = () => {
    setLoginModalOtp(!loginModalOtp);
    setLoginModalEmailOtp(!loginModalEmailOtp);
  };

  const handleToggleModal = () => {
    setRegistrationModal(!registrationModal);
    setLoginModal(!loginModal);
  };

  const handleBacktoHomePagefromEmailotp = () => {
    setLoginModal(!loginModal);
    setLoginModalEmailOtp(!loginModalEmailOtp);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setError(false);
    let { value } = e.currentTarget;
    setEmailOrMobile(value);
  };

  // const handleLogin = async () => {
  //   if (loginPassword.length === 0) {
  //     return;
  //   }

  //   try {
  //     dispatch(loginRequest());
  //     const response = await fetch(
  //       'http://localhost:8080/auth/login',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           emailOrMobile,
  //           password: loginPassword,
  //         }),
  //       }
  //     );
  //     const json = await response.json();
  //     console.log(json);
  //     if (json.status === 200) {
  //       dispatch(loginSuccess(json));
  //       getProfile();
  //     } else {
  //       dispatch(loginError(json.error));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(loginError(error));
  //   }
  // };
  const handleLogin = async () => {
    if (loginPassword.length === 0 || emailOrMobile.length === 0) {
      console.log('Email or mobile number and password must not be empty.');
      return;
    }
  
    try {
      dispatch(loginRequest());
      const response = await fetch(
        'https://justice-json-043.onrender.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: emailOrMobile, // Update key to match backend
            password: loginPassword,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (response.ok) { // Check for successful response
        dispatch(loginSuccess(json));
        getProfile();
      } else {
        dispatch(loginError(json.error || 'Login failed'));
      }
    } catch (error) {
      console.log(error);
      dispatch(loginError(error.message || 'An error occurred'));
    }
  };
  

  const getProfile = async () => {
    try {
      const authToken = getValue('userToken');
      const response = await fetch(
        'https://justice-json-043.onrender.com/auth/getuser',
        {
          method: 'GET',
          headers: {
            authToken: `${authToken}`,
            'content-type': 'application/json',
          },
        }
      );
      const json = await response.json();
      if (json.status === 200) {
        dispatch(getUserName(json.user.name));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dialogCss = {
    width: '40%',
    height: 550,
    minWidth: '350px',
    margin: 'auto',
  };

  return (
    <div>
      <div  style={{padding:"6px"}}
      className={styles.btn}>
        <Button onClick={handleClickOpen}>Login or create account</Button>
      </div>
      <Dialog PaperProps={{ sx: dialogCss }} open={open} onClose={handleClose}>
        <DialogContent>
          {!loginModalOtp && !loginModalEmailOtp && (
            <div className={styles.personalBusiness}>
              <div
                onClick={handleToggleModal}
                className={
                  registrationModal
                    ? styles.blackColor
                    : styles.linearBackground
                }
              >
                SIGN UP
              </div>
              <div
                onClick={handleToggleModal}
                className={
                  loginModal ? styles.blackColor : styles.linearBackground
                }
              >
                Login
              </div>
            </div>
          )}

          {!registrationModal ? (
            <Registration />
          ) : (
            <>
              <div
                className={
                  loginModal ? styles.display_none : styles.modalContainer
                }
              >
                <div className={styles.login_sign_text}>Login</div>
                <div className={styles.email_mobile_text}>
                  <p>Email or Mobile Number</p>
                  <input type="text" value={emailOrMobile} onChange={handleChange} />
                  {error && (
                    <p style={{ color: 'red' }}>
                      Please enter valid email or mobile number
                    </p>
                  )}
                </div>
                <div
                  className={styles.continue_text}
                  onClick={handleContinueRegistration}
                >
                  CONTINUE
                </div>
                <div className={styles.loginsignup_text}>LOGIN</div>
                <div className={styles.google_login_container}>

               
                  <div>Login With Google</div>
                </div>

                <div className={styles.terms_text}>
                  By proceeding, you agree to MakeMyTrip's
                  <span>Privacy Policy</span> ,<span>Privacy Policy</span> and
                  <span>T&Cs</span>
                </div>
              </div>

              <div
                className={
                  loginModalOtp
                    ? styles.loginModalOtpContainer
                    : styles.display_none
                }
              >
                <div
                  className={styles.back_otp_text}
                  onClick={handleContinueRegistration}
                >
                  Back
                </div>
                <div className={styles.otp_verifytext}>
                  Verify Your Mobile Number
                </div>
                <div className={styles.otp_verifytext_mobile}>
                  OTP has been sent to your number
                </div>
                <div className={styles.otp_text}>OTP</div>
                <div className={styles.otp_mobile_input}>
                  <input
                    type="number"
                    onChange={(e) =>
                      setLoginOtpNumberChecker(e.currentTarget.value)
                    }
                  />
                </div>

                <button
                  disabled={loginOtpNumberChecker.length !== 4}
                  className={
                    loginOtpNumberChecker.length === 4
                      ? styles.otp_mobile_login_button
                      : styles.colorGrey
                  }
                  onClick={() => handleOtp()}
                >
                  Login
                </button>

                <div
                  onClick={handleBackInLoginEmail}
                  className={styles.otp_login_forgot_text}
                >
                  or Login via Password
                </div>
              </div>

              <div
                className={
                  loginModalEmailOtp
                    ? styles.loginModalEmailOtpContainer
                    : styles.display_none
                }
              >
                <div className={styles.back_otp_text}>Back</div>
                <div className={styles.otp_verifytext}>Login via Password</div>
                <div className={styles.otp_verifytext_mobile}>
                  Please enter password
                </div>
                <div className={styles.otp_text}>Password</div>
                <div className={styles.otp_mobile_input}>
                  <input
                    type="password"
                    onChange={(e) => setLoginPassword(e.currentTarget.value)}
                  />
                </div>
                <div
                  onClick={handleLogin}
                  className={styles.otp_mobile_login_button}
                >
                  Login
                </div>
                <div className={styles.otp_login_forgot_text}>Forgot Password</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
