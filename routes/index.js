var express = require('express');
var router = express.Router();

//Required Model --> This gives us access to the menu model
var FoodMenu = require('../models/menu');

// when user requests "/" respond by rendering index.handlebars
router.get('/', function(req, res){
	res.render('index');
});

// Get food item objects from database
router.get('/foodmenu', function(req, res){
    console.log('GET all food');
    FoodMenu.find({})
        .exec(function(err, foodmenu){
            if(err){
                res.send('An error has occured');
            }	else{
                console.log(foodmenu);
                //req.json(menu); //returns the data in json format
                res.send(foodmenu);
            }
        });

});

// Find one food object from database
router.get('/foodmenu/:id', function(req, res){
    console.log('GET one menu item');
    FoodMenu.findOne({_id: req.params.id})
        .exec(function(err, foodmenu){
            if(err){
                res.send('An error has occured');
            }	else{
                console.log(foodmenu)
                res.json(foodmenu);
            }
        });

});

// Add menu object to database
router.post('/foodmenu', function(req, res){
    var newFoodMenu = new FoodMenu();

    newFoodMenu.category = req.body.category;
    newFoodMenu.name = req.body.name;
    newFoodMenu.quantity = req.body.quantity;
    newFoodMenu.price = req.body.price;
    newFoodMenu.img_url = req.body.img_url;

    newFoodMenu.save(function(err,FoodMenu){
        if(err){
            res.send('Error saving Food Item');
        }else{
            console.log(FoodMenu);
            res.send(FoodMenu);
        }
    });
});

// Add food Item2 object to database
router.post('/fooditem2', function(req, res){
    Fooditem.create(req.body,function(err, fooditem){
        if(err){
            res.send('error saving meal');


        }else{
            console.log('Fooditem');
            res.send(fooditem);
        }
    });

});

// Update food Item object to database
router.put('/foodmenu/:id', function(req, res){
    FoodMenu.findOneAndUpdate({_id: req.params.id},
        {$set:{category: req.body.category,
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            img_url: req.body.img_url
        }},
        {upsert: true},
        function(err, newFoodMenu){
            if(err){
                res.send('error occured');
            }
            else{
                console.log(newFoodMenu);
                res.send(newFoodMenu);
            }

        });
});

router.delete('/foodmenu/:id', function(req, res){
    FoodMenu.findOneAndRemove({
        _id:req.params.id
    },function(err,FoodMenu){
        if(err){
            res.send('Error deleting');
        }else{
            console.log(FoodMenu);
            res.status(204);
        }
    });
});

router.post('/delete', function(req, res) {
    var condition = req.body;
    Menu.remove(condition, function (err, message) {
        if (err) {
            res.send(err.message)
            return console.error(err);
        }
        res.send(message);
    });

});

router.post('/update', function(req, res) {
    var data = req.body;
    delete data.$$hashKey;

    Menu.update({_id: data._id}, data, {multi: true}, function (err, message) {
        if (err) {
            res.send(err.message)
            return console.error(err);
        }
        res.send(message);
    });

});

module.exports = router;