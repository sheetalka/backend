const handleRegistration = (req, res, db, bcrypt) => {
  const { email, name, password, imageUrl } = req.body;
  if (!email || !name || !password || !imageUrl) {
    return res.status(400).json("Incorrect Form Submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
        imageurl: imageUrl
      })
      .into("login")
      .returning("email")
      .then((returnedEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: returnedEmail[0],
            name: name,
            joined: new Date()
          })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .catch((err) => res.status(400).json("unable to register"));
};
module.exports = {
  handleRegistration: handleRegistration
};
