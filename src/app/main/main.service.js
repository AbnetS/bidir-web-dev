(function(angular) {
  'use strict';
  angular.module('bidirApp')

  .service('MainService', MainService);

  /**@ngInject */
  function MainService($resource,$http, CommonService) {

      var service = {
        GetMFI: _getMFI,
        UpdateMFI: _updateMFI,
        CreateMFI:_createMFI,
        UpdateBranch: _updateBranch,
        CreateBranch:_createBranch,
        ChangeStatus:_changeBranchStatus,
        MFI: $resource(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI), {  }, ResourceMethods.All),
        branches: $resource(CommonService.buildUrl(API.Service.MFI,API.Methods.Branch), {id:"@id"}, ResourceMethods.All)
      };

      return service;
      function _updateBranch(updated_branch){
        return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.Branch,updated_branch._id), updated_branch);
      }
      function _createBranch(branch){
        return $http.post(CommonService.buildUrl(API.Service.MFI,API.Methods.Branch), branch);
      }
      function _changeBranchStatus(branchStatus){
        return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.Branch,branchStatus._id,branchStatus) );
      }
      function _getMFI(){
        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI));
      }
      function _updateMFI(mfi,picFile){
        var mfiData = new FormData();
        mfiData.append("name", mfi.name);
        mfiData.append("location", mfi.location);
        mfiData.append("contact_person", mfi.contact_person);
        mfiData.append("phone", mfi.phone);
        mfiData.append("email", mfi.email);
        mfiData.append("website_link", mfi.website_link);
        mfiData.append("establishment_year", mfi.establishment_year);

        if(!_.isUndefined(picFile)){
          mfiData.append("logo", picFile);
        }


        return $http({
          url: "http://35.185.118.191:18199/MFIs/" + mfi._id,
          method: 'PUT',
          data: mfiData,
          //assigning content-type as undefined,let the browser
          //assign the correct boundary for us
          headers: { 'Content-Type': undefined},
          //prevents serializing payload.  don't do it.
          transformRequest: angular.identity
      });
      }
      function _createMFI(mfi,picFile){
        var mfiData = new FormData();
        mfiData.append("name", mfi.name);
        mfiData.append("location", mfi.location);
        mfiData.append("contact_person", mfi.contact_person);
        mfiData.append("phone", mfi.phone);
        mfiData.append("email", mfi.email);
        mfiData.append("website_link", mfi.website_link);
        mfiData.append("establishment_year", mfi.establishment_year);
        mfiData.append("logo", picFile);

        return $http({
          url: "http://35.185.118.191:18199/MFIs/",
          method: 'POST',
          data: mfiData,
          //assigning content-type as undefined,let the browser handle it
          headers: { 'Content-Type': undefined},
          //prevents serializing data.  don't do it.
          transformRequest: angular.identity
      });

      }
  }

})(window.angular);
