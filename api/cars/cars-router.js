const express = require("express");
const Car = require("./cars-model");

const router = express.Router();

const validateCarId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const checkedCar = await Car.findById(id);

    if (!checkedCar) {
      res.status(404).json({ message: "a car with this id does not exist" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validateCar = (req, res, next) => {
  if (!req.body.vin && !req.body.make && !req.body.model && !req.body.mileage) {
    res.status(400).json({ message: "missing car data" });
  } else if (
    !req.body.vin ||
    !req.body.make ||
    !req.body.model ||
    !req.body.mileage
  ) {
    res
      .status(400)
      .json({ message: "vin, make, model, and mileage are required" });
  } else {
    next();
  }
};

router.get("/", async (_, res) => {
  try {
    const data = await Car.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", validateCar, async (req, res) => {
  try {
    const car = req.body;
    const newCar = await Car.create(car);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", validateCarId, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Car.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
