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


