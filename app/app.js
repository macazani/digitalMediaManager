(function () {
    'use strict';

    var app = angular.module('digitalMediaManagement', ['common.services',
                                                        'ui.router',
                                                        'ui.mask',
                                                        'xeditable',
                                                        'smart-table',
                                                        'ngMaterial',
                                                       'userResourceMock']);

    app.run(function (editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    app.config(['$stateProvider',
                '$urlRouterProvider',
                '$mdThemingProvider',

                function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
                $urlRouterProvider.otherwise('/');

                $mdThemingProvider.theme('default').primaryPalette('blue', {
                    default: '900'
                });


                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'app/homeView.html'
                    })
                    //Users
                    .state('userList', {
                        url: '/users',
                        templateUrl: 'app/users/userListView.html',
                        controller: 'userListController as vm'

                    })

                //Edit User
                .state('userEdit', {
                    url: '/edit/:userId',
                    parent: 'modal',
                    views: {
                        'modal@': {
                            templateUrl: 'app/users/userEditView.html',
                            controller: 'userEditController as vm',
                            resolve: {
                                userResource: 'userResource',
                                user: function (userResource, $stateParams) {
                                    var userId = $stateParams.userId;
                                    return userResource.get({
                                        userId: userId
                                    }).$promise;
                                }
                            }
                        }
                    }

                })

                .state('modal', {
                    abstract: true,
                    parent: 'userList',
                    url: '',
                    onEnter: ['$mdDialog', '$state', function ($mdDialog, $state) {

                        $mdDialog.show({
                            template: '<md-dialog ui-view="modal"></md-dialog>',
                            parent: angular.element(document.body)

                        }).finally(function () {
                            $mdDialog.hide();
                            $state.go('userList');
                        });


                     }]
                })


                //View Facebook User
                .state('facebookDetail', {
                    url: '/users/:userId',
                    templateUrl: 'app/users/platforms/facebookDetailView.html',
                    controller: 'facebookDetailController as vm',
                    resolve: {
                        userResource: 'userResource',
                        user: function (userResource, $stateParams) {
                            var userId = $stateParams.userId;
                            return userResource.get({
                                userId: userId
                            }).$promise;
                        }
                    }

                })

                //View Platform Data
                .state('platformData', {
                    url: '/:userId/:platform',
                    parent: 'modal',
                    views: {
                        'modal@': {
                            templateUrl: 'app/users/platformDataView.html',
                            controller: 'platformDataController as vm',
                            resolve: {
                                userResource: 'userResource',
                                user: function (userResource, $stateParams) {
                                    var userId = $stateParams.userId;
                                    return userResource.get({
                                        userId: userId
                                    }).$promise;
                                }
                            }
                        }
                    }

                });





                }]


    );

    app.controller('sideNavController', function ($scope, $timeout, $mdSidenav, $mdUtil) {
            $scope.toggleLeft = buildToggler('left');

            function buildToggler(navID) {
                var debounceFn = $mdUtil.debounce(function () {
                    $mdSidenav(navID)
                        .toggle();

                }, 200);
                return debounceFn;
            }
        })
        .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav) {
            $scope.close = function () {
                $mdSidenav('left').close();

            };
        });

}());
