/**
 * RegistrationService
 * -------------------
 * Not currently used, however this code has been checked in to show an example of how we would wire the front-end to
 * an external API.
 */
(function (angular) {

    var app = angular.module('app.service.registration', [
            'ngResource',
            'app.utils.api'
        ]);

    app.factory('RegistrationApi', function ($resource, ApiUtil) {
        return $resource(ApiUtil.url('/register'), {}, {
            post: {
                responseType: 'json',
                timeout: 10000
            }
        });
    });

}(window.angular));
