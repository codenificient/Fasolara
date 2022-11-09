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
      req.addressId = user.addressId
      req.role = user.role
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports.getEducationLevel = async (level) => {
  const levelsMap = [
    { 1: "Aucune education formal" },
    { 2: "Some primary education" },
    { 3: "CEP" },
    { 4: "Education Informel" },
    { 5: "BEPC" },
    { 6: "Bachelier" },
    { 7: "Un peu d'education universitaire ou Bac Pro" },
    { 8: "DEUG II" },
    { 9: "License Universitaire" },
    { 10: "2 Licenses ou 1 Master Universitaire" },
    { 11: "Doctorat Universitaire" },
  ]
  return levelsMap[level]
}

