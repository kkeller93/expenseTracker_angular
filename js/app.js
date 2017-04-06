// "use strict";

angular
  .module('expenseTracker', [
    'ui.router',
    'firebase'
  ])
  .config([
    '$stateProvider',
    RouterFunction
  ])
  .controller('expenseIndexController', [
    '$firebaseArray',
    expenseIndexControllerFunction
  ])
  .controller('expenseShowController', [
    '$stateParams',
    '$firebaseArray',
    expenseShowControllerFunction
  ])
  // .controller('expenseEditController', [
  //   '$firebaseObject',
  //   '$stateParams',
  //   '$state',
  //   expenseEditControllerFunction
  // ])
  .controller('expenseNewController', [
    '$firebaseObject',
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
    .state('expenseNew', {
      url: "/expenseTracker/new",
      templateUrl: "js/ng-views/new.html",
      controller: "expenseNewController",
      controllerAs: "vm"
    })
    .state('expenseShow', {
      url: "/expenseTracker/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "expenseShowController",
      controllerAs: "vm"
    })
    // .state('expenseEdit', {
    //   url: "/expenseTracker/:id/edit",
    //   templateUrl: "js/ng-views/edit.html",
    //   controller: "expenseEditController",
    //   controllerAs: "vm"
    // })
}

function expenseIndexControllerFunction($firebaseArray) {
  // generating all the expenses
  let ref = firebase.database().ref().child("expenses")
  this.expenses = $firebaseArray(ref)

  this.create = function() {
    this.expenses.$add(this.newExpense).then( () => this.newExpense = {})
  }
}

function expenseShowControllerFunction($stateParams, $firebaseObject) {
  //rendering the individual expense
  vm = this
  let x = null
  let ref = firebase.database().ref().child('expenses/' + $stateParams.id)
  // console.log(`============================controller ${ref}`)
  // this.expenses = $firebaseArray(ref)
  $firebaseObject(ref).$loaded().then(function(expense){
    // console.log(vm)
    vm.expense = expense
    // console.log(vm.expense[0].$value)
  })

  this.update = function() {
    this.expense.$save()
  }
  //deleting the expense
  this.delete = function(expense) {
    this.expenses.$remove(expense)
  }
}

// function expenseEditControllerFunction($firebaseObject, $stateParams, $state) {
//   //updating the expense
//   this.update = function(expense) {
//     this.expense.$save(expense)
//   }
//   //deleting the expense
//   this.delete = function(expense) {
//     this.expenses.$remove(expense)
//   }
// }
//
function expenseNewControllerFunction($firebaseObject, $state) {
  // creating a new expense
  this.create = function() {
    this.expenses.$add(this.newExpense).then( () => this.newExpense = {})
  }
//     this.expense = new expenseFactory()
//     this.create = function() {
//       this.expense.$save(function(expense) {
//         $state.go('expenseShow', {
//           id: $stateParams.id
//         })
//       })
//     }
}

// function
