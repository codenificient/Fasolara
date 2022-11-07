const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports.verifyUser = async (req) => {
  //   console.log(req.headers)
  req.email = null
  req.userId = null
  try {
    const bearerHeader = req.headers.authorization

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1]
      //   console.log(token)
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.email = payload.email
      const user = await User.findOne({ email: payload.email })
      req.userId = user.id
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
