module.exports = function (db) {
  var Sessions = new db.Schema({
    session: {
      lastAccess: Date,
      cookie: {
        originalMaxAge: Date,
        expires: Date,
        httpOnly: Boolean,
        path: String,
      },
      _csrf: String,
    },
    expires: Date,
  });
  return db.model("Sessions", Sessions);
};
