const Restaurant = require("../models/restaurant.model");

exports.addResaturant = async (req, res) => {
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

    req.status(200).json({
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


