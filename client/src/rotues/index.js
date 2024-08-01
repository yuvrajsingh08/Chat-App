import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import Forgotpassword from "../pages/Forgotpassword";
import Sign from "../pages/Sign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "sign",
        element: <Sign />,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router