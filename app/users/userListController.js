(function () {

    'use strict';
    angular
        .module('digitalMediaManagement')
        .controller('userListController',['userResource', UserListController]);

    function UserListController(userResource) {
        var vm = this;

        userResource.query(function (data){

            vm.platformUsers = data;
            vm.platformsData = {facebook:{tooltip:'Facebook',iconName:'facebook'},
                                sprinkl:{tooltip:'Sprinkl',iconName:'bullseye'},
                                twitter:{tooltip:'Twitter',iconName:'twitter'},
                                linkedin:{tooltip:'Linked-in',iconName:'linkedin'},
                                radian6:{tooltip:'Radian6',iconName:'cloud'},
                                curulate:{tooltip:'Curulate',iconName:'cubes'},
                                hootsuite:{tooltip:'Hootsuite',iconName:'gears'},
                                youtube:{tooltip:'Youtube',iconName:'youtube-play'}
                               };


        });

        /*vm.platformUsers = */

    }


}());
