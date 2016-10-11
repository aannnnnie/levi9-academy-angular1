(() => {
  'use strict';
  angular.module('gitHubApp').controller('AddItemCtrl', [
        '$stateParams', '$state', '$uibModal', '$scope',
        function($stateParams, $state, $uibModal, $scope, accounts){
          var vm = this;
          vm.type = $stateParams.type;
          //console.log(vm.type)
          var modalOptions = $uibModal.open({
              templateUrl: 'template/formView.html',
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
        }]);
        
        angular.module('gitHubApp').controller('ModalCtrl', function($uibModalInstance, accounts, $scope, $state){
            var vm = this;
            
            vm.addItem = addItem;
            vm.cancel = cancel;
            
              function addItem() {
                if ($scope.addListForm.$valid) {
                  accounts.addAccount(vm.data).then(()=>$state.reload());
                  $uibModalInstance.close('ok');
                  
              };
            }

            function delItem() {
              console.log('del')
               accountsAction = accounts.delAccount(vm.id).then(()=>$state.reload());
            }
    
            function cancel() {
               $uibModalInstance.dismiss('cancel');
            };
          });
})();