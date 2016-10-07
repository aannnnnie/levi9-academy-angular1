( () => {
  'use strict';
  angular.module('gitHubApp', ['ngRoute', 'ui.router', 'ui.bootstrap', 'ui.mask']);

  angular.module('gitHubApp').config(function ($stateProvider, $urlRouterProvider) {      
    $urlRouterProvider.otherwise("/accounts");

    $stateProvider
      .state('accounts', {
        url: '/accounts',
        controller: 'AccountsController as vm',
        templateUrl: 'template/accountView.html'
      })
      .state('accounts.add', {
        url: '/add',
        controller: 'AddItemCtrl as vm'
      })
      .state('account', {
        url: '/accounts/:id',
        templateUrl: 'template/accountDetails.html',
        controller: 'AccountDetails as vm'
      })
  });
})();