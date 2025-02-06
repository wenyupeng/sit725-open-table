$(document).ready(() => {
  $(".sidenav").sidenav();

  $("#searchBtn").click(() => {
    let searchText = $("#search").val();

    $.ajax({
      url: "/api/merchant",
      type: "GET",
      data: { query: searchText },
      success: (response) => {
        let res = JSON.parse(response);
        if (res.status === 1) {
          renderMerchantDetails(res.data.merchants);
          renderPagination(
            parseInt(res.data.pageNo),
            parseInt(res.data.totalPages),
          );
        } else {
          M.toast({ html: res.message, classes: "rounded" });
        }
      },
      error: (xhr, status, error) => {
        console.error(error);
      },
    });
  });
});

function renderMerchantDetails(data) {
  let topSixMerEL = document.getElementById("top-six-mer");
  if (data.length < 1) {
    topSixMerEL.innerHTML =
      "<h5 style='text-align:center'>No results found</h5>";
  } else {
    let content = ``;

    data.forEach((merchant) => {
      let description =
        merchant.description && merchant.description.split(" ").length > 7
          ? merchant.description.split(" ").slice(0, 7).join(" ") + " ..."
          : merchant.description || "No description available";
      let cardEL =
        `
        <div class="col s12 m4">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <a href="/merchant/` +
        merchant._id +
        `">
                <img src='` +
        merchant.backgroundImg +
        `'>
                </a>
              </div>
              <div class="card-content">
                <span class="card-title"><strong>
                    ` +
        merchant.name +
        `
                  </strong></span>
                <p>
                ` +
        description +
        `
                </p>
                <div>
                  <div class="stars">
                  `;
      for (let i = 0; i < merchant.star; i++) {
        if (i + 1 > merchant.star) {
          if (merchant.star % 1 !== 0) {
            cardEL += `<i class="fas fa-star-half-alt"></i>`;
          }
        } else {
          cardEL += `<i class="fas fa-star"></i>`;
        }
      }

      cardEL +=
        `
                  </div>
                  <span>( ` +
        merchant.reviews +
        ` reviews)</span>
                </div>
              </div>
            </div>
          </div>
      `;
      content += cardEL;
    });

    topSixMerEL.innerHTML = content;
  }
}

function renderPagination(pageNo, totalPages) {
  let paginationEL = document.getElementById("merchant-pagination");
  if (totalPages < 1) {
    paginationEL.innerHTML = "";
    return;
  }
  let contentEL = ``;
  if (pageNo > 1) {
    contentEL +=
      `<li class="waves-effect"><a href="#!" onclick="toPage('` +
      (parseInt(pageNo) - 1) +
      `')">`;
  } else {
    contentEL += `<li class="disabled"><a href="#!">`;
  }
  contentEL += `<i class="material-icons">chevron_left</i></a></li>`;

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      if (i === parseInt(pageNo)) {
        contentEL += `<li class="active"><a href="#!">` + i + `</a></li>`;
      } else {
        contentEL +=
          `<li class="waves-effect"><a href="#!" onclick="toPage('` +
          i +
          `')">` +
          i +
          `</a></li>`;
      }
    }
  } else {
    if (pageNo <= 3) {
      for (let i = 1; i <= 5; i++) {
        if (i === pageNo) {
          contentEL += `<li class="active"><a href="#!">` + i + `</a></li>`;
        } else {
          contentEL +=
            `<li class="waves-effect"><a href="#!" onclick="toPage('` +
            i +
            `')">` +
            i +
            `</a></li>`;
        }
      }
    } else if (pageNo >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i === pageNo) {
          contentEL += `<li class="active"><a href="#!">` + i + `</a></li>`;
        } else {
          contentEL +=
            `<li class="waves-effect"><a href="#!" onclick="toPage('` +
            i +
            `')">` +
            i +
            `</a></li>`;
        }
      }
    } else {
      for (let i = pageNo - 2; i <= pageNo + 2; i++) {
        if (i === pageNo) {
          contentEL += `<li class="active"><a href="#!">` + i + `</a></li>`;
        } else {
          contentEL +=
            `<li class="waves-effect"><a href="#!" onclick="toPage('` +
            i +
            `')">` +
            i +
            `</a></li>`;
        }
      }
    }
  }

  if (pageNo < totalPages) {
    contentEL +=
      `<li class="waves-effect"><a href="#!" onclick="toPage('` +
      (parseInt(pageNo) + 1) +
      `')">`;
  } else {
    contentEL += `<li class="disabled"><a href="#!">`;
  }
  contentEL += `<i class="material-icons">chevron_right</i></a></li>`;

  paginationEL.innerHTML = contentEL;
}

// eslint-disable-next-line no-unused-vars
function toPage(page) {
  $.ajax({
    url: "/api/merchant",
    type: "GET",
    data: { pageNo: page },
    success: (response) => {
      let res = JSON.parse(response);
      if (res.status === 1) {
        renderMerchantDetails(res.data.merchants);

        console.log(res.data);
        renderPagination(res.data.pageNo, res.data.totalPages);
      } else {
        M.toast({ html: res.message, classes: "rounded" });
      }
    },
    error: (xhr, status, error) => {
      console.error(error);
    },
  });
}
