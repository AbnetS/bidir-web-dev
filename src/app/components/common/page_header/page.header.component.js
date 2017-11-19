(function(angular) {
  'use strict';
  var pageHeader = {
      templateUrl: 'app/components/common/page_header/page_header.html',
      controller: 'PageHeaderController'
  };

  angular.module('bidirApp')
      .component('pageHeader', pageHeader);
})(window.angular);
