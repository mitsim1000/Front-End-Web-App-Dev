(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchMenu = "";
    $scope.message = "";
    $scope.color = "";

    $scope.checkLunch = function () {
      if ($scope.lunchMenu === "") {
        $scope.message = "Please enter data first";
        $scope.color = "red";
        return;
      }

      var itemCount = $scope.lunchMenu.split(",").length;

      if (itemCount <= 3) {
        $scope.message = "Enjoy!";
        $scope.color = "green";
      }
      else {
        $scope.message = "Too much!";
        $scope.color = "red";
      }
    };
  }
})();
