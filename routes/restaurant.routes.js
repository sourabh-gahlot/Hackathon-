const express= require("express")

const router= express.Router()

const restaurantController = require('../controller/restaurant.controller');

router.route("/add").post(restaurantController.addRestaurant)
router.route("/").get(restaurantController.allRestaurants)
router.route("/categories").get(restaurantController.restaurantCategories)

module.exports=router