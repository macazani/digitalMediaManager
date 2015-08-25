(function () {

    'use strict';
    angular
        .module('digitalMediaManagement')
        .controller('platformDataController', ['user'
                     , '$state'
                     , '$mdDialog'
                     , '$mdToast'
                     , '$scope'
                     , PlatformDataController]);

    function PlatformDataController(user, $state, $mdDialog, $mdToast, $scope) {

        var vm = this;

        vm.user = user;

        vm.title = $state.params.platform[0].toUpperCase() + $state.params.platform.slice(1) + " details for " + vm.user.name;

        vm.platformView = $state.params.platform;

        vm.platformFields = {
            facebook: [{
                    fieldName: 'page',
                    fieldValue: 'Pages',
                    fieldType: 'text'
                },
                {
                    fieldName: 'role',
                    fieldValue: 'Roles',
                    fieldType: 'text'
                },
                {
                    fieldName: 'bm',
                    fieldValue: 'BM',
                    fieldType: 'select',
                    fieldOptions: ['Yes', 'No', 'N/A']
                }
                                        ],
            hootsuite: [{
                    fieldName: 'teamName',
                    fieldValue: 'Team Name',
                    fieldType: 'text'
                },
                {
                    fieldName: 'socialNetworkType',
                    fieldValue: 'Social Network',
                    fieldType: 'text'
                }
                                           ]
        };

        vm.addRow = function () {

            var newRow = {};
            for(var field in vm.platformFields[$state.params.platform]) {
                newRow[field.fieldName] = '';
            }

            vm.user.platforms[$state.params.platform].data.push(newRow);

        }




        vm.savePlatformDetails = function () {

            //delete vm.user.facebook;


            vm.user.$save(function (data) {


                $mdToast.show(
                    $mdToast.simple({
                        content: 'Save Succesfull!!',
                        hideDelay: 3000,
                        position: 'top right'
                    })
                );

                $mdDialog.hide();

            });
            $state.go('userList');
        }

        vm.removeItem = function (index) {

            //delete vm.user.facebook;

            vm.user.platforms[$state.params.platform].data.splice(index, 1);



        }

        $scope.closeDialog = function () {
            $mdDialog.hide();
        }


    }


}());
