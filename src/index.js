import { getUsers, deleteUser } from "./api/userApi";

getUsers().then(result => {
  const bodyhtml = result.reduce((body, user) => {
    return (body +=
    `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>
    `);
  }, "");

  setHtml("users", bodyhtml);

  //const deleteLinks = global.document.getElementsByClassName("deleteUser");
  const deleteLinks = global.document.getElementsByClassName("deleteUser");

  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});

function setHtml(id, html) {
  global.document.getElementById(id).innerHTML = html;
}
