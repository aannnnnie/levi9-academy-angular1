(function () {
	
	"use strict";
	
	angular.module('gitHubApp').constant('CONSTANTS', {
		dataUrl: 'http://localhost:1337/Account',
		pageTitle: {
			list:"Accounts",
			single:"Account details"
		},
		formTitle: {
			createAccount: "Creating Account",
			editAccount: "Modifying Account",
			deleteAccount: "Comfirm Delete"
		},
		formButton: {
			createAccount: "Add",
			editAccount: "Save",
			deleteAccount: "Confirm"
		},
	});	
})();