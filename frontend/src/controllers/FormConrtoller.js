(() => {
  'use strict';
  angular.module('gitHubApp').controller('AddItemCtrl', [
        '$stateParams', '$state', '$uibModal', '$scope',
        function($stateParams, $state, $uibModal, $scope, accounts){
          var vm = this;
          
          var modalInstance = $uibModal.open({
              templateUrl: 'template/formView.html',
              controller: 'ModalInstanceCtrl',
              controllerAs: 'vm',
              size: 'md',
          });

          modalInstance.result.then(function () {
              $state.go('accounts');
          }, function () {
              $state.go('accounts');
          });
          
          $scope.$on('$stateChangeStart', function() {
              modalInstance.dismiss();
          });
        }]);
        
        angular.module('gitHubApp').controller('ModalInstanceCtrl', function($uibModalInstance, accounts, $scope, $state){
            var vm = this;
            
            vm.addItem = addItem;
            vm.cancel = cancel;
            
              function addItem() {
                if ($scope.addListForm.$valid) {
                  accounts.addAccount(vm.data).then(()=>$state.reload());
                  $uibModalInstance.close('ok');
                  
              };
            }
    
            function cancel() {
               $uibModalInstance.dismiss('cancel');
            };
          });
})();