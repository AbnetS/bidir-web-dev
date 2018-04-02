/**
 * Created by Yoni on 3/5/2018.
 */

(function(angular) {
    "use strict";

    angular.module("app.acat").controller("CropsController", CropsController);

    CropsController.$inject = ['ACATService','$mdDialog','RouteHelpers'];

    function CropsController(ACATService,$mdDialog,RouteHelpers) {
        var vm = this;
        vm.addCrop = _addCrop;
        vm.editCrop = _addCrop;
        callApi();

       function callApi(){
           ACATService.GetCrops().then(function (response) {
               vm.crops = response.data.docs;
           });
       }


        function _addCrop(crop,ev) {
            $mdDialog.show({
                locals: {data:{crop:crop}},
                templateUrl: RouteHelpers.basepath('acat/crop/crop.dialog.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                hasBackdrop: false,
                escapeToClose: true,
                controller: cropDialogController,
                controllerAs: 'vm'
            }).then(function (answer) {
                callApi();
            }, function (response) {
                console.log("refresh on response");
            });
        }

        function cropDialogController($mdDialog,data,CommonService,AlertService,blockUI) {
            var vm = this;
            vm.cancel = _cancel;
            vm.saveCrop = _saveCrop;
            vm.isEdit = data.crop !== null;

            vm.cropForm = {
                IsnameValid: true,
                IscategoryValid: true
            };

            if(vm.isEdit){
                vm.crop = data.crop;
            }

            function _saveCrop() {
                vm.IsValidData = CommonService.Validation.ValidateForm(vm.cropForm, vm.crop);
                if (vm.IsValidData) {
                    var myBlockUI = blockUI.instances.get('CropBlockUI');
                    myBlockUI.start();
                    if(vm.isEdit){
                        ACATService.UpdateCrop(vm.crop)
                            .then(function (response) {
                                $mdDialog.hide();
                                AlertService.showSuccess("CROP","CROP UPDATED SUCCESSFULLY!");
                                myBlockUI.stop();
                            },function (error) {
                                console.log("error",error);
                                var message = error.data.error.message;
                                AlertService.showError("FAILED TO UPDATE CROP", message);
                                myBlockUI.stop();
                            });
                    }else{
                        ACATService.SaveCrop(vm.crop)
                            .then(function (response) {
                                $mdDialog.hide();
                                AlertService.showSuccess("CROP","CROP CREATED SUCCESSFULLY!");
                                myBlockUI.stop();
                            },function (error) {
                                console.log("error on crop create",error);
                                var message = error.data.error.message;
                                AlertService.showError("FAILED TO CREATE CROP", message);
                                myBlockUI.stop();
                            });
                    }

                }else {
                    AlertService.showWarning("Warning","Please fill the required fields and try again.");
                }
            }
            function _cancel() {
                $mdDialog.cancel();
            }
        }

    }



})(window.angular);