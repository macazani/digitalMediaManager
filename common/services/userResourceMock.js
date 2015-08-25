(function () {
    'use strict';

    var app = angular
        .module('userResourceMock', ['ngMockE2E']);

    app.run(function ($httpBackend) {
        var users = [
            {
                "userId": 1,
                "name": "Adam Buck",
                "email": "adam.buck@hp.com",
                "company": "HP Enterprise",
                "comments": ["comment1", "comment2"],
                "region": "EMEA",
                "bu": "Corporate",
                "platforms": {
                    "hootsuite": {
                        "name": "hootsuite",
                        "active": true,
                        "data": [{
                                "teamName": "HP Carrers APJ",
                                "socialNetworkType": "Facebook Page"
                                    },
                            {
                                "teamName": "HP Carrers AMS",
                                "socialNetworkType": "Facebook Page"
                                    }]

                    },
                    "facebook": {
                        "name": "facebook",
                        "active": true,
                        "data": [{
                                "page": "HP Networking",
                                "role": "Editor",
                                "bm": "Yes"
             },
                            {
                                "page": "HP Australia",
                                "role": "Advertiser",
                                "bm": "No"
             }]

                    }

                }


            },
            {
                "userId": 2,
                "name": "Albert Qian",
                "email": "albert.qian@hp.com",
                "company": "HP Inc",
                "comments": ["comment1", "comment2"],
                "region": "AMS",
                "bu": "EG",
                "platforms":{
                    "facebook":{
                    "name" : "facebook",
                    "active":false},
                    "data":[]
                }

            }



        ];

        var userUrl = '/api/users';

        /*Editing an existing item*/

        $httpBackend.whenGET(userUrl).respond(users);

        var editRegex = new RegExp(userUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editRegex).respond(function (method, url, data) {
            var user = {
                "userId": 0
            };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].userId == id) {
                        user = users[i];
                        break;
                    }
                };
            }
            return [200, user, {}];
        });

        /* When creating a new item*/

        $httpBackend.whenPOST(userUrl).respond(function (method, url, data) {

            var user = angular.fromJson(data);

            if (!user.userId) {

                //new UserId

                user.userId = users[users.length - 1].userId + 1;
                users.push(user);

            } else {

                //Updated user
                for (var i = 0; i < users.length; i++) {
                    if (users[i].userId == user.userId) {

                        users[i] = user;
                        break;
                    }

                };

            }

            return [200, user, {}];


        });

        //Pass through any requests for applications files
        $httpBackend.whenGET(/app/).passThrough();

    });

}());
