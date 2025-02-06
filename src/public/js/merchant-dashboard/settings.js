function getMerchantData() {
  const elem = document.getElementById("merchant-data");
  const merchant = elem.getAttribute("value");
  return merchant ? JSON.parse(merchant) : null;
}

$(document).ready(function () {
  // eslint-disable-next-line no-undef
  const user = getUserSession();
  const merchant = getMerchantData();

  merchant?.openHours?.forEach((oh) => {
    $("#openHoursList").append(
      `<li class="collection-item">
                <strong>${oh.day}</strong> - ${oh.time} (${oh.availableSlots} slots)
                <button class="btn-small red removeHour right">X</button>
            </li>`,
    );
  });

  $("#merchantName").val(merchant.name);
  $("#merchantCategory").val(merchant.category);
  $("#merchantPhone").val(merchant.contactPhone);
  M.updateTextFields();

  console.log("merrr ", merchant);

  // Initialize Materialize select dropdown properly
  $("select").formSelect();

  // Ensure dropdown opens properly
  $("#daySelect").click(function () {
    M.FormSelect.init(document.querySelectorAll("select"));
  });

  // Open Hours array
  let openHours = [];

  // Add Open Hour Entry
  $("#addOpenHour").click(function () {
    let day = $("#daySelect").val();
    let time = $("#timeInput").val();
    let slots = $("#slotInput").val();

    if (!day || !time || !slots) {
      M.toast({ html: "Please fill all fields!", classes: "red" });
      return;
    }

    // Add to array
    openHours.push({ day, time, availableSlots: parseInt(slots) });

    // Update UI
    $("#openHoursList").append(
      `<li class="collection-item">
                <strong>${day}</strong> - ${time} (${slots} slots)
                <button class="btn-small red removeHour right">X</button>
            </li>`,
    );

    // Clear input fields
    $("#timeInput").val("");
    $("#slotInput").val("");
    $("#daySelect").val(""); // Reset dropdown
    M.FormSelect.init(document.querySelectorAll("select")); // Reinitialize Materialize select
  });

  // Remove Open Hour Entry
  $(document).on("click", ".removeHour", function () {
    let index = $(this).parent().index();
    openHours.splice(index, 1);
    $(this).parent().remove();
  });

  // Save Open Hours (Send Data to Server)
  $("#saveOpenHours").click(function () {
    $.ajax({
      url: "/api/merchant/update-open-hours",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ openHours, merchantId: user?.merchant?._id }),
      success: function () {
        M.toast({ html: "Open hours updated!", classes: "green" });
      },
      error: function () {
        M.toast({ html: "Error saving open hours!", classes: "red" });
      },
    });
  });

  // Save Merchant Details
  $("#merchantForm").submit(function (e) {
    e.preventDefault();
    let merchantData = {
      name: $("#merchantName").val(),
      category: $("#merchantCategory").val(),
      contactPhone: $("#merchantPhone").val(),
    };

    $.ajax({
      url: "/update-merchant",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(merchantData),
      success: function () {
        M.toast({ html: "Merchant details saved!", classes: "green" });
      },
      error: function () {
        M.toast({ html: "Error saving merchant details!", classes: "red" });
      },
    });
  });
});
