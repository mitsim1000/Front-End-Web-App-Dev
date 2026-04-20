(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.template.html',
      controller: CategoriesController,
      controllerAs: 'categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/templates/items.template.html',
      controller: ItemsController,
      controllerAs: 'itemsCtrl',
      resolve: {
        items: ['$stateParams', 'MenuDataService',
          function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
      }
    });
}

CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
  this.categories = categories;
}

ItemsController.$inject = ['items'];
function ItemsController(items) {
  this.items = items;
}

})();
