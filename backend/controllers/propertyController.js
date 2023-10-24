const mongoose = require("mongoose");
const Property = require("../models/property");
const { storage, cloudinary } = require("../cloudinary/index");

const multer = require("multer");
const upload = multer({ storage });

const addProperty = async (req, res) => {
  const { name, description, location, type, price, amenities } = req.body;
  console.log(req.body);
  if (
    !name ||
    !description ||
    !location ||
    !price ||
    !type ||
    !amenities ||
    !req.file
  ) {
    return res
      .status(403)
      .json({ error: "Please fill up all fields and upload a single picture" });
  }

  const check = await Property.findOne({ name: name });
  if (check) {
    return res.status(401).json({ msg: "Property already exists" });
  }

  try {
    const newProperty = new Property({
      name,
      description,
      location,
      picture: { url: req.file.path, filename: req.file.filename }, 
      price,
      author: req.user._id,
      type,
      amenities,
    });

    await newProperty.save();
    res.status(200).json({ msg: "Property added successfully" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};


const showProperties = async (req, res) => {
  try {
    const { q, price, location, type } = req.query;

    const filter = {};

    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filter.price = { $gt: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }
    if (location) {
      filter.location = location;
    }
    if (type) {
      filter.type = type;
    }

    if (q) {
      const searchRegex = new RegExp(q, "i"); 
      filter.$or = [
        { name: searchRegex },
        { type: searchRegex },
        { location: searchRegex },
      
        
      ];
    }

    const filteredProperties = await Property.find(filter);

    if (filteredProperties.length === 0) {
      return res.status(404).json({ error: "No properties found" });
    }

    res.status(200).json(filteredProperties);
  } catch (error) {
    console.error("Error retrieving filtered properties:", error);
    res.status(500).json({
      error: "An error occurred while retrieving filtered properties",
    });
  }
};


const editProperty = async (req, res) => {
  const { name, description, location, price ,type,amenities } = req.body;
  const propertyId = req.params.propertyId;

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (req.file) {
      if (property.picture && property.picture.filename) {
        await Property.findByIdAndUpdate(propertyId, {
          $unset: { picture: 1 },
        });
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      property.picture = {
        url: result.secure_url,
        filename: result.public_id,
      };
    }

    property.name = name;
    property.description = description;
    property.location = location;
    property.price = price;
    property.type = type;
    property.amenities = amenities;

    await property.save();

    res.status(200).json({ msg: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the property" });
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  console.log(`propertyId ${propertyId}`);

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ msg: "Property deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the property" });
  }
};

const getSingleProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error retrieving property:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the property" });
  }
};

module.exports = {
  addProperty,
  showProperties,
  editProperty,
  deleteProperty,
  getSingleProperty,
};
