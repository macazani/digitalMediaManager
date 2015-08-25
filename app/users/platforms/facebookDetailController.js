(function () {

    'use strict';
    angular
        .module('digitalMediaManagement')
        .controller('facebookDetailController',
                    ['user',
                     '$state',
                     FacebookDetailController]);

    function FacebookDetailController(user) {
        var vm = this;

        vm.user = user;

        vm.title = "Details for " + vm.user.name;



        vm.savePlatformDetails = function () {

            //delete vm.user.facebook;


            vm.user.$save(function(data){


                toastr.success('Save Successful');
            });

        }

        vm.removeItem = function (index) {

            //delete vm.user.facebook;

            vm.user.facebook.splice(index, 1);



        }

    }


}());
