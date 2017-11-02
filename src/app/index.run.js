(function() {
  'use strict';

  angular
    .module('bidirApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
