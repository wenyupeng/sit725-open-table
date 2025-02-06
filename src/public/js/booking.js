$(document).ready(function () {
  $(".datepicker").datepicker({
    format: "yyyy-mm-dd",
    minDate: new Date(),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  });

  $("select").formSelect();
  $("textarea#specialRequests").characterCounter();

  // Quantity Buttons
  const quantities = {};
  $(".quantity-btn").click(function () {
    const id = $(this).data("id");
    const price = parseFloat($(this).data("price"));
    const menuName = $(this).data("name");
    const menuImg = $(this).data("img");

    if (!quantities[id]) {
      quantities[id] = { quantity: 0, price, name: menuName, img: menuImg };
    }

    quantities[id].quantity += $(this).hasClass("increase") ? 1 : -1;
    if (quantities[id].quantity < 0) quantities[id].quantity = 0;

    $(`#quantity-${id}`).text(quantities[id].quantity);

    const menuItems = Object.keys(quantities)
      .map((key) => ({
        id: key,
        quantity: quantities[key].quantity,
        price: quantities[key].price,
        name: quantities[key].name,
        img: quantities[key].img,
      }))
      .filter((item) => item.quantity > 0);

    const subtotal = menuItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    $("#subTotal").text(subtotal.toFixed(2));
    $("#subTotal2").text(subtotal.toFixed(2));
    $("#serviceFee").text((subtotal * 0.1).toFixed(2));
    $("#totalPriceWithGST").text((subtotal * 1.1).toFixed(2));
    $("#menuItemsInput").val(JSON.stringify(menuItems));
  });
});
