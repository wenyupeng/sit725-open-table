$(document).ready(() => {
  $(".sidenav").sidenav();

  $("#searchBtn").click(() => {
    let searchText = $("#search").val();
    
    if (searchText.trim() === "") {
      return;
    }

    $.ajax({
      url: "/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ searchText: searchText }),
      success: (response) => {
        console.log(response);
      },
      error: (xhr, status, error) => {
        console.error(error);
      }
    });
  });
});
