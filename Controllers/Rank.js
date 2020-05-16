const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "b205a72957fd4e149860d8e93897b669"
});
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("fail to call api"));
};
const handleRank = (req, res, db) => {
  const { id,imageUrl} = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get enteries"));
};
module.exports = {
  handleRank: handleRank,
  handleApiCall: handleApiCall
};
