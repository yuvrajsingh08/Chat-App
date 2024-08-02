const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function login(request, response) {
  try {
    const { email, password } = request.body;

    // const login = await UserModel.findOne({ email:email, password:hashpassword });
    const user = await UserModel.findOne({ email });

    if(user) {
        const verifyPassword = await bcryptjs.compare(password,user.password);

        if (!verifyPassword) {
          return response.status(400).json({
            message: "Please check password",
            error: true,
          });
        }
    }
    if (!user) {
        return response.status(400).json({
            message: "User not exit",
            error: true,
        });
    }

   const tokenData = {
     id: user._id,
     email: user.email,
   };
   const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
     expiresIn: "1d",
   });

   const cookieOptions = {
     http: true,
     secure: true,
     sameSite: "Lax", // or 'Strict' or 'None'
     maxAge: 24 * 60 * 60 * 1000, // 1 day
   };

   return response.cookie("token", token, cookieOptions).status(200).json({
     message: "Login successfully",
     token: token,
     data: user,
     success: true,
   });



  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = login;
