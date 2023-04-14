const Restaurant = require("../models/restaurant.model");

exports.addRestaurant = async (req, res) => {
  if (!req.body) {
    res.status(500).send({
      message: "content cannot be empty",
    });
  }
  try {
    const newRestaurant = await Restaurant.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      imageURL: req.body.imageURL,
      location: req.body.location,
      phone: req.body.phone,
      rating: req.body.rating,
    });

    res.status(200).json({
      status: "sucess",
      data: {
        newRestaurant,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
};

exports.allRestaurants  = async (req, res) =>{

  try{

      const restaurants = await Restaurant.find();

      res.status(200).send({
          restaurants : restaurants,
          message : "Restaurants fetched Successfully"
      })
  }
  catch(err){

      console.log("Error fetching Restaurant", err);
          return res.status(500).send({
          message: "Some error occured while fetching the Restaurants."
      })
  }
}

exports.restaurantCategories = async (req, res) =>{

  try{
  
      const categoryArray = await Restaurant.find({}, {category:1})
  
      const allCategories = categoryArray.map((result) => result.category);
  
      res.status(200).send(
          allCategories
      )
  
  } catch(err){
  
          console.log("Error fetching categories", err);
              return res.status(500).send({
              message: "Some error occured while fetching categories."
          })
      }
  
  }

  exports.restaurantByCategories = async (req, res) => {

    try{

        const restaurants = await Restaurant.find({category : req.params.category});

        res.status(200).send(restaurants);

    } catch(err){

        console.log("Error fetching categories", err);
            return res.status(500).send({
            message: "Some error occured while fetching the Restaurant."
        })
    }

}

exports.restaurantById = async (req, res) => {

  try{
      const restaurant = await Restaurant.find({_id : req.params.id})

      res.status(200).send(restaurant);
  }catch(err){

      console.log("Error fetching restaurant", err);
          return res.status(404).send({
          message: "No restaurant found with the given Id."
      })
  }
}

exports.updateRestaurant = async (req, res)=>{
  try{

      let restaurantIdReq = req.params.id;
      
      if(!restaurantIdReq){
          return res.status(200).send({
              message : "Restaurant Id required."
               })
      }

      const restaurant = await Restaurant.find({_id : restaurantIdReq});

      if(!restaurant){
          return res.status(200).send({
              message : "No Restaurant found for given ID."
               })
      }

      if (Object.keys(req.body).length === 0) {
  
          return res.status(400).send({
              message: "Restaurant Data is required"
          })
      }

      restaurant.name = req.body.name != undefined ? req.body.name : restaurant.name;
      restaurant.description = req.body.description != undefined ? req.body.description : restaurant.description;
      restaurant.category = req.body.category != undefined ? req.body.category : restaurant.category;
      restaurant.imageURL = req.body.imageURL != undefined ? req.body.imageURL : restaurant.imageURL;
      restaurant.location = req.body.location != undefined ? req.body.location : restaurant.location;
      restaurant.phone = req.body.phone != undefined ? req.body.phone : restaurant.phone;
      restaurant.rating = req.body.rating != undefined ? req.body.rating : restaurant.rating;


       res.status(200).send({
          message : "Restaurant updated successfully."
      });

  }catch(err){
      console.log("Error updating restaurant", err);
          return res.status(500).send({
          message: "Some error occured while updating the Restaurant."
      })
  }
}
exports.restaurantByRating = async (req, res)=>{
  try{

  const restaurants = await Restaurant.find({rating : {$gte : req.params.rating}});

  res.status(200).send(restaurants);

  }catch(err){
      console.log("Error fetching restaurant", err);
          return res.status(404).send({
          message: "No restaurant found with the given Id."
      })
  }
}

exports.deleteRestaurant = async (req, res) => {

  try{
  const restaurantIdReq = req.params.id;

  if(!restaurantIdReq){
      return res.status(200).send({
          message : "Restaurant Id required."
           })
  }

  const restaurant = await Restaurant.findOne({_id : restaurantIdReq})

  const restaurantDeleted = await Restaurant.deleteOne({_id : restaurantIdReq});

  console.log(restaurant);

      res.status(200).send({
          restaurant : restaurant != undefined ? restaurant : null,
          message : "Restaurant deleted successfully."
      })
  }catch(err){
      console.log("Error deleting restaurant", err);
          return res.status(500).send({
          message: "Some error occured while deleting the Restaurant."
      })
  }
}

exports.deleteAllRestaurant = async (req, res) => {
  try{
                 
      const result = await Restaurant.deleteMany();
  

          res.status(200).send({
              restaurants : result.deletedCount===0?null:result,
              message : "Restaurants deleted successfully."
          })
      }catch(err){
          console.log("Error deleting restaurants", err);
              return res.status(500).send({
              message: "Some error occured while deleting the Restaurant."
          })
      }
}


