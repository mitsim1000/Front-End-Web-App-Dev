(function () {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

function SignUpService() {
  var service = this;
  var userInfo = null;

  service.findMenuItem = function (allMenuItems, menuNumber) {
    for (var category in allMenuItems) {
      var items = allMenuItems[category].menu_items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].short_name === menuNumber) {
          items[i].categoryShortName = category;
          return items[i];
        }
      }
    }
    return null;
  };

  service.saveUserInfo = function (info) {
    userInfo = info;
  };

  service.getUserInfo = function () {
    return userInfo;
  };
}

})();
