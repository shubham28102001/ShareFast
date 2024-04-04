import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cognitoUserPool from "../../cognitoUserPool";
import Logo from '../../assets/logo.png';

const SignUp = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const EMAIL_VALIDATOR = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    const PASSWORD_VALIDATOR = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/;
    const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState("");
    const navigate = useNavigate();

    const checkRequired = (inputField) => {
        if (inputField === "name") {
            if (input.name === "") setError((prevError) => ({ ...prevError, "name": "Name is required" }));
            else setError((prevError) => ({ ...prevError, "name": "" }));
        } else if (inputField === "email") {
            if (input.email === "") setError((prevError) => ({ ...prevError, "email": "Email is required" }));
            else if (!EMAIL_VALIDATOR.test(input.email)) setError((prevError) => ({ ...prevError, "email": "Email is not valid" }));
            else setError((prevError) => ({ ...prevError, "email": "" }));
        } else if (inputField === "password") {
            if (input.password === "") {
                setError((prevError) => ({ ...prevError, "password": "Password is required" }));
                setShowPasswordErrorMsg(false);
            }
            else if (input.password.length < 8) {
                setError((prevError) => ({ ...prevError, "password": "Password must be minimum 8 characters" }));
                setShowPasswordErrorMsg(true);
            }
            else if (!PASSWORD_VALIDATOR.test(input.password)) {
                setError((prevError) => ({ ...prevError, "password": "Password must have atleast one number, special character, uppercase and lowercase letter" }));
                setShowPasswordErrorMsg(true);
            }
            else {
                setError((prevError) => ({ ...prevError, "password": "" }));
                setShowPasswordErrorMsg(false);
            }
        } else if (inputField === "cpassword") {
            if (input.cpassword === "") setError((prevError) => ({ ...prevError, "cpassword": "Confirm Password is required" }));
            else {
                if (input.password === input.cpassword) {
                    document.getElementById("password-mismatch").classList.add("invisible");
                    setError((prevError) => ({ ...prevError, "cpassword": "" }));
                }
                else {
                    document.getElementById("password-mismatch").classList.remove("invisible");
                    setError((prevError) => ({ ...prevError, "cpassword": "Confirm Password must match Password" }));
                }
            }
        }
    }

    useEffect(() => {
        if (Object.values(error).every((error) => error === "") && submitting) {
            var attributeList = [];
            var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
            var dataName = {
                Name: "name",
                Value: input.name,
            };
            var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(
                dataName
            );
            attributeList.push(attributeName);
            cognitoUserPool.signUp(
                input.email,
                input.password,
                attributeList,
                null,
                (err, data) => {
                    if (err) {
                        console.log(err);
                        document.getElementById("signup-message").classList.remove("text-green-600");
                        document.getElementById("signup-message").classList.add("text-red-600");
                        setSignUpMessage("Error while Sign Up");
                    } else {
                        document.getElementById("signup-message").classList.remove("text-red-600");
                        document.getElementById("signup-message").classList.add("text-green-600");
                        setSignUpMessage("Successfull SignUp. Verify your email before Login");
                        setTimeout(() => {navigate("/")}, 2000);
                    }
                }
            );
        }
        // eslint-disable-next-line
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkRequired("name");
        checkRequired("email");
        checkRequired("password");
        checkRequired("cpassword");
        setSubmitting(true);
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:max-w-sm sm:mx-auto sm:w-full">
                    <img className="w-auto mx-auto h-10" src={Logo} alt="logo"/>
                    <h2 className="font-bold mt-10 text-center text-2xl">
                        Sign Up
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="font-medium block text-sm">Name</label>
                            <div className="mt-2">
                                <input
                                    id="name" name="name" type="text" value={input.name} required placeholder="Enter Name"
                                    className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
                                    onChange={(e) => setInput((prevInput) => ({ ...prevInput, "name": e.target.value }))}
                                />
                            </div>
                        </div>
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
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password" name="password" type="password" required placeholder="Enter Password"
                                    className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
                                    onChange={(e) => setInput((prevInput) => ({ ...prevInput, "password": e.target.value }))}
                                />
                                {showPasswordErrorMsg ? <small className="text-red-600">Password must have atleast one number, special character, uppercase and lowercase letter</small> : <></>}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="cpassword" className="font-medium block text-sm">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="cpassword" name="cpassword" type="password" required placeholder="Enter Confirm Password"
                                    className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
                                    onChange={(e) => setInput((prevInput) => ({ ...prevInput, "cpassword": e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="text-sm text-center invisible" id="password-mismatch">
                            <p className="font-semibold text-red-600">Confirm Password must match Password</p>
                        </div>
                        <div className="text-sm text-center">
                            <p id="signup-message" className="font-semibold text-red-600">{signUpMessage}</p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full focus-visible:outline flex font-semibold justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm">
                        Already a member?{' '}
                        <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignUp;
