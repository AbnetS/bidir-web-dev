(function(angular) {
  'use strict';
  angular.module('bidirApp')

  .service('MainService', MainService);

  /**@ngInject */
  function MainService($resource,$http, CommonService,AuthService) {
        // var mfiUrl = 'http://api.dev.bidir.gebeya.io/MFI/';
         // var mfiUrl2 = 'http://api.dev.bidir.gebeya.io/MFI/';


      return {
        GetMFI: _getMFI,
        UpdateMFI: _updateMFI,
        CreateMFI:_createMFI,
        UpdateBranch: _updateBranch,
        SearchBranch: _searchBranch,
        GetBranches: _getBranches,
        CreateBranch:_createBranch,
        ChangeStatus:_changeBranchStatus,
        // MFI: $resource(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI), {  }, ResourceMethods.All),
        branches: $resource(CommonService.buildUrl(API.Service.MFI,API.Methods.Branch), {id:"@id"}, {
          'query': { method: 'GET', isArray: true,headers: { 'Authorization': 'Bearer ' + AuthService.GetToken()} },
          'get': {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + AuthService.GetToken()}
            },
          'update': { method: 'PUT',headers: { 'Authorization': 'Bearer ' + AuthService.GetToken()} },
          'delete': { method: 'DELETE',headers: { 'Authorization': 'Bearer ' + AuthService.GetToken()} }
        })
        // branches: $resource(mfiUrl+'/branches', {id:"@id"}, ResourceMethods.All)
      };

      function _searchBranch(searchText){
        var httpConfig = {
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Accept': 'application/json'
          }
        };
        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.Branch)+'/name=' + searchText,httpConfig);
      }
      function _updateBranch(updated_branch){
        var httpConfig = {
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Accept': 'application/json'
          }
        };
        return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.Branch,updated_branch._id), updated_branch,httpConfig);
      }
      function _createBranch(branch){
        var httpConfig = {
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Accept': 'application/json'
          }
        };
        return $http.post(CommonService.buildUrl(API.Service.MFI,API.Methods.Branch) + '/create', branch,httpConfig);
      }
      function _changeBranchStatus(branchStatus){
        var httpConfig = {
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Accept': 'application/json'
          }
        };
        return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.Branch,branchStatus._id), branchStatus,httpConfig);
      }
      function _getMFI(){
        var httpConfig = {
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Accept': 'application/json'
          }
        };
        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI) + '/all',httpConfig);
      }
      function _getBranches(){
        var httpConfig = {
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Accept': 'application/json'
          }
        };

        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.BranchGet),httpConfig);
      }

      function _updateMFI(data,logo){
        var updatedMFI = setAttribute(data,logo);

        return $http({
          url: CommonService.buildUrl(API.Service.MFI,API.Methods.MFI) + data._id,
          method: 'PUT',
          data: updatedMFI,
          //assigning content-type as undefined,let the browser
          //assign the correct boundary for us
          headers: {
                  'Authorization': 'Bearer ' + AuthService.GetToken(),
                  'Content-Type': undefined},
          //prevents serializing payload.  don't do it.
          transformRequest: angular.identity
      });
      }

      function setAttribute(mfi,picFile){
        var mfiData = new FormData();
        mfiData.append("name", mfi.name);
        mfiData.append("location", mfi.location);
        mfiData.append("establishment_year", mfi.establishment_year);
        mfiData.append("contact_person", _.isUndefined(mfi.contact_person)?'':mfi.contact_person);
        mfiData.append("phone", _.isUndefined(mfi.phone)?'':mfi.phone);
        mfiData.append("email", _.isUndefined(mfi.email)?'':mfi.email);
        mfiData.append("website_link", _.isUndefined(mfi.website_link)?'':mfi.website_link);
        if(!_.isUndefined(picFile)){
          mfiData.append("logo", picFile);
        }

        return mfiData;
      }

      function _createMFI(data,logo){
        var mfiData = setAttribute(data,logo);

        return $http({
          url: CommonService.buildUrl(API.Service.MFI,API.Methods.MFI) + 'create',
          method: 'POST',
          data: mfiData,
          //assigning content-type as undefined,let the browser handle it
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Content-Type': undefined},
          //prevents serializing data.  don't do it.
          transformRequest: angular.identity
      });

      }
  }

})(window.angular);
