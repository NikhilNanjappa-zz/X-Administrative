'use strict';

/**
 * @ngdoc function
 * @name AdministrativeApp.controller:InventoryCtrl
 * @description
 * # InventoryCtrl
 * Controller of the AdministrativeApp
 */
app.controller('InventoryCtrl', function ($scope, $rootScope, $http) {

	$rootScope.page_title = "Inventory Management";
  $rootScope.loggedIn = true;

	// var ert = document.getElementById(101);
	// console.log(ert);

// ---------- Inventory Controller -------------//


    // http request to get the asset details
    $http({method: 'GET', url: "http://192.168.1.185:3000/products"})
    .success(function(data, status, headers, config) {
      $scope.informations = data;
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });

    // http request to get the list of available items
    var req = {
      method: "GET",
      url: 'http://192.168.1.185:3000/api/available'
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

    // http request to get the list of issued items
    var req = {
      method: "GET",
      url: 'http://192.168.1.185:3000/api/issued'
    };

    $http(req).success(function(data, status){
      $scope.rowCollection2 = data;
    }).
    error(function(data, status){
      $scope.data = data || "Request failed";
    });

    var id = 1;
    $scope.edit = false;

    // add a new inventory
    $scope.addInventory = function() {
      $http.post('http://192.168.1.185:3000/inventories',
        { 
          "product_id": $('#inventory_information').find(":selected").val(),
          "serial_no": $scope.inventory_serialno,
        }
      )
      .success(function(response, status, headers, config){}).error(function(response, status, headers, config){});
    }


// ---------- Allotment Controller -------------//

  // allot an existing inventory to an employee
  $scope.allotInventory = function() {
    $http.post('http://192.168.1.185:3000/api/issue',
      { 
        "serial_no": $('#show_serialno').text(),
        "xid": $('#allotment_id').val(),
        "date": $('#allotment_date').val(),
        "status": $('#allotment_type').find(":selected").text(),
      }
    )
    .success(function(response, status, headers, config){}).error(function(response, status, headers, config){
      if(status == 422) {
        alert('There is no employee with this ID');
      }
    });
  }

  // return an issued inventory from an employee
  $scope.returnInventory = function(row) {
    $http.post('http://192.168.1.185:3000/api/return',
      { 
        "serial_no": row.serial_no,
        "date": row.date,
      }
    )
    .success(function(response, status, headers, config){
      alert('Inventory returned..Please refresh to see the changes')
    }).error(function(response, status, headers, config){
      console.log(status);
      console.log(response);
    });
  }

  // pass the value of the respective inventory to display in the allotment modal
  $scope.allot = function allot(row) {
    $scope.show_serialno = row.serial_no;
    $scope.show_assetinfo = row.prod
  }

}); // end of InventoryCtrl


