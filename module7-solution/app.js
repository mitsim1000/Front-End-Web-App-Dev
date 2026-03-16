(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('price', PriceFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getBuyItems();

  toBuy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [
    { name: "cookies", quantity: 10, pricePerItem: 1 },
    { name: "chips", quantity: 5, pricePerItem: 1 },
    { name: "apples", quantity: 7, pricePerItem: 1.5 },
    { name: "bananas", quantity: 3, pricePerItem: 1.5 },
    { name: "juice", quantity: 2, pricePerItem: 2 }
  ];

  var boughtItems = [];

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.buyItem = function (itemIndex) {
    boughtItems.push(buyItems[itemIndex]);
    buyItems.splice(itemIndex, 1);
  };
}

function PriceFilter() {
  return function (price) {
    return '$$$' + price;
  };
}

})();
