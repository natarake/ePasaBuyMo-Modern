import { Link } from 'react-router-dom';
import loginImg from '../assets/login.jpg';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { auth, provider } from '../firebase/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { registerService } from '../services/authService';
import { Button } from '../components/ui/button';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerService(inputs);
    } catch (err) {
      console.log(err);
    }
  };

  // google sign in function
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        localStorage.setItem('email', email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="flex justify-center items-center h-2/3 bg-slate-300">
        <div className="w-full md:w-2/5 h-full bg-slate-100 flex flex-col p-8 justify-between">
          <h1 className="text-2xl text-[#060606] font-semibold font-display">
            <span className="text-red-500">e</span>Pasa
            <span className="text-red-500">Buy</span>Mo
          </h1>

          <div className="w-full flex flex-col">
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              className="w-full border-b border-[#060606] bg-transparent py-2 my-2 outline-none focus:outline-none"
            />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border-b border-[#060606] bg-transparent py-2 my-2 outline-none focus:outline-none"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border-b border-[#060606] bg-transparent py-2 my-2 outline-none focus:outline-none"
            />
            {error && <p className="text-red-500">Something went wrong...</p>}
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Register
            </Button>
            <div className="flex items-center justify-center relative py-2">
              <div className="w-1/2 h-[1px] bg-black"></div>
              <p className="text-center text-xs text-gray-500 absolute bg-slate-100 px-1">OR</p>
            </div>
            <Button
              onClick={signInWithGoogle}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <FcGoogle className="mr-2" />
              Sign Up with Google
            </Button>
          </div>

          <p className="text-xs font-thin text-[#060606]">
            Already have an account?
            <Link to="/login" className="text-blue-400 ml-1 underline underline-offset-2 italic">
              Sign in.
            </Link>
          </p>
        </div>
        <div className="relative w-3/5 h-full hidden md:flex flex-col ">
          <img src={loginImg} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;
