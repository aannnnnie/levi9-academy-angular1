(function () {
	
	"use strict";
	
	angular.module('gitHubApp').factory('modal', modalService);
	
	function modalService($uibModal) {
		let modalInstante;
		
		return {
			open: (options) => {
				modalInstante = $uibModal.open(options);
				
				return modalInstante;
			},
			close: () => {
				modalInstante.close();
				
				return modalInstante;
			}
		}
	}
	
})();