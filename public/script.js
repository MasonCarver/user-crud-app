// Fetch and display users
function fetchUsers() {
  fetch("/users")
    .then((res) => res.json())
    .then((users) => {
      const list = document.getElementById("user-list");
      list.innerHTML = ""; // Clear existing list
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} (ID: ${user.id})`;

        //Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteUser(user.id);

        li.appendChild(delBtn);
        list.appendChild(li);
      });
    });
}

// Add new user
function addUser() {
  const name = document.getElementById("name-input").value;
  if (!name) return alert("Enter a name");

  fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then(() => {
    document.getElementById("name-input").value = "";
    fetchUsers();
  });
}

// Delete user
function deleteUser(id) {
  fetch("/users/${id", {
    method: "DELETE",
  }).then(() => fetchUsers());
}

//load users on page load
window.onload = fetchUsers;
