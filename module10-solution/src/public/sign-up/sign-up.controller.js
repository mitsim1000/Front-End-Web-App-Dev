(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService', 'MenuService'];
function SignUpController(SignUpService, MenuService) {
  var $ctrl = this;
  $ctrl.user = {};
  $ctrl.saved = false;
  $ctrl.invalidMenuNumber = false;

  $ctrl.checkMenuNumber = function () {
    $ctrl.invalidMenuNumber = false;
    if (!$ctrl.user.favoriteMenuNumber) {
      return;
    }

    MenuService.getAllMenuItems().then(function (allMenuItems) {
      var item = SignUpService.findMenuItem(allMenuItems, $ctrl.user.favoriteMenuNumber);
      if (!item) {
        $ctrl.invalidMenuNumber = true;
      }
    });
  };

  $ctrl.submit = function () {
    $ctrl.saved = false;
    $ctrl.invalidMenuNumber = false;

    MenuService.getAllMenuItems().then(function (allMenuItems) {
      var item = SignUpService.findMenuItem(allMenuItems, $ctrl.user.favoriteMenuNumber);
      if (!item) {
        $ctrl.invalidMenuNumber = true;
        return;
      }
      $ctrl.user.favoriteItem = item;
      SignUpService.saveUserInfo($ctrl.user);
      $ctrl.saved = true;
    });
  };
}

})();
