import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { setToken } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo-white.png"

const Sign = () => {
  const [data, setData] = useState({
    email: "",
    FaPassport: ""
  });
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

    try {
     const response = await axios({
       method: "post",
       url: URL,
       data: {
         email: data.email,
         password: data.password,
       },
       withCredentials: true,
     });

      toast.success(response.data.message);

        if (response.data.success) {
          dispatch(setToken(response?.data?.token));
          localStorage.setItem("token", response?.data?.token);

          setData({
            email: "",
            password: "",
          });
          navigate("/");
        }
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      toast.error('invalid credentials');
    }
  };

  return (
    <div className="w-[100%] h-[100vh] bg-hero-pattern flex flex-col justify-center items-center">
      <div className="h-[80%] min-w-[25vw] w-[80%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[25%] shadow-xl bg-white rounded-2xl  flex flex-col  gap-2  py-8 px-6 justify-evenly">
        {/* <h1 className="font-bold text-4xl text-[#41C9E2] mb-8 ">Connect..</h1> */}
        <div className='w-full h-min relative'>
          <img src={logo} className="w-[8rem]  relative left-0 " alt="" />
        </div>
        <h1 className="font-semibold text-2xl mb-2">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label> <br />
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            placeholder="Enter your email"
            className="bg-slate-100 px-2  focus:outline-[#008DDA]  min-w-full my-2 py-2 mx-auto"
            required
          />
          <br />
          <label htmlFor="email">Password:</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter your password"
            className="bg-slate-100 px-3 py-2  min-w-full my-2  focus:outline-[#008DDA]"
            value={data.password}
            onChange={handleOnChange}
            required
          />
          <button className="mx-auto bg-[#41C9E2] hover:bg-[#008DDA] duration-400 text-white w-[100%] py-3 mt-6 font-semibold text-md rounded-2xl">
            Login In now
          </button>
          <div>
            <p className="text-[#41C9E2] text-sm text-right  mt-1">
              forget password ?
            </p>
          </div>
          <p className="my-3 text-center">
            Don't have account ?{" "}
            <Link to={"/Register"} className="hover:text-primary font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Sign
