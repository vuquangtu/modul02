const employeeElement = document.querySelector("#employeesData");

const userAPI = "https://65d87debc96fbb24c1bba4d8.mockapi.io/api/v1/users";

const selectElement = document.querySelector("#sel1");
const btnFilterElement = document.querySelector("#btnFilter");

function start() {
  getUser((users) => {
    let listUsers = users;
    const femaleUsers = users.filter((user) => user.gender !== "male");

    renderUser(femaleUsers);
    hanlleEvent();
  });
}
start();

function hanlleEvent() {
  // thuc hien viec xoa user
  const deleteBtns = document.querySelectorAll("#editBtn");
  const editBtns = document.querySelectorAll("#editBtn");

  document.onclick = (e) => {
    if (e.target.id == "deleteBtn") {
      e.preventDefault();
      const id = e.target.dataset.id;
      const deleteApi = userAPI + "/" + id;
      if (confirm("Are you sure to delete this User???")) {
        fetch(deleteApi, {
          method: "DELETE",

          headers: { "content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((response) => console.log("Success:", JSON.stringify(response)))
          .catch((error) => console.error("Error:", error));

        const deleteTr = document.querySelector(`#tr-${id}`);
        deleteTr.remove();
      }
    }

    // thuc hien sua doi

    if (e.target.id == "editBtn") {
      e.preventDefault();
      let editId = e.target.dataset.id;
      localStorage.setItem("editId", editId);
      location.href = "../edit-employee.html";
    }

    // khi lua chon hiên thi

    btnFilterElement.onclick = (e) => {
      e.preventDefault();
      const output = selectElement.options[selectElement.selectedIndex].value;

      getUser((users) => {
        if (output == "age") {
          users.sort((a, b) => {
            return new Date(a.dateOfBirth) - new Date(b.dateOfBirth);
          });

          renderUser(users);
        }

        if (output == "maxAge") {
          users.sort((a, b) => {
            return new Date(a.dateOfBirth) - new Date(b.dateOfBirth);
          });

          alert(
            `Sinh viên lớn tuổi nhất là: ${
              users[0].fullname
            },\nNgày tháng năm sinh là: ${users[0].dateOfBirth.slice(0, 10)}`
          );
        }

        if (output == "itJob") {
          const itUsers = users.filter((user) => user.major == "Developer");

          renderUser(itUsers);
        }
      });
    };
  };
}

function getUser(callback) {
  fetch(userAPI)
    .then((res) => res.json())
    .then(callback);
}

// Định dạng lại chuỗi ngày tháng năm
function formatDate(dateString) {
  var date = new Date(dateString);

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

function renderUser(users) {
  let htmls = users.map((user, index) => {
    return `<tr id="tr-${user.id}">
                <td>${index + 1}</td>
                <td>${user.fullname}</td>
                <td>${formatDate(user.dateOfBirth.slice(0, 10))}</td>
                <td>${user.gender}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.major}</td>
                <td>

                  <a type="button" id="editBtn" data-id =${
                    user.id
                  } class="edit btn btn-warning mb-2">Sửa</a><br/>
                  <a type="button" id="deleteBtn" data-id =${
                    user.id
                  } class="btn btn-danger mb-2">Xóa</a>
                </td>
              </tr>`;
  });

  employeeElement.innerHTML = htmls.join("");
}
