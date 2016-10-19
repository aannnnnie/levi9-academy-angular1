/*jshint esversion: 6 */

(() => {
  'use strict';
  angular.module('gitHubApp').controller('AccountsController', function AccountsController(accounts, $scope, $stateParams) {
    var vm = this;
    $scope.title = 'Users';
    accounts.getAccountsList().then(results => { $scope.users = results;});  
  });

  angular.module('gitHubApp').controller('AccountDetails', function AccountDetails($stateParams, accounts, $scope, $state, $mdDialog) {
        const vm = this;
        accounts.getAccount($stateParams.id).then(results => { $scope.user = results;});
                  
        $scope.deleteAccount = function(event) {
          var confirm = $mdDialog.confirm()
          .title('Are you sure that you want to delete this user?')
          .targetEvent(event)
          .ok('OK')
          .cancel('CANCEL');          
          $mdDialog.show(confirm).then(function() {
            accounts.delAccount($stateParams.id).then(()=>{$state.go('accounts');}, function() {});
          });
        };
  });
})();