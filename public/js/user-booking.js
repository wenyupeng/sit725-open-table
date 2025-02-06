const Materialize = M;

$(document).ready(function() {
    if (!sessionStorage.getItem("user") && !sessionStorage.getItem("token")) {
        return window.location.href = "/user/login";
      }
    
    $('#deleteBtn').click(function(e) {
        var form = document.getElementById("deleteForm");
        var formData = new FormData(form);
    
        let deleteData = {};
        for (var [key, value] of formData.entries()) {
            deleteData[key] = value;
        }
        console.log(deleteData);

        $.ajax({
            url: `/api/booking/${deleteData.userId}/bookings/${deleteData.bookingId}/delete`,
            type: 'POST',
            data: deleteData,
            headers: {
                'Authorization': sessionStorage.getItem("token")
            },
            success: function(response) {
                console.log(response);
                Materialize.toast('Booking deleted successfully', 4000);
                window.location.href = `/booking/${deleteData.userId}/bookings`;
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                Materialize.toast('Error deleting booking', 4000);
            }
        });
    });
});