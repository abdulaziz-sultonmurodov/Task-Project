import React, { useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState({ email: false, password: false });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({ email: email, password: password })
  //   );

  useEffect(() => {
    if (user) {
      history.push("/album");
    }
  }, [user, history]);

  function ValidateEmail(email) {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setValidation(false);
      return true;
    }
    setValidation(true);
    return false;
  }
  console.log(validation);
  console.log(email);
  const submitHandler = (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      setError({ email: true, password: true });
    } else if (email === "") {
      setError({ email: true });
    } else if (password === "") {
      setError({ password: true });
    } else {
      setError({ email: false, password: false });
    }
    if (email) {
      ValidateEmail(email);
    }
    if (
      error.email === false &&
      error.password === false &&
      validation === false &&
      email &&
      password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: email, password: password })
      );
      history.push("/album");
    }
  };

  return (
    <main className="w-full flex items-center justify-center">
      <section className="my-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl my-6 text-gray-600">Login</h1>
        <form className="flex flex-col justify-center items-center">
          <input
            name="email"
            className="bg-gray-200 my-3 px-4 py-2 rounded-lg"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className={
              error.email === true
                ? "text-white bg-red-500 font-bold rounded-lg w-full text-center px-6 py-2"
                : "hidden"
            }
          >
            {"Email can't be empty"}
          </div>
          <div
            className={
              validation === true
                ? "text-white bg-red-500 font-bold rounded-lg w-full text-center px-6 py-2"
                : "hidden"
            }
          >
            {"Email should be correct format"}
          </div>
          <div className="relative">
            <input
              name="password"
              className="bg-gray-200 my-3 px-4 py-2 rounded-lg"
              type={passwordShown ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={
                error.password === true
                  ? "text-white bg-red-500 font-bold rounded-lg w-full text-center px-6 py-2"
                  : "hidden"
              }
            >
              {"Password can't be empty"}
            </div>
            <div
              className="absolute top-5 right-4 cursor-pointer"
              onClick={togglePasswordVisiblity}
            >
              {passwordShown ? (
                <AiOutlineEye className="w-6 h-6" />
              ) : (
                <AiOutlineEyeInvisible className="w-6 h-6" />
              )}
            </div>
          </div>
          <input
            onClick={submitHandler}
            className="bg-blue-400 font-semibold text-white my-3 px-6 cursor-pointer transform hover:scale-95 py-2 rounded-lg"
            type="submit"
            value="Submit"
          />
        </form>
      </section>
    </main>
  );
};

export default Login;
