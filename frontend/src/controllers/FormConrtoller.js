/*jshint esversion: 6 */

(() => {
  'use strict';
  angular.module('gitHubApp').controller('AddItemCtrl', AddItemCtrl);
  /* @ngInject */
  function AddItemCtrl($stateParams, $state, $uibModal, $scope, accounts){          
    var vm = this;    

    var modalOptions = $uibModal.open({
      templateUrl: 'formView.html',
      controller: 'ModalCtrl',
      controllerAs: 'vm',
      size: 'md',
    });

    modalOptions.result.then(function () {
        $state.go('accounts');
    }, function () {
        $state.go('accounts');
    });
          
    $scope.$on('$stateChangeStart', function() {
      modalOptions.dismiss();
    });
  }
        
  angular.module('gitHubApp').controller('ModalCtrl', ModalCtrl);
  /* @ngInject */
  function ModalCtrl ($uibModalInstance, accounts, $scope, $state,$stateParams){
    var vm = this;
    console.log($stateParams.id);
    vm.cancel = cancel;
            
    if ($stateParams.id) {
      vm.title = 'Modify Account';
      vm.button = 'Save';
      accounts.getAccount($stateParams.id)
        .then(results => { vm.data = results;});
        $scope.submit = function() {
          accounts.editAccount(vm.data).then(()=>$state.reload());
          $uibModalInstance.close('ok');
        };
    } else{
      vm.title = 'Create Account';
      vm.button = 'Create';
      $scope.submit = function() {
        if ($scope.addListForm.$valid) {              
          
            accounts.addAccount(vm.data).then(()=>$state.reload());
            $uibModalInstance.close('ok');  
          }               
        };
    }

    function cancel() {
       $uibModalInstance.close('cancel');
    }
  }
})();