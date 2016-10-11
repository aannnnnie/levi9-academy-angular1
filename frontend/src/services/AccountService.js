(() => {
  'use strict';

  angular.module('gitHubApp').factory('accounts', function AccountService($http, CONSTANTS) {
    const vm = this;

    return {
      getAccountsList: function (){return $http.get(`${CONSTANTS.dataUrl}`).then(response=>response.data)},
      getAccount: function(id) {return $http.get(`${CONSTANTS.dataUrl}/${id}`).then(response=>response.data)},
      addAccount: function(data) {return $http.post(`${CONSTANTS.dataUrl}`, JSON.stringify(data))},
      delAccount: function (id) {return $http.delete(`${CONSTANTS.dataUrl}/${id}`)},
      editAccount: function (data) {return $http.put(`${CONSTANTS.dataUrl}/update/${data.id}`, data).then(response => {response.data})}
    }
  });
})();