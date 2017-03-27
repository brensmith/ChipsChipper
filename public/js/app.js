var MyApp = angular.module('MyApp', ['ngRoute', 'ngResource']);

MyApp.config(function($routeProvider){
    $routeProvider
        //the home display
        .when('/', {
            templateUrl: 'home.html',
            controller: 'mainController'
        })
        //the cart display
        .when('/cart', {
            templateUrl: 'cart.html',
            controller: 'mainController'
        })
        
        .otherwise({
            redirectTo: '/'
        });

});

var MyApp = angular.module('MyApp');


MyApp.controller('mainController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('mainController loaded...');

    $scope.newBasket = {"json":""};

    
    $scope.getFoodItem = function(){
        $http.get('/foodmenu').success(function(response){
          //console.log($scope.fooditem);
            $scope.fooditems = response;
        });
    };


    $scope.getFoodItembyid = function(){
        var id = $routeParams.id;
        $http.get('/foodmenu/'+id).success(function(response){
            $scope.fooditem = response;
            $console.log($scope.fooditem);
        });
    };

    $scope.addFoodItem = function(){
        console.log($scope.fooditem);
        $http.post('/foodmenu/', $scope.fooditem).success(function(response){
            console.log('addFoodItem');
            //window.location.href='#/books';
        });
    };

    //Add fooditem to basket
$scope.addToBasket = function(index,id,fooditem){
        console.log(fooditem);
        $http.post('/basket/', fooditem).success(function(response){
            console.log('addToBasket');
                        $scope.newBasket = {"json" : ""};
                        
        });
    };

      //Delete fooditem to basket
$scope.deleteBasketItem = function(index,id,basketitem){
    correctIndex = $scope.basketitems.indexOf(basketitem);

        console.log(basketitem);
        $http.delete('/basket/', basketitem).success(function(response){
            $scope.basketitems.splice(correctIndex, 1);
            console.log('Basket Item Deleted');
                        
                        
        });
    };


    $scope.updateFoodItem = function(){
        var id = $routeParams.id;
        $http.put('/foodmenu/'+id, $scope.fooditem).success(function(response){
            console.log('updateFoodItem');
            //window.location.href='#/books';
        });
    };

    $scope.removeFoodItem = function(id){
        $http.delete('/foodmenu/'+id).success(function(response){
            console.log('removeaddFoodItem');
            //window.location.href='#/books';
        });
    };

    $scope.getSpecialItem = function(){
        $http.get('/specialmenu').success(function(response){
          //console.log($scope.fooditem);
            $scope.specialitems = response;
        });
    };


    $scope.getBasketItem = function(){
        $http.get('/basket').success(function(response){
          //console.log($scope.fooditem);
            $scope.basketitems = response;
        });
    };



    $scope.total = function(){
        var t = 0;
    for(var k in $scope.fooditems){
            t += parseInt($scope.fooditems[k].price);
        }
        return t;
    }

    $scope.totalbasket = function(){
        var t = 0;
    for(var k in $scope.basketitems){
            t += parseInt($scope.basketitems[k].price);
        }
        return t;
    }

    $scope.getFoodItem();
    $scope.getSpecialItem();
    $scope.getBasketItem();


}]);








