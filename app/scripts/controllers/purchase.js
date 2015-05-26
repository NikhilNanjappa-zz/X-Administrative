'use strict';

/**
 * @ngdoc function
 * @name AdministrativeApp.controller:PurchaseCtrl
 * @description
 * # PurchaseCtrl
 * Controller of the AdministrativeApp
 */
app.controller('PurchaseCtrl', function ($scope, $rootScope, $http) {

	$rootScope.page_title = "Purchase Management";

    // http request to get the purchase details
    $http({method: 'GET', url: "http://192.168.1.185:3000/purchases"})
    .success(function(data, status, headers, config) {
      $scope.rowCollection = data;
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

    // http request to get the asset details
    $http({method: 'GET', url: "http://192.168.1.185:3000/products"})
    .success(function(data, status, headers, config) {
      $scope.informations = data;
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

    var id = 1;
    $scope.edit = false;

    //   $scope.removeItem = function removeItem(row) {
  	 //    if (confirm("Are you sure you want to delete this asset ?") == true) {
    //       var index = $scope.rowCollection.indexOf(row);
	   //      if (index !== -1) {
	   //        $scope.rowCollection.splice(index, 1);
	   //      }
				// } else {
    // 				return
				// 	}
    //   }

    //   $scope.editItem = function editItem(row) {
    //     $scope.editrow = angular.copy(row);
    //     $scope.edit = true;
    //   }

    //   $scope.saveItem = function saveItem(editrow) {
    //     var index;
    //     var itemStatus=false;

    //     for (index = 0; index < $scope.rowCollection.length; index++) {
    //       if ($scope.rowCollection[index].id === editrow.id) {
    //         itemStatus=true;
    //         break;
    //       }
    //     }
    //     if (itemStatus) {
    //       console.log("Replacing item:"+editrow.id);
    //       $scope.rowCollection.splice(index, 1, editrow);
    //       $scope.editrow = {id:++id};
    //     }
    //     else {
    //       console.log("Adding item:"+editrow.id);
    //       $scope.rowCollection.push(editrow);
    //       $scope.editrow = {id:++id};
    //     }
    //     $scope.edit = false;
    // }

    //Add purchase
    $scope.addPurchase = function(row) {
      $http.post('http://192.168.1.185:3000/purchases',
        { 
          "product_id": $('#purchase_information').find(":selected").val(),
          "purchase_date": $('#purchase_date').val(),
          "cost": $('#purchase_cost').val(),
          "quantity": $('#purchase_quantity').val(),
          "vendor": $('#purhcase_vendor').val(),
          "expiry_date": $('#expiry_date').val(),
          "serial_no": $('#purchase_serial_no').val(),
        }
      )
      .success(function(response, status, headers, config){
        alert('Purchase added..Please refresh to see the changes')
      }).error(function(response, status, headers, config){
        console.log(status);
        console.log(response);
      });
    }
    
});
