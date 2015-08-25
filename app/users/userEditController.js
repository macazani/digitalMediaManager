(function () {

    'use strict';

    angular
        .module('digitalMediaManagement')
        .controller('userEditController', ['user'
                                           , '$state'
                                           , '$mdDialog'
                                           , '$scope'
                                           , '$mdToast'
                                           , UserEditController])


    function UserEditController(user, $state, $mdDialog, $scope, $mdToast) {
        var vm = this;



        vm.user = user;

        vm.companies = ('None,HP Enterprise,HP Inc').split(',').map(function (company) {
            return {
                name: company
            };
        })
        vm.regions = ('None,AMS,EMEA,APJ').split(',').map(function (region) {
            return {
                name: region
            };
        });
        vm.bus = ('None,EG,Corporate').split(',').map(function (bu) {
            return {
                name: bu
            };
        });
        vm.platformsData = {facebook:{title:'Facebook',name:'facebook'},
                                sprinkl:{title:'Sprinkl',name:'sprinkl'},
                                twitter:{title:'Twitter',name:'twitter'},
                                linkedin:{title:'Linked-in',name:'linkedin'},
                                radian6:{title:'Radian6',name:'radian6'},
                                curulate:{title:'Curulate',name:'curulate'},
                                hootsuite:{title:'Hootsuite',name:'hootsuite'},
                                youtube:{title:'Youtube',name:'youtube'}
                               };



        if (vm.user && vm.user.userId) {

            vm.title = 'Details'//vm.user.name;
        } else {

            vm.title = 'New User';

        }



        vm.submit = function () {

            vm.user.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');



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

            $state.go('userList', {}, {
                reload: true
            });
        }

        vm.cancel = function () {

            $mdDialog.cancel();
            $state.go('userList', {}, {
                reload: true
            });

        }

        $scope.closeDialog = function () {
            $mdDialog.hide();

        }

    };

}());
