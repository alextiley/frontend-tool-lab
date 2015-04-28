/**
 * Handles global configuration for the main angular app
 */
(function (angular) {

    var app = angular.module('app.config', []);

    // The API root context - need to update this
    app.constant('API_URL', 'http://set.api.url/here');

}(window.angular));
