import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo-bg.png'
import io from 'socket.io-client'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log('user',user)
  const fetchUserDetails = async()=>{
    try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
        const response = await axios({
          url : URL,
          withCredentials : true
        })

        dispatch(setUser(response.data.data))

        if(response.data.data.logout){
            dispatch(logout())
            navigate("/sign")
        }
        // console.log("current user Details",response)
    } catch (error) {
        console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  //  useEffect(() => {
  //    if (!location?.state?.name) {
  //      navigate("/email");
  //    }
  //    fetchUserDetails();
  //  }, []);
  
   

  /***socket connection */
  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
      auth : {
        token : localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser',(data)=>{
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])


  const basePath = location.pathname === '/'
  return (
    <div className='grid sm:grid-cols-[300px,1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden"} sm:block`}>
           <Sidebar/>
        </section>

        {/**message component**/}
        <section className={`${basePath && "hidden"}`} >
            <Outlet/>
        </section>


        <div className={`justify-center bg-[#41C9E2] items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "sm:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-2xl  text-white mt-8'>Select user to send message</p>
        </div>
    </div>
  )
}

export default Home
