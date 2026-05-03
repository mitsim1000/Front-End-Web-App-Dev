describe('SignUpController', function () {
  'use strict';

  var $ctrl;
  var $httpBackend;
  var ApiPath;

  var mockMenuItems = {
    A: {
      menu_items: [
        {
          description: "tofu, chicken, mushroom, bamboo shoot, and egg",
          large_portion_name: "quart",
          name: "Hot and Sour Soup",
          price_large: 5,
          price_small: 2.55,
          short_name: "A4",
          small_portion_name: "pint"
        },
        {
          description: "chicken soup with egg drop and won tons",
          large_portion_name: "quart",
          name: "Egg Drop with Won Ton Soup",
          price_large: 6,
          price_small: 3,
          short_name: "A5",
          small_portion_name: "pint"
        },
        {
          description: "small pork dumplings in clear broth",
          large_portion_name: "quart",
          name: "Won Ton Soup",
          price_large: 5,
          price_small: 2.25,
          short_name: "A3",
          small_portion_name: "pint"
        }
      ]
    }
  };

  beforeEach(module('public'));

  beforeEach(inject(function ($controller, _$httpBackend_, _ApiPath_) {
    $httpBackend = _$httpBackend_;
    ApiPath = _ApiPath_;
    $ctrl = $controller('SignUpController');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should set invalidMenuNumber to false when menu number exists', function () {
    $httpBackend.expectGET(ApiPath + '/menu_items.json').respond(mockMenuItems);

    $ctrl.user.favoriteMenuNumber = 'A4';
    $ctrl.checkMenuNumber();
    $httpBackend.flush();

    expect($ctrl.invalidMenuNumber).toBe(false);
  });

  it('should set invalidMenuNumber to true when menu number does not exist', function () {
    $httpBackend.expectGET(ApiPath + '/menu_items.json').respond(mockMenuItems);

    $ctrl.user.favoriteMenuNumber = 'A100';
    $ctrl.checkMenuNumber();
    $httpBackend.flush();

    expect($ctrl.invalidMenuNumber).toBe(true);
  });
});
