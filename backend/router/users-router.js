var express = require("express");
var router = express.Router();
var users = require("../database/database");

//Obtener todos los usuarios
router.get("/", (req, res) => {
  res.send(users);
  res.end();
});

//Obtener un solo usuario
router.get("/:id", (req, res) => {
  let selectedId = parseInt(req.params.id);

  let selectedUser = users.find((item) => {
    return item.id === selectedId;
  });

  res.send(selectedUser);
  res.end();
});

//Crear un Usuario
router.post("/", (req, res) => {
  let newUser = {
    id: parseInt(req.body.id),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    website: req.body.website,
  };

  users.push(newUser);

  console.log("El nuevo usuario es: ", newUser);

  res.json({
    status: "Ok",
    msj: "Se creo el usuario!",
  });
  res.end();
});

//Actualizar un usuario
router.put("/:id", (req, res) => {
  let selectedId = parseInt(req.params.id);

  let updatedUser = {
    id: parseInt(req.params.id),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    website: req.body.website,
  };

  users = users.filter((item) => item.id !== selectedId);

  console.log("El usuario actualizado es: ", updatedUser);

  users.push(updatedUser);

  res.json({
    status: "Ok",
    msj: "Se actualizo el usuario!",
  });
  res.end();
});

//Eliminar un usuario
router.delete("/:id", (req, res) => {
  let selectedId = parseInt(req.params.id);

  users = users.filter((item) => item.id !== selectedId);

  res.json({
    status: "Ok",
    msj: "Se eliminó el usuario!",
  });
  res.end();
});

module.exports = router;
