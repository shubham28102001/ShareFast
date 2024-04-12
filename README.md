# ShareFast

* *Date Created*: 15 Mar 2024
* *Last Modification Date*: 7 Apr 2024

## Author

* [Shubham Vijaykumar Patel](mailto:sh659429@dal.ca) - *(Creator)*

## Services Used

- Compute: Amazon EC2, AWS Lambda
- Storage: Amazon S3, Amazon DynamoDB
- Network: Amazon API Gateway
- General: Amazon EventBridge, Amazon Cognito

The whole project is provisioned by AWS CloudFormation

## Application Architecture
![Application Architecture](https://github.com/shubham28102001/ShareFast/assets/72617204/177d2bd3-8f7c-4cd7-b6e4-c0698df3239a)


## Sources used for Code

### [src\pages\Login\Login.jsx](src\pages\Login\Login.jsx)

*Lines 75 - 127*
```
<div className="h-screen lg:px-8 justify-center min-h-full flex-1 flex-col px-6 flex py-12">
  <div className="sm:max-w-sm sm:mx-auto sm:w-full">
    <img className="w-auto mx-auto h-10" src={Logo} alt="logo" />
    <h2 className="font-bold mt-10 text-center text-2xl">Log In</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="font-medium block text-sm">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter Email"
            className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
            onChange={(e) =>
              setInput((prevInput) => ({ ...prevInput, email: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="font-medium block text-sm">
            Password
          </label>
          <div className="text-sm">
            <a
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter Password"
            className="w-full ring-gray-300 pl-2 focus:ring-indigo-600 focus:ring-inset block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
            onChange={(e) =>
              setInput((prevInput) => ({
                ...prevInput,
                password: e.target.value,
              }))
            }
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
      Not a member?{" "}
      <a
        href="/signup"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Sign Up
      </a>
    </p>
  </div>
</div>
```

### [src\pages\SignUp\SignUp.jsx](src\pages\SignUp\SignUp.jsx)

*Lines 112 - 186*
```
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:max-w-sm sm:mx-auto sm:w-full">
    <img className="w-auto mx-auto h-10" src={Logo} alt="logo" />
    <h2 className="font-bold mt-10 text-center text-2xl">Sign Up</h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="font-medium block text-sm">
          Name
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            value={input.name}
            required
            placeholder="Enter Name"
            className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
            onChange={(e) =>
              setInput((prevInput) => ({ ...prevInput, name: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="font-medium block text-sm">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter Email"
            className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
            onChange={(e) =>
              setInput((prevInput) => ({ ...prevInput, email: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="font-medium block text-sm">
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter Password"
            className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
            onChange={(e) =>
              setInput((prevInput) => ({
                ...prevInput,
                password: e.target.value,
              }))
            }
          />
          {showPasswordErrorMsg ? (
            <small className="text-red-600">
              Password must have atleast one number, special character,
              uppercase and lowercase letter
            </small>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="cpassword" className="font-medium block text-sm">
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="cpassword"
            name="cpassword"
            type="password"
            required
            placeholder="Enter Confirm Password"
            className="w-full ring-gray-300 pl-2 focus:ring-inset focus:ring-indigo-600 block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm"
            onChange={(e) =>
              setInput((prevInput) => ({
                ...prevInput,
                cpassword: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="text-sm text-center invisible" id="password-mismatch">
        <p className="font-semibold text-red-600">
          Confirm Password must match Password
        </p>
      </div>
      <div className="text-sm text-center">
        <p id="signup-message" className="font-semibold text-red-600">
          {signUpMessage}
        </p>
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
      Already a member?{" "}
      <a
        href="/"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Login
      </a>
    </p>
  </div>
</div>
```

The code above was created by adapting the code in [Sign-in and Registration](https://tailwindui.com/components/application-ui/forms/sign-in-forms) as shown below: 

```
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
```

- The code in [Sign-in and Registration](https://tailwindui.com/components/application-ui/forms/sign-in-forms) was implemented by carefully examining the original source and comprehending the logic and functionality of it. I then modified the code to make it meet the specifications for our project.
- [Sign-in and Registration](https://tailwindui.com/components/application-ui/forms/sign-in-forms)'s Code was used because my goal was to acquire knowledge about various patterns of design that would be applicable to the task. I thought that using well-written code from other sources would speed up development and enable me to get the functionality and efficiency I wanted.
- [Sign-in and Registration](https://tailwindui.com/components/application-ui/forms/sign-in-forms)'s Code was modified by making significant code modifications to it in accordance with the requirements of the component, such as modifying variable names and integrating it with other components. Additionally, the content was changed to meet the module's requirements.

## Acknowledgments
* The code referred was very helpful to kickstart the assignment. I appreciate the hardwork of all the authors.
