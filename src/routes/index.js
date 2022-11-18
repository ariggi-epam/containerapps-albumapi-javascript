var express = require("express");
var router = express.Router();
const orderController = require("../controllers/AlbumController");
const rolesController = require("../controllers/RolesController");

// Root/Index Routes
router.get("/api/", function (req, res, next) {
  res.json({
    message: "Call the /albums route to retrieve a list of albums",
  });
});

// get albums
router.get("/api/albums", orderController.index);
router.get("/api/getroles",rolesController.getroles)
router.get("/api/testdeploy", function (req, res, next) {
  res.json({
    message: "deploy done",
  });
});

router.get("/api/alberto", function (req, res, next) {
  res.json({
    message: "alberto  done",
  });
});



module.exports = router;
