'use strict';

/**
 * @ngdoc function
 * @name AdministrativeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the AdministrativeApp
 */
app.controller('MainCtrl', function ($scope, $rootScope, $http) {

	$rootScope.page_title = "Asset Management";
  $rootScope.loggedIn = true;

    // http request to get the list of products
    var req = {
      method: "GET",
      url: 'http://192.168.1.185:3000/products'
    };

    $http(req).success(function(data, status){
      $scope.rowCollection = data;
      $scope.status = status;
    }).
    error(function(data, status){
      $scope.data = data || "Request failed";
      console.log($scope.data);
      $scope.status = status;
    });
    // end http request

      var id = 1;
      $scope.edit = false;

      $scope.removeItem = function removeItem(row) {
  	    if (confirm("Are you sure you want to delete this asset ?") == true) {
          var index = $scope.rowCollection.indexOf(row);
	        if (index !== -1) {
	          $scope.rowCollection.splice(index, 1);
            $http.delete('http://192.168.1.185:3000/products/'+row.id.$oid);
	        }
				} else {
    				return
					}
      }

      $scope.editItem = function editItem(row) {
        $scope.editrow = angular.copy(row);
        $scope.edit = true;
      }

      $scope.saveItem = function saveItem(editrow) {
        // code to edit locally start
        var index;
        var itemStatus=false;

        for (index = 0; index < $scope.rowCollection.length; index++) {
          if ($scope.rowCollection[index].id.$oid === editrow.id.$oid) {
            itemStatus=true;
            break;
          }
        }
        if (itemStatus) {
          console.log("Replacing item:"+editrow.id.$oid);
          $scope.rowCollection.splice(index, 1, editrow);
          $scope.editrow = {id:++id};
        }
        else {
          console.log("Adding item:"+editrow.id.$oid);
          $scope.rowCollection.push(editrow);
          $scope.editrow = {id:++id};
        }
        $scope.edit = false;
        // code to edit locally end

        // code to edit on server start
        $http.put('http://192.168.1.185:3000/products/' + editrow.id.$oid + '.json',
          { 
            "brand": editrow.brand,
            "equipment": editrow.equipment,
            "model": editrow.model,
            "capacity": editrow.capacity,
          }
        )
        .success(function(response, status, headers, config){}).error(function(response, status, headers, config){});
        // code to edit on server end
    } // end Save Item
    
    $http({method: 'GET', url: "http://192.168.1.185:3000/api/config"})
    .success(function(data, status, headers, config) {
      $scope.brands = data.brands;
      $scope.equipments = data.equipments
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

    $scope.addAsset = function() {
      var asset_brand = $('#asset_brand').find(":selected").text();
      var asset_equipment = $('#asset_equipment').find(":selected").text();
      $http.post('http://192.168.1.185:3000/products',
        { 
          "brand": asset_brand,
          "equipment": asset_equipment,
          "model": $scope.asset_model,
          "capacity": $scope.asset_capacity,
        }
      )
      .success(function(response, status, headers, config){}).error(function(response, status, headers, config){});
    }

});
