import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { signupUrl, loginUrl } from "../Constants";
import { useDispatch } from "react-redux";
import { setUser } from "../app/UserSlice";
import { useNavigate } from "react-router-dom";

const signupText = {
  infoText: "Already a user",
  buttonText: "Login",
  buttonText2: "Signup",
};

const loginText = {
  infoText: "Don't have an account",
  buttonText: "Signup",
  buttonText2: "Login",
};

const Signup = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { infoText, buttonText, buttonText2 } = isSignup
    ? signupText
    : loginText;

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
    error: null,
  });

  function checkValidation() {
    if (!formState.email) {
      setError({ error: "Please enter the email" });
      return false;
    } else if (!formState.password) {
      setError({ error: "Please enter the password" });
      return false;
    } else if (!isValidEmail(formState.email)) {
      setError({ emailError: "Please enter a valid email" });
      return false;
    } else if (!isValidPassword(formState.password)) {
      setError({
        passwordError:
          "Your password must contain lowercase, uppercase, number, special character",
      });
      return false;
    }
    return true;
  }

  // ✅ FIXED SIGNUP / LOGIN FUNCTION
  const signup = async () => {
    if (!checkValidation()) return;

    setIsLoading(true);

    try {
      const url = isSignup ? signupUrl : loginUrl;

      const apiData = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        credentials: "include",
      });

      const jsonData = await apiData.json();
      console.log("API RESPONSE:", jsonData);

      // ❌ HTTP error handling
      if (!apiData.ok) {
        setError({
          emailError: null,
          passwordError: null,
          error: jsonData?.error || "Request failed",
        });
        return;
      }

      // ❌ backend error
      if (jsonData?.error) {
        setError({
          emailError: null,
          passwordError: null,
          error: jsonData.error,
        });
        return;
      }

      // ✅ success case
      if (jsonData?.res) {
        dispatch(setUser(jsonData.res));
        navigate("/");

        setFormState({
          name: "",
          email: "",
          password: "",
        });

        setError({
          emailError: null,
          passwordError: null,
          error: null,
        });
      } else {
        setError({
          emailError: null,
          passwordError: null,
          error: "Invalid response from server",
        });
      }
    } catch (err) {
      console.log("ERROR:", err);

      setError({
        emailError: null,
        passwordError: null,
        error: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setError({
          emailError: null,
          passwordError: null,
          error: null,
        });
      }, 3000);
    }
  };

  const genricError = error?.error;

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-full w-full flex justify-center items-center">
        <div className="glass h-2/3 w-1/3 flex justify-center items-center flex-col pb-13">
          <h1 className="text-3xl">Welcome to Shopsy</h1>

          {isSignup ? (
            <FieldSet
              data={{
                label: "Name",
                placeholder: "Enter your name",
                value: formState.name,
                setValue: (newValue) => {
                  setFormState({
                    ...formState,
                    name: newValue,
                  });
                },
              }}
            />
          ) : null}

          <FieldSet
            data={{
              label: "Email",
              placeholder: "Enter your email",
              value: formState.email,
              error: error.emailError,
              setValue: (newValue) => {
                setFormState({
                  ...formState,
                  email: newValue,
                });
              },
            }}
          />

          <FieldSet
            data={{
              label: "Password",
              placeholder: "Enter your password",
              value: formState.password,
              error: error.passwordError,
              type: "password",
              setValue: (newValue) => {
                setFormState({
                  ...formState,
                  password: newValue,
                });
              },
            }}
          />

          {genricError ? (
            <p className="text-red-500 mt-2">{genricError}</p>
          ) : null}

          <button onClick={signup} className="btn mt-3 w-2/4">
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              buttonText2
            )}
          </button>

          <p className="mt-5">
            {infoText}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setFormState({
                  name: "",
                  email: "",
                  password: "",
                });
              }}
              className="text-blue-300 ml-2"
            >
              {buttonText}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;