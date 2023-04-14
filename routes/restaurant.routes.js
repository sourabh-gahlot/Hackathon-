const express= require("express")

const router= express.Router()

const restaurantController = require('../controller/restaurant.controller');

router.route("/add").post(restaurantController.addRestaurant)
router.route("/").get(restaurantController.allRestaurants).delete(restaurantController.deleteAllRestaurant)
router.route("/categories").get(restaurantController.restaurantCategories)
router.route("/categories/:category").get(restaurantController.restaurantByCategories)
router.route("/:id").get(restaurantController.restaurantById).put(restaurantController.updateRestaurant).delete(restaurantController.deleteRestaurant)
router.route("/rating/:rating").get(restaurantController.restaurantByRating)


module.exports = router