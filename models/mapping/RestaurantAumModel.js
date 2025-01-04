const { getDB } = require("../../db/d_base");
const { ObjectId } = require("mongodb");

class Restaurant {
  // Add a restaurant
  static async createRestaurant(restaurantData) {
    const db = getDB();
    await db.collection("restaurants").insertOne(restaurantData);
  }

  // Get a restaurant by _Id
  static async getRestaurantById(restaurantId) {
    const db = getDB();
    return await db
      .collection("restaurants")
      .findOne({ _id: new ObjectId(restaurantId) });
  }

  // Update a restaurant
  static async updateRestaurant(restaurantId, updatedData) {
    const db = getDB();

    await db
      .collection("restaurants")
      .updateOne({ _id: new ObjectId(restaurantId) }, { $set: updatedData });
  }

  // Fetch all restaurant using pagination
  static async findAll(page, limit) {
    const db = getDB();
    const restaurants = await db
      .collection("restaurants")
      .find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    const total = await db
      .collection("restaurants")
      .countDocuments({ isActive: true });

    return { restaurants, total, page, totalPages: Math.ceil(total / limit) };
  }

  // Add Restaurant MenuItem
  static async addMenuItem(restaurantId, menuItem) {
    const db = getDB();
    menuItem._id = new ObjectId();
    await db
      .collection("restaurants")
      .updateOne(
        { _id: new ObjectId(restaurantId) },
        { $push: { menu: menuItem } }
      );
  }

  // Update Restaurant MenuItem
  static async updateMenuItem(restaurantId, menuItemId, updatedData) {
    const db = getDB();
    await db.collection("restaurants").updateOne(
      { _id: new ObjectId(restaurantId), "menu._id": new ObjectId(menuItemId) },
      {
        $set: {
          "menu.$.name": updatedData.name,
          "menu.$.description": updatedData.description,
          "menu.$.price": updatedData.price,
          "menu.$.menuImageUrl": updatedData.menuImageUrl,
          "menu.$.dateModified": new Date(),
        },
      }
    );
  }

  // Get Restaurant MenuItem
  static async getMenuItemById(restaurantId, menuItemId) {
    const db = getDB();

    const restaurant = await db.collection("restaurants").findOne(
      {
        _id: new ObjectId(restaurantId),
        menu: { $elemMatch: { _id: new ObjectId(menuItemId) } },
      },
      { projection: { "menu.$": 1 } } // Only return the matching menu item
    );
    return restaurant?.menu[0]; // Return the first (and only) matched item
  }

  // Update Restaurant MenuItem ????
  static async disableMenuItem(restaurantId, menuItemId) {
    const db = getDB();
    await db.collection("restaurants").updateOne(
      { _id: new ObjectId(restaurantId), "menu._id": new ObjectId(menuItemId) },
      {
        $set: {
          "menu.$.isActive": false,
          "menu.$.dateModified": new Date(),
        },
      }
    );
  }
}

module.exports = Restaurant;
