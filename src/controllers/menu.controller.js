/* eslint-disable no-unused-vars */
const { MenuModel } = require("../models");
const log = require("../utils/auth.util");
const authenticate = require("../middlewares/jwt.middleware");
const apiResponse = require("../utils/api-response.util");
const permissions = require("../middlewares/permission.middleware");

/**
 * get menu by merchantId
 * @returns {Object} menu info
 */
const getMenuByMerchantId = async (merchantId) => {
  try {
    let options = {
      merchantId: merchantId,
      isActive: true,
    };

    let menu = await MenuModel.find(options);
    if (!menu) {
      return apiResponse.notFoundResponse("Menu not found");
    }

    let categoryMap = {};
    menu.forEach((menuItem) => {
      const categoryName = menuItem.categoryName;
      let subMenu = categoryMap[categoryName];
      if (!subMenu) {
        subMenu = [];
        categoryMap[categoryName] = subMenu;
      }
      subMenu.push(menuItem);
    });

    return categoryMap;
  } catch (err) {
    console.log(err);
    log.err(`popularMerchants error, ${JSON.stringify(err)} `);
    return [];
  }
};

/**
 * add menu
 * @returns {Object}
 */
const addMenu = [
  authenticate,
  permissions,
  async (req) => {
    let merchant = req.body;
    let merchantName = merchant.name;
    let phone = merchant.phone;
  },
];

const queryPagination = [authenticate, permissions, async (req, res) => {}];

const updateById = [authenticate, permissions, async (req, res) => {}];

const listAllMenusByMerchantId = async (req, res) => {
  try {
    const menus = await MenuModel.find({ merchantId: req.params.merchantId });
    res.json(menus);
  } catch {
    res.status(500).json({ error: "Error fetching menus" });
  }
};

const createMenu = async (req, res) => {
  try {
    const {
      merchantId,
      categoryName,
      img,
      name,
      price,
      desc,
      star,
      reviews,
      isActive,
    } = req.body;

    const newMenu = new MenuModel({
      merchantId,
      categoryName,
      img: img || "/image/default-dish.png",
      name,
      price,
      desc,
      star: star || 0, // Default star rating
      reviews: reviews || "0",
      isActive: isActive !== undefined ? isActive : true,
    });

    await newMenu.save();
    res.json({ message: "Menu item created successfully!", menu: newMenu });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating menu item" });
  }
};

const editMenu = async (req, res) => {
  try {
    const updatedMenu = await MenuModel.findByIdAndUpdate(
      req.params.menuId,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedMenu)
      return res.status(404).json({ error: "Menu item not found" });

    res.json({ message: "Menu item updated successfully!", menu: updatedMenu });
  } catch {
    res.status(500).json({ error: "Error updating menu item" });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await MenuModel.findByIdAndDelete(req.params.menuId);
    if (!deletedMenu)
      return res.status(404).json({ error: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting menu item" });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await MenuModel.findById(req.params.menuId);
    if (!menu) return res.status(404).json({ error: "Menu item not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu item" });
  }
};

module.exports = {
  getMenuByMerchantId,
  addMenu,
  queryPagination,
  updateById,
  listAllMenusByMerchantId,
  createMenu,
  editMenu,
  deleteMenu,
  getMenuById,
};
