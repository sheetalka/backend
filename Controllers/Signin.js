const handleSignin = (req, res, db, bcrypt) => {
  const { email, password, imageUrl } = req.body;
  if (!email || !password || !imageUrl) {
    return res.status(400).json("Incorrect Form Submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .andWhere("imageurl", "=", imageUrl)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.status(400).json("unable to get user");
          });
      } else {
        res.status(400).json("wrong crediential");
      }
    })
    .catch((err) => {
      res.status(400).json("wrong crediential");
    });
};
module.exports = {
  handleSignin: handleSignin,
};
