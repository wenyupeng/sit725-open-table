const express = require('express');
const router = express.Router();
const RestaurantController = require('../../controllers/RestaurantController');

 // Restaurant routes
router.get("/restaurant", RestaurantController.renderCreateRestaurant);
router.get("/restaurants", RestaurantController.renderRestaurants);
router.get("/:restaurantId", RestaurantController.renderRestaurantDetails);

router.post('/restaurant', RestaurantController.handleCreateRestaurant);

// Menu routes
router.get('/:restaurantId/menu/:menuItemId/edit', RestaurantController.renderRestaurantMenuItem);

router.post("/:restaurantId/menu", RestaurantController.handleAddMenuItem);
router.post("/:restaurantId/menu/:menuItemId", RestaurantController.handleUpdateMenuItem);
router.post('/:restaurantId/menu/:menuItemId/disable', RestaurantController.handleDisableMenuItem);

module.exports = router;