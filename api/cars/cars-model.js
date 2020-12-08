const db = require("../../data/dbConfig");

module.exports = {
  findAll,
  findById,
  create,
};

function findAll() {
  return db("cars");
}

function findById(id) {
  return db("cars").where("id", id).first();
}

function create(car) {
  return db("cars")
    .insert(car)
    .then(([id]) => {
      return db("cars").where("id", id).first();
    });
}
