$(document).ready(function () {
  let bgImg = $(".bg-img input").val();
  $(".bg-img").css("background-image", "url(" + bgImg + ")");

  $(".carousel.carousel-slider").carousel({
    fullWidth: true,
  });

  setInterval(() => {
    $(".carousel.carousel-slider").carousel("next", 1);
  }, 4000);

  $("#homeBtn").click(() => {
    this.location.href = "/";
  });

  $("#makeReservationBtn").click(() => {
    let merchantId = $("#merchantId").val();
    this.location.href = "/merchant/" + merchantId + "/menu";
  });

    let merchant ={
        merchantId : $('#merchantId').val(),
        merchantName : $('#merchantName').val()
    };
    sessionStorage.setItem("merchant",JSON.stringify(merchant));

    console.log('ready');
});
