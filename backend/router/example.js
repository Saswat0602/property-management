const express = require("express");
const mongoose = require("mongoose");
const Property = require("../models/property");
require("dotenv").config();
const { storage ,cloudinary} = require("../cloudinary/index");

const multer = require("multer");
const upload = multer({ storage });

const { verifyAuth, verifyAuthorization } = require("../middleware/verify");
const router = express.Router();


const {
  addProperty,
  showProperties,
  editProperty,
  deleteProperty,
  getSingleProperty
} = require("../controllers/propertyController");

router.post("/property/addproperty", verifyAuth, upload.array("picture"), addProperty);
router.get("/property/showproperty", showProperties);
router.post("/property/edit/:propertyId", verifyAuth, verifyAuthorization, upload.single("picture"), editProperty);
router.delete("/property/delete/:propertyId", verifyAuth, verifyAuthorization, deleteProperty);
router.get("/property/:propertyId", getSingleProperty);

module.exports = router;
