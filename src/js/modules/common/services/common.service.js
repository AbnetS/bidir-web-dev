(function(angular) {

    'use strict';

    angular.module('app.common')
        .factory('CommonService', CommonService);

    function CommonService() {
        var factory = {
            buildUrl: _buildUrl,
            buildPaginatedUrl:_buildPaginatedUrl,
            buildPerPageUrl:_buildPerPageUrl,
            buildUrlWithParam: _buildUrlWithParam,
            buildUrlForSearch: _buildUrlForSearch,
            Validation: {
              ComputeValidation: function (validationObject) {
                  var isValid = true;
                  var properties = _.allKeys(validationObject);
                  _.each(properties, function (property) {
                      isValid = isValid && validationObject[property];
                  });
                  return isValid;
              },
              ResetValidationObject: function (validationObject) {
                  var properties = _.allKeys(validationObject);
                  _.each(properties, function (property) {
                      validationObject[property] = true;
                  });
              },
              ValidateForm: function (validationObject, referenceObject) {
                  var isValid = true;
                  var properties = _.allKeys(validationObject);
                  var validateSingleObject= function (objValue) {
                      if(_.isString(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue) && objValue.length > 0;
                      }

                      if(_.isNumber(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue) && !_.isNaN(objValue);
                      }

                      if(_.isDate(objValue)){
                          return !_.isUndefined(objValue) && !_.isNull(objValue);
                      }

                      if(_.isObject(objValue)){

                          return !_.isUndefined(objValue) && !_.isNull(objValue)&& !_.isEmpty(objValue);
                      }

                      return !_.isUndefined(objValue) && !_.isNull(objValue);
                  };

                  _.each(properties, function (property) {
                      var index = property.indexOf('Valid');
                      if(index != -1) {
                          var objProperty = property.substring(2, index);
                      }
                      if (_.has(referenceObject, objProperty)) {
                          var objValue = referenceObject[objProperty];
                          validationObject[property] = validateSingleObject(objValue);
                      }else{
                          // console.log('Validation failed for: ',objProperty);
                          validationObject[property] = false;
                          isValid = false;
                      }
                      isValid = isValid && validationObject[property];
                  });
                  return isValid;
              }
          }
        };

        return factory;


        function _buildUrl(service,url) {
          return API.Config.BaseUrl + service +'/' + url;
        }
        function _buildPaginatedUrl(service,url) {
            var parameters = {start:1,limit:500};
            return url===''?API.Config.BaseUrl + service + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit:
                API.Config.BaseUrl + service +'/' + url + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit;
        }
        function _buildPerPageUrl(service,url,parameters) {
            return url===''?API.Config.BaseUrl + service + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit:
                API.Config.BaseUrl + service +'/' + url + '/paginate?page='+parameters.start+'&per_page=' + parameters.limit;
        }
        function _buildUrlWithParam(service,url, id) {
            return url===''?API.Config.BaseUrl + service + '/' + id : API.Config.BaseUrl + service +'/'+ url + '/' + id;
        }
        function _buildUrlForSearch(service,url, searchText) {
            return API.Config.BaseUrl + service +'/'+ url + '/search?search=' + searchText;
        }
    }

})(window.angular);
