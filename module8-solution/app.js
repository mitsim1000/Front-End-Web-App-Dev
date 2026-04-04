(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;
  narrowItDown.found = null;

  narrowItDown.removeItem = function (index) {
    narrowItDown.found.splice(index, 1);
  };

  narrowItDown.narrowItDown = function () {
    if (!narrowItDown.searchTerm) {
      narrowItDown.found = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
    promise.then(function (foundItems) {
      narrowItDown.found = foundItems;
    });
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: 'GET',
      url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
    }).then(function (result) {
      var foundItems = [];
      var allItems = result.data;

      for (var item in allItems) {
        var items = allItems[item].menu_items;
        for (var i = 0; i < items.length; i++) {
          if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(items[i]);
          }
        }
      }

      return foundItems;
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

})();
