var Albums = require("../models/Album");

exports.index = async function (req, res) {
  const albums = await Albums.getAlbums();
  console.log("Retrieved Albums");
  console.log("\n\nheaders\n\n")
    console.log(req.headers);
    console.log("\n\nheaders\n\n")
  res.json(albums);
};
