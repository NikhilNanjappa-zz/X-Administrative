'use strict';

/**
 * @ngdoc function
 * @name AdministrativeApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the AdministrativeApp
 */
app.controller('EmployeeCtrl', function ($scope, $rootScope, $http) {

$rootScope.page_title = "Employee Management";


    $http({method: 'GET', url: "http://192.168.1.185:3000/employees"})
    .success(function(data, status, headers, config) {
      $scope.rowCollection = data;
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    });
  
    var id = 1;
    $scope.edit = false;

    //   $scope.removeItem = function removeItem(row) {
  	 //    if (confirm("Are you sure you want to delete this employee ?") == true) {
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

    //Add employees
    $scope.addEmployee = function(row) {
      $http.post('http://192.168.1.185:3000/employees',
        { 
          "name": $('#employee_name').val(),
          "email": $('#employee_email').val(),
          "phone": $('#employee_phone').val(),
          "xid": $('#employee_id').val(),
        }
      )
      .success(function(response, status, headers, config){
        alert('Employee added..Please refresh to see the changes')
      }).error(function(response, status, headers, config){
        console.log(status);
        console.log(response);
      });
    }

});
