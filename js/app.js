"use strict";

angular
  .modular('expenseTracker', [
    'ui.router',
    'ngResource'
  ])
  .config([
    '$stateResource',
    RouterFunction
  ])
  .factory('expenseFactory',[
    '$resource',
    expenseFactoryFunction
  ])
  .controller('expenseIndexController', [
    'expenseFactory',
    expenseIndexControllerFunction
  ])
  .controller('expenseShowController', [
    'expenseFactory',
    '$stateParams',
    expenseShowControllerFunction
  ])
  .controller('expenseEditController', [
    'expenseFactory',
    '$stateParams',
    '$state',
    expenseEditControllerFunction
  ])
  .controller('expenseNewController', [
    'expenseFactory',
    '$state',
    expenseNewControllerFunction
  ])

function RouterFunction($stateProvider) {
  $stateProvider
    .state('expenseIndex', {
      url: "/expenseTracker",
      templateUrl: "js/ng-views/index.html",
      controller: "expenseIndexController",
      controllerAs: "vm"
    })
    .state('expenseShow', {
      url: "/expenseTracker/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "expenseShowController",
      controllerAs: "vm"
    })
    .state('expenseEdit', {
      url: "/expenseTracker/:id/edit",
      templateUrl: "js/ng-views/edit.html",
      controller: "expenseEditController",
      controllerAs: "vm"
    })
    .state('expenseNew', {
      url: "/expenseTracker/new",
      templateUrl: "js/ng-views/new.html",
      controller: "expenseNewController",
      controllerAs: "vm"
    })
}

function expenseFactoryFunction($resource) {
  //import my json data here
}

function expenseIndexControllerFunction(expenseFactory) {
    this.expenses = expenseFactory.query()
}

function expenseShowControllerFunction(expenseFactory, $stateParams) {
    this.expense = expenseFactory.get({
      id: $stateParams.id
    })
}

function expenseEditControllerFunction(expenseFactory, $stateParams, $state) {
    this.expense = expenseFactory.get({
      id: $stateParams.id
    })
    this.update = function() {
      this.expense.$update({id: $stateParams.id}, function(expense) {
        $state.go('expenseShow', {id: expense.id})
      })
    }

    this.destroy = function() {
      this.expense.delete({
        id: $stateParams.id
      })
    }
}

function expenseNewControllerFunction(expenseFactory, $state) {
    this.expense = new expenseFactory()
    this.create = function() {
      this.expense.$save(function(expense) {
        $state.go('expenseShow', {
          id: $stateParams.id
        })
      })
    }
}
