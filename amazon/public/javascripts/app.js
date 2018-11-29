angular.module('amazon',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.products = [];
    $scope.cart = [];
    $scope.ordered = [];
    $scope.getAll = function() {
			return $http.get('/products').success(function(data){
				angular.copy(data, $scope.products);
			});
    };
    $scope.getAll();
    $scope.create = function(product) {
			return $http.post('/products', product).success(function(data){
				$scope.products.push(data);
			});
    };

    $scope.order = function(product) {
      return $http.put('/products/' + product._id + '/order')
        .success(function(data){
          console.log("ordered");
          product.orders += 1;
        });
    };

    $scope.addProduct = function() {
      var newObj = {Name:$scope.productName,Price:$scope.productPrice,Image:$scope.productImage};
      $scope.create(newObj);
      $scope.productName = '';
      $scope.productPrice = '';
      $scope.productImage = '';
    }
    
    $scope.addToCart = function(product) {
        if ($scope.cart.length != 0) {
            if ($scope.cart.find(el => el.Name == product.name && el.Image == product.Image)) {
                $scope.cart.filter(el => el.Image != product.Image);
            } else {
              $scope.cart.push(product);
            }
        } else {
            $scope.cart.push(product);
        }
    }
    
    $scope.purchase = function() {
        for (var i = 0; i < $scope.cart.length; i++) {
            $scope.ordered.push($scope.cart[i]);
            $scope.order($scope.cart[i]);
        }
        $scope.cart = [];
    }

    $scope.incrementUpvotes = function(candidate) {
      $scope.upvote(candidate);
    };
 
    $scope.delete = function(product) {
      console.log("Deleting Name "+product.Name+" ID "+product._id);
      $http.delete('/products/'+product._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);