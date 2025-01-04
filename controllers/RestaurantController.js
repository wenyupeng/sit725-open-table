const { body, validationResult } = require("express-validator");
const apiResponse = require("../utils/utils.apiResponse");
const log = require("../utils/utils.logger");

const { ObjectId } = require("mongodb");
const Restaurant = require("../models/mapping/RestaurantAumModel");

/**
 * Handle restaurant creation
 * @param {string}  restaurantName restaurantName
 * @param {string}  email  email
 * @param {string}  phone  phone
 * @param {string}  address address
 * @param {string}  description description
 * @param {string}  restaurantImageUrl restaurantImageUrl
 * @param {string}  workingHours workingHours
 * @param {Object}  menu menu
 * @returns {Object} common response
 */

// Create New Restaurant
exports.handleCreateRestaurant = [
  [
    body("restaurantName")
      .notEmpty()
      .withMessage("Restaurant Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("email could not be empty")
      .isEmail()
      .normalizeEmail()
      .withMessage("email format is wrong"),
    body("phone")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("./restaurant/restaurant-form", {
          pageTitle: "Add Restaurant",
          message: errors.array(),
        });
      } else {
        const newRestaurant = {
          restaurantName: req.body.restaurantName,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.phone,
          description: req.body.phone,
          workingHours: req.body.workingHours,
          restaurantImageUrl: req.body.restaurantImageUrl,
          isActive: true,
          menu: req.body.menu || [],
          dateCreated: new Date(),
          dateModified: new Date(),
        };
        await Restaurant.createRestaurant(newRestaurant);
        console.log("newRestaurant", newRestaurant);
        res.redirect("/api/restaurants");
      }
    } catch (err) {
      res.status(500).render("./restaurant/restaurant-form", {
        pageTitle: "Add Restaurant",
        message: err.message,
      });
    }
  },
];

// Render create a restaurant
exports.renderCreateRestaurant = [
  (req, res) => {
    res.render("./restaurant/restaurant-form", {
      pageTitle: "Restaurant",
      message: null,
    });
  },
];

// Render list of all active restaurant
exports.renderRestaurants = [
  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    try {
      const { restaurants, total } = await Restaurant.findAll(page, limit);

      const totalPages = Math.ceil(total / limit);

      res.render("./restaurant/restaurants", {
        pageTitle: "Restaurants",
        restaurants,
        currentPage: page,
        totalPages,
        total,
        limit,
      });
    } catch (err) {
      res.status(500).render("./restaurant/restaurants", {
        pageTitle: "Restaurants",
        message: err.message,
      });
    }
  },
];

// Render a specific restaurant's details and active menus
exports.renderRestaurantDetails = [
  async (req, res) => {
    const {restaurantId}  = req.params; 

    console.log("restaurantId:", restaurantId);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);

    const restaurant = await Restaurant.getRestaurantById(restaurantId);

    if (!restaurant) {
      return res
        .status(404)
        .render("404", { pageTitle: "Restaurant Not Found" });
    }

    // Filter only active menu items
    const activeMenu = restaurant.menu.filter((item) => item.isActive);
    res.render("./restaurant/restaurant_details", {
      pageTitle: restaurant.restaurantName,
      restaurant,
      activeMenu,
    });
  },
];

// Add a menu item to a restaurant
exports.handleAddMenuItem = [
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").notEmpty().withMessage("Unit Price is required"),
    body("menuImageUrl").notEmpty().withMessage("Menu Image Url is required"),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("./restaurant/restaurant_details", {
          pageTitle: "Add Restaurant Menu Items",
          message: errors.array(),
        });
      } else {
        const { restaurantId } = req.params;

        const menuItem = {
          name: req.body.name,
          description: req.body.description,
          menuImageUrl: req.body.menuImageUrl,
          price: parseFloat(req.body.price),
          isActive: true,
          dateCreated: new Date(),
          dateModified: new Date(),
        };

        await Restaurant.addMenuItem(restaurantId, menuItem);
        res.redirect(`/api/restaurants/${restaurantId}`);
      }
    } catch (err) {
      res.status(500).render("./restaurant/restaurant_details", {
        pageTitle: "Add Restaurant",
        message: err.message,
      });
    }
  },
];

// Render a restaurant menu Item details
exports.renderRestaurantMenuItem = [
  async (req, res) => {
    try {
      const { restaurantId, menuItemId } = req.params;

      const restaurant = await Restaurant.getRestaurantById(restaurantId);

      if (!restaurant) {
        return res
          .status(404)
          .render("404", { pageTitle: "Restaurant Not Found" });
      }

      const menuItem = await Restaurant.getMenuItemById(
        restaurantId,
        menuItemId
      );

      console.log("menuItemId:", menuItemId);
      console.log("menuItem:", menuItem);

      if (!menuItem) {
        return res
          .status(404)
          .render("404", { pageTitle: "Menu Item Not Found" });
      }

      res.render("./restaurant/restaurant_menuItem", {
        pageTitle: "Edit Menu Item",
        restaurant,
        menuItem,
      });
    } catch (err) {
      res.status(500).render("./restaurant/restaurant_menuItem", {
        pageTitle: "Edit Menu Item",
        message: err.message,
      });
    }
  },
];

// Update a a restaurant menu Item
exports.handleUpdateMenuItem = [
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").notEmpty().withMessage("Unit Price is required"),
    body("menuImageUrl").notEmpty().withMessage("Menu Image Url is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log("errors:", errors.array());
      if (!errors.isEmpty()) {
        return res.render("./restaurant/restaurant_menuItem", {
          pageTitle: "Update Restaurant Menu Item",
          message: errors.array(),
        });
      } else {
        const { restaurantId, menuItemId } = req.params;

        const menuItem = {
          name: req.body.name,
          description: req.body.description,
          menuImageUrl: req.body.menuImageUrl,
          price: parseFloat(req.body.price),
        };

        await Restaurant.updateMenuItem(restaurantId, menuItemId, menuItem);
        res.redirect(`/api/restaurants/${restaurantId}`);
      }
    } catch (err) {
      res.status(500).render("./restaurant/restaurant_menuItem", {
        pageTitle: "Update Restaurant Menu Item",
        message: err.message,
      });
    }
  },
];

// Disable a restaurant menu Item
exports.handleDisableMenuItem = [
 
  async (req, res) => {
    try {     
        const { restaurantId, menuItemId } = req.params;
        
        await Restaurant.disableMenuItem(restaurantId, menuItemId);

        res.redirect(`/api/restaurants/${restaurantId}`);
      
    } catch (err) {
      res.status(500).render("./restaurant/restaurant_details", {
        pageTitle: "Delete/disable Restaurant Menu Item",
        message: err.message,
      });
    }
  }];
