const fullNameElement = document.querySelector("#fullName");
const dateOfBirthElement = document.querySelector("#dateOfBirth");
const phoneElement = document.querySelector("#phone");
const emailElement = document.querySelector("#email");
const positionElement = document.querySelector("#position");
const genderElement = document.querySelector("#gender");
const selectElement = document.querySelector("#sel1");

const createNewAccountBtn = document.querySelector("#createNewAccountBtn");

const userAPI = "https://65d87debc96fbb24c1bba4d8.mockapi.io/api/v1/users";

const newEmployee = {};
const editUserId = localStorage.editId;

function start() {
  getUser((users) => {
    const editUser = users.filter((user) => user.id === editUserId)[0];
    fullNameElement.value = editUser.fullname;
    phoneElement.value = editUser.phone;
    emailElement.value = editUser.email;
    positionElement.value = editUser.major;

    dateOfBirthElement.value = editUser.dateOfBirth.slice(0, 10);
  });

  handleCreate();
}

start();

function getUserEdit() {}

function handleCreate(userAPI) {
  createNewAccountBtn.onclick = (e) => {
    e.preventDefault();
    const output = selectElement.options[selectElement.selectedIndex].value;
 

    newEmployee.fullname = fullNameElement.value;
    newEmployee.dateOfBirth = dateOfBirthElement.value;
    newEmployee.phone = phoneElement.value;
    newEmployee.email = emailElement.value;
    newEmployee.major = positionElement.value;
    newEmployee.gender = output;

    newEmployee.id = editUserId;

    console.log(newEmployee);

    // them data

    fetch(
      `https://65d87debc96fbb24c1bba4d8.mockapi.io/api/v1/users/${editUserId}`,
      {
        method: "PUT",
        body: JSON.stringify(newEmployee),
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("Success:", JSON.stringify(response));
        location.href = "../index.html";
      })
      .catch((error) => console.error("Error:", error));
  };
}

function getUser(callbak) {
  fetch(userAPI)
    .then((res) => res.json())
    .then(callbak);
}
