/* eslint-disable no-unused-vars */
function addToOrder(cardStr) {
  console.log('>>> ADD TO ORDER >>>', cardStr)
  let card = JSON.parse(cardStr);
  let foodId = card._id;
  let count = sessionStorage.getItem(foodId);
  if (Object.is(count, null) || Object.is(count, undefined)) {
    return;
  }

  let order = sessionStorage.getItem("food_order");
  if (Object.is(order, null) || Object.is(order, undefined)) {
    order = new Map();
  } else {
    order = new Map(JSON.parse(order));
  }

  let detail = order.get(foodId);
  if (detail == "undefined" || !detail) {
    detail = {
      name: card.name,
      img: card.img,
      count: count,
    };
  } else {
    detail.count = parseInt(count);
  }

  order.set(foodId, detail);

  sessionStorage.setItem("food_order", JSON.stringify(Array.from(order)));
  sessionStorage.removeItem(foodId);

  let sum = Array.from(order.values()).reduce(
    (sum, value) => parseInt(sum) + parseInt(value.count),
    0,
  );
  $("#orderCount").text(sum);
}

function ModifyCount(num, e, foodId) {
  const element = Array.from(e.parentNode.childNodes).find((node) => {
    return node.nodeType === 1;
  });

  let spanE = element.nextSibling.nextSibling;

  let originalVal = sessionStorage.getItem(foodId);
  if (originalVal == "undefined" || !originalVal) {
    originalVal = 0;
  }

  let order = sessionStorage.getItem("food_order");
  if (
    originalVal == 0 &&
    !Object.is(order, null) &&
    !Object.is(order, undefined)
  ) {
    order = new Map(JSON.parse(order));
    let detail = order.get(foodId);
    if (detail !== "undefined" && detail) {
      originalVal = detail.count;
    }
  }

  let val = parseInt(originalVal) + parseInt(num);
  if (val < 0) {
    val = 0;
  }
  spanE.innerText = val;
  sessionStorage.setItem(foodId, val);
}

$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".tabs").tabs();

  let merchantStr = sessionStorage.getItem("merchant");
  let merchant;
  if (merchantStr) {
    merchant = JSON.parse(merchantStr);
    $("#merchantName").text(merchant.merchantName);
    $("#merchantName").click(() => {
      window.location.href = `/merchant/${merchant.merchantId}`;
    });
  }

  $("#makeReservationBtn").click(() => {
    let token = sessionStorage.getItem("token");
    let nextPage = `/booking/${merchant.merchantId}`;
    sessionStorage.setItem("nextPage", nextPage);

    $.ajax({
      url: `/api/users/status`,
      type: "GET",
      headers: {
        Authorization: token,
      },
      success: (data) => {
        console.log("data", data);
        if (JSON.parse(data).status === 1) {
          window.location.href = nextPage;
        }

      },
      error: (err) => {
        console.log("error", err);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        window.location.href = `/user/login`;
      },
    });
  });

  console.log("ready");
});
