let currentPage = 1;
const pageSize = 20;

const loadUsers = (page) => {
  $.ajax({
    url: `/api/users/list`,
    type: "GET",
    data: { current: page, pageSize },
    success: (response) => {
      if (response.status === 1) {
        const { result, total } = response.data;
        const userTableBody = $("#userTableBody");
        userTableBody.empty();

        if (result.length === 0) {
          userTableBody.append('<tr><td colspan="4">No users found</td></tr>');
        } else {
          result.forEach((user) => {
            userTableBody.append(`
              <tr>
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                  <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
              </tr>
            `);
          });
        }

        // Update pagination
        $("#currentPage").text(page);
        $("#prevPage").prop("disabled", page === 1);
        $("#nextPage").prop("disabled", page * pageSize >= total);
      } else {
        alert("Failed to load users: " + response.message);
      }
    },
    error: (xhr) => {
      console.error("Error loading users:", xhr.responseText);
      alert("Error loading users. Please try again.");
    },
  });
};

// eslint-disable-next-line no-unused-vars
const deleteUser = (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  $.ajax({
    url: "/api/users/delete",
    type: "DELETE",
    contentType: "application/json",
    data: JSON.stringify({ id }),
    success: (response) => {
      if (response.status === 1) {
        alert(response.message);
        loadUsers(currentPage); // Reload the user list
      } else {
        alert("Failed to delete user: " + response.message);
      }
    },
    error: (xhr) => {
      console.error("Error deleting user:", xhr.responseText);
      alert("Error deleting user. Please try again.");
    },
  });
};

$(document).ready(() => {
  loadUsers(currentPage);

  $("#prevPage").click(() => {
    if (currentPage > 1) {
      currentPage -= 1;
      loadUsers(currentPage);
    }
  });

  $("#nextPage").click(() => {
    currentPage += 1;
    loadUsers(currentPage);
  });
});
