(function(angular) {
    'use strict';

    angular.module('components', [
        'components.auth'
      ]).run(runBlock);

          /** @ngInject */
          function runBlock() {
              console.log("components run");
          }

})(window.angular);
