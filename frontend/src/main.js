/*jshint esversion: 6 */

( () => {
  'use strict';
  angular.module('gitHubApp', ['ngMaterial', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ui.mask', 'templatescache']);

  angular.module('gitHubApp').config(/* @ngInject */ function ($stateProvider, $urlRouterProvider) {      
    $urlRouterProvider.otherwise("/accounts");

    $stateProvider

      .state('accounts', {
        url: '/accounts',
        controller: 'AccountsController as vm',
        templateUrl: 'accountView.html',
      })
      .state('account', {
        url: '/account/:id',
        templateUrl: 'accountDetails.html',
        controller: 'AccountDetails as vm', 
      })
      .state('add', {
        url: '/add',
        controller: 'AddItemCtrl as vm',
      })
      .state('account.edit', {
		url: '/edit',
		controller: 'AddItemCtrl as vm',
	  })
	  .state('accounts.edit', {
		url: '/:id/edit',
		controller: 'AddItemCtrl as vm',
	  })
	  .state('account.delete', {
		url: '/delete',
		controller: 'AccountDetails as vm'
	  })
	  .state('accounts.delete', {
		url: '/:id/delete',
		onEnter:  function($mdDialog, $stateParams, accounts, $state) {
			console.log($stateParams.id);
          var confirm = $mdDialog.confirm()
	          .title('Are you sure that you want to delete this user?')
	          .targetEvent(event)
	          .ok('OK')
	          .cancel('CANCEL');          
          $mdDialog.show(confirm).then(function() {
            accounts.delAccount($stateParams.id).then(()=>{$state.go('accounts');}, function() {});
          });
        }
	  });
  });
})();