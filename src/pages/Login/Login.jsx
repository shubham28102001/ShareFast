import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import cognitoUserPool from "../../cognitoUserPool";
import Logo from '../../assets/logo.png';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const EMAIL_VALIDATOR = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    const navigate = useNavigate();

    const checkRequired = (inputField) => {
        if (inputField === "email") {
            if (input.email === "") setError((prevError) => ({ ...prevError, "email": "Email is required" }));
            else if (!EMAIL_VALIDATOR.test(input.email)) setError((prevError) => ({ ...prevError, "email": "Email is not valid" }));
            else setError((prevError) => ({ ...prevError, "email": "" }));
        } else if (inputField === "password") {
            if (input.password === "") setError((prevError) => ({ ...prevError, "password": "Password is required" }));
            else setError((prevError) => ({ ...prevError, "password": "" }));
        }
    }

    useEffect(() => {
        if (Object.values(error).every((error) => error === "") && submitting) {
            const user = new CognitoUser({
                Username: input.email,
                Pool: cognitoUserPool,
            });
            const authDetails = new AuthenticationDetails({
                Username: input.email,
                Password: input.password,
            });
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    const jwtToken = data.accessToken.jwtToken;
                    const id_jwtToken = data.idToken.jwtToken;
                    localStorage.setItem("email", input.email);
                    localStorage.setItem("jwtToken", jwtToken);
                    localStorage.setItem("id_jwtToken", id_jwtToken);
                    setLoginMessage("");
                    navigate("/upload");
                },
                onFailure: (err) => {
                    setLoginMessage("Incorrect Email or Password");
                    if (err.name === "UserNotConfirmedException") {
                        setLoginMessage("Please confirm your email");
                    }
                },
                newPasswordRequired: (data) => {
                    console.log("New password required: ", data);
                },
            });
        }
        // eslint-disable-next-line
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkRequired("email");
        checkRequired("password");
        setSubmitting(true);
    }

    return (
        <>
            <div className="h-screen lg:px-8 justify-center min-h-full flex-1 flex-col px-6 flex py-12">
                <div className="sm:max-w-sm sm:mx-auto sm:w-full">
                    <img className="w-auto mx-auto h-10" src={Logo} alt="logo"/>
                    <h2 className="font-bold mt-10 text-center text-2xl">
                        Log In
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="font-medium block text-sm">Email</label>
                            <div className="mt-2">
                                <input
                                    id="email" name="email" type="email" required placeholder="Enter Email"
                                    className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
                                    onChange={(e) => setInput((prevInput) => ({ ...prevInput, "email": e.target.value }))}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="font-medium block text-sm">Password</label>
                                <div className="text-sm">
                                    <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password" name="password" type="password" required placeholder="Enter Password"
                                    className="w-full ring-gray-300 pl-2 focus:ring-indigo-600 focus:ring-inset block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
                                    onChange={(e) => setInput((prevInput) => ({ ...prevInput, "password": e.target.value }))}
                                />
                            </div>
                        </div>
                        <br></br>
                        <div className="text-sm text-center">
                            <p className="font-semibold text-red-600">{loginMessage}</p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full focus-visible:outline flex font-semibold justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm">
                        Not a member?{' '}
                        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;
