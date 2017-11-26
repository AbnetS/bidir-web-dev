(function(angular) {
    'use strict';

    angular.module('components', [
        'components.auth',
        'components.mfi',
      ]).run(runBlock);

          /** @ngInject */
          function runBlock() {
              // console.log("components run");

          }

})(window.angular);
