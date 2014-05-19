'use strict';

angular
    .module('tastypieModule', ['ngResource'])
    .factory('apiCall', function ($http, $resource) {

        delete $http.defaults.headers.common['X-Requested-With'];

        var apiCall = $resource('/api/v1/:type/:id/', {
                type: '@type',
                username: '@userName',
                api_key: '@api_key',
                user: '@userID',
                id: '@id'
            }, 

            {
                get: {
                    method: 'GET'
                },
                patch: {
                    method: 'PATCH',
                    params: {},
                    isArray: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                post: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                del: {
                    method: 'DELETE',
                    params: {},
                    isArray: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                update: {
                    method: 'PUT',
                    params: {},
                    isArray: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            });

        return apiCall;
    });



angular
    .module('globalErrors', [])
    .config(function ($provide, $httpProvider, $compileProvider) {
        var elementsList = $();

        var showMessage = function (content, cl, time) {
            $('<div/>')
                .addClass('message')
                .addClass(cl)
                .hide()
                .fadeIn('fast')
                .delay(time)
                .fadeOut('fast', function () {
                    $(this).remove();
                })
                .appendTo(elementsList)
                .text(content);
        };

        $httpProvider.responseInterceptors.push(function ($timeout, $q) {
            return function (promise) {
                return promise.then(function (successResponse) {
                    if (successResponse.config.method.toUpperCase() != 'GET')
                        showMessage('Success', 'successMessage', 5000);
                    return successResponse;

                }, function (errorResponse) {
                    switch (errorResponse.status) {
                    case 401:
                        showMessage('Wrong usename or password', 'errorMessage', 20000);
                        break;
                    case 403:
                        showMessage('You don\'t have the right to do this', 'errorMessage', 20000);
                        break;
                    case 500:
                        showMessage('Server internal error: ' + errorResponse.data, 'errorMessage', 20000);
                        break;
                    default:
                        showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'errorMessage', 20000);
                    }
                    return $q.reject(errorResponse);
                });
            };
        });

        $compileProvider.directive('appMessages', function () {
            var directiveDefinitionObject = {
                link: function (scope, element, attrs) {
                    elementsList.push($(element));
                }
            };
            return directiveDefinitionObject;
        });
    });