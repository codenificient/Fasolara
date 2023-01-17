const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyUser = async (req) => {
  // console.log(req.headers);
  req.email = null;
  req.userId = null;
  req.addressId = null;
  try {
    const bearerHeader = req.headers.authorization;
    // console.log(bearerHeader);

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      // console.log(token);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // const payload = jwt.verify(bearerHeader, process.env.JWT_SECRET);
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });
      if (
        user &&
        (user.role == "employee" ||
          user.role == "manager" ||
          user.role == "admin")
      ) {
        req.teamId = user.teamId;
      }
      req.userId = user.id;
      req.addressId = user.addressId;
      req.role = user.role;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEducationLevel = async (level) => {
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
  ];
  return levelsMap[level];
};

export { verifyUser, getEducationLevel };
