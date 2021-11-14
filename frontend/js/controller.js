let usuarioSeleccionado;

//Funcion para limpiar el formulario
const cleanForm = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("apodo").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("website").value = "";
};

//Bing one user
const callUser = async (id) => {
  const api = await fetch(`http://localhost:8888/users/${id}`);

  const usuario = await api.json();

  return usuario;
};

//Bring all users:
const callUsers = async () => {
  document.getElementById("users-table").innerHTML = "";

  const api = await fetch("http://localhost:8888/users");

  const usuarios = await api.json();

  for (let i = 0; i < usuarios.length; i++) {
    document.getElementById("users-table").innerHTML += `
    <tr onClick="setFields(${usuarios[i].id})">
      <th>${usuarios[i].id}</th>
      <td>${usuarios[i].name}</td>
      <td>${usuarios[i].username}</td>
      <td>${usuarios[i].email}</td>
      <td>${usuarios[i].address}</td>
      <td>${usuarios[i].phone}</td>
      <td>${usuarios[i].website}</td>
    </tr>
    `;
  }
};

//Set fields to update user
const setFields = async (idUser) => {
  let user = await callUser(idUser);

  usuarioSeleccionado = user;

  document.getElementById("nombre").value = user.name;
  document.getElementById("apodo").value = user.username;
  document.getElementById("correo").value = user.email;
  document.getElementById("direccion").value = user.address;
  document.getElementById("telefono").value = user.phone;
  document.getElementById("website").value = user.website;
};

//Create a user
const createUser = async () => {
  const newUser = {
    id: parseInt(Math.random() * (100 - 10) + 10),
    name: document.getElementById("nombre").value,
    username: document.getElementById("apodo").value,
    email: document.getElementById("correo").value,
    address: document.getElementById("direccion").value,
    phone: document.getElementById("telefono").value,
    website: document.getElementById("website").value,
  };

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const respuesta = await fetch(`http://localhost:8888/users`, fetchOptions);

  callUsers();

  cleanForm();

  console.log("El nuevo usuario es: ", newUser);
  console.log(await respuesta.json());
};

//Update the user
const updateUser = async () => {
  let updatedUser = {
    id: usuarioSeleccionado.id,
    name: document.getElementById("nombre").value,
    username: document.getElementById("apodo").value,
    email: document.getElementById("correo").value,
    address: document.getElementById("direccion").value,
    phone: document.getElementById("telefono").value,
    website: document.getElementById("website").value,
  };

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  };

  const respuesta = await fetch(
    `http://localhost:8888/users/${usuarioSeleccionado.id}`,
    fetchOptions
  );

  callUsers();

  cleanForm();

  console.log("El usuario actualizado es: ", updatedUser);
  console.log(await respuesta.json());
};

//Delete the user
const deleteUser = async () => {
  const fetchOptions = {
    method: "DELETE",
  };

  const respuesta = await fetch(
    `http://localhost:8888/users/${usuarioSeleccionado.id}`,
    fetchOptions
  );

  console.log(await respuesta.json());

  callUsers();

  cleanForm();
};
