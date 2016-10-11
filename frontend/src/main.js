( () => {
  'use strict';
  angular.module('gitHubApp', ['ngMaterial', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ui.mask']);

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
        controller: 'AddItemCtrl as vm',
        resolve: {
					options: ($stateParams) => {
						return {
							type: 'createAccount',
							id: $stateParams.id
						}
					}
				}
      })
      .state('account', {
        url: '/accounts/:id',
        templateUrl: 'template/accountDetails.html',
        controller: 'AccountDetails as vm', 
        resolve: {
					options: ($stateParams) => {
						return {
							type: 'detailsAccount',
							id: $stateParams.id
						}
					}
				}
      })
      .state('account.edit', {
				url: '/accounts/:id/edit/',
				templateUrl: 'formView.html',
				controller: 'formCtrl as vm',
				resolve: {
					options: ($stateParams) => {
						return {
							type: 'editAccount',
							id: $stateParams.id
						}
					}
				}
			})
		.state('account.delete', {
			url: '/accounts/:id/delete/',
			templateUrl: 'formView.html',
			controller: 'formCtrl as vm',
			resolve: {
				options: ($stateParams) => {
					return {
						type: 'deleteAccount',
						id: $stateParams.id
					}
				}
			}
		});
  });
})();