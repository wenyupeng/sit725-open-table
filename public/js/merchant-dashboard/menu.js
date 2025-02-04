// eslint-disable-next-line no-undef
const _M = M;

$(document).ready(function () {
    // eslint-disable-next-line no-undef
    const user = getUserSession();
    let merchantId = user.merchant?._id;
    let selectedImageUrl = ""; // Store uploaded image URL

    // Load menu list
    function loadMenus() {
        $.get(`/api/menu/md/menus/${merchantId}`, function (menus) {
            $("#menuList").html(""); // Clear previous list
            const theMenus = JSON.parse(menus);
            theMenus.forEach(menu => {
                $("#menuList").append(`
                    <li class="collection-item" style="display: flex; flex-direction: row;">
                        <img src="${menu.img}" class="menu-img" style="width: 100px;">
                        <div>
                            <strong>${menu.name}</strong> - $${menu.price}
                            <br>${menu.desc}
                        </div>
                        <div style="margin-left: auto;">
                            <button class="btn-small blue editMenu" data-id="${menu._id}">Edit</button>
                            <button class="btn-small red deleteMenu" data-id="${menu._id}">Delete</button>
                        </div>
                    </li>
                `);
            });
        });
    }

    loadMenus(); // Initial fetch

    // Image Upload
    $("#menuImage").change(function (event) {
        let file = event.target.files[0];
        let formData = new FormData();
        formData.append("file", file);

        $.ajax({
            url: "/api/upload",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                selectedImageUrl = response.imageUrl; // Store MinIO URL
                $("#previewImage").attr("src", selectedImageUrl).show();
            },
            error: function () {
                _M.toast({ html: "Error uploading image!", classes: "red" });
            }
        });
    });

    // Save (Add/Edit) Menu
    $("#menuForm").submit(function (e) {
        e.preventDefault();
        let menuData = {
            merchantId: merchantId,
            name: $("#menuName").val(),
            categoryName: $("#menuCategory").val(),
            price: $("#menuPrice").val(),
            desc: $("#menuDesc").val(),
            img: selectedImageUrl || "" // Use uploaded image
        };

        let menuId = $("#menuId").val();
        let method = menuId ? "PUT" : "POST";
        let url = menuId ? `/api/menu/md/menus/${menuId}` : "/api/menu/md/menus";

        $.ajax({
            url: url,
            type: method,
            contentType: "application/json",
            data: JSON.stringify(menuData),
            success: function () {
                _M.toast({ html: "Menu saved successfully!", classes: "green" });
                loadMenus();
                $("#menuForm")[0].reset();
                $("#menuId").val("");
                $("#previewImage").hide();
            }
        });
    });

    // Edit Menu
    $(document).on("click", ".editMenu", function () {
        let menuId = $(this).data("id");
        $.get(`/api/menu/md/menus/item/${menuId}`, function (_menu) {
            const menu = JSON.parse(_menu)
            console.log('WILL UPDATE', menu)
            $("#menuId").val(menu._id);
            $("#menuName").val(menu.name);
            $("#menuCategory").val(menu.categoryName);
            $("#menuPrice").val(menu.price);
            $("#menuDesc").val(menu.desc);
            selectedImageUrl = menu.img;
            $("#previewImage").attr("src", menu.img).show();
            _M.updateTextFields();
        });
    });

    // Delete Menu
    $(document).on("click", ".deleteMenu", function () {
        let menuId = $(this).data("id");
        $.ajax({
            url: `/api/menu/md/menus/${menuId}`,
            type: "DELETE",
            success: function () {
                _M.toast({ html: "Menu deleted!", classes: "red" });
                loadMenus();
            }
        });
    });
});
