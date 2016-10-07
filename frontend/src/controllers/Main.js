(() => {
  'use strict';
  angular.module('gitHubApp').controller('AccountsController', function AccountsController(accounts, $scope) {
    const vm = this;
    $scope.title = 'Users'
    accounts.getAccountsList().then(results => { $scope.users = results});
    $scope.showDetails = false;  
  });

  angular.module('gitHubApp').controller('AccountDetails', function AccountDetails($stateParams, accounts, $scope) {
        const vm = this;
        accounts.getAccount($stateParams.id)
                  .then(results => { $scope.user = results});
    });
})();

