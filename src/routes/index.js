var express = require("express");
var router = express.Router();
const orderController = require("../controllers/AlbumController");

// Root/Index Routes
router.get("/api/", function (req, res, next) {
  res.json({
    message: "Call the /albums route to retrieve a list of albums",
  });
});

// get albums
router.get("/api/albums", orderController.index);

module.exports = router;
