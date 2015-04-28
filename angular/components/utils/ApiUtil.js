(function (angular) {

    var app = angular.module('app.utils.api', [
            'app.config'
        ]);

    /**
     * API utility service - provides utilities for accessing the API
     */
    app.service('ApiUtil', function (API_URL) {

        var self = this;

        /**
         * Depends on the API_URL constant in config.js
         * @return string
         */
        self.getApiUrl = function () {
            if (API_URL.substr(API_URL.length - 1) === '/') {
                throw 'ApiUtil: API url must not contain a trailing forward slash. Please remove and try again.';
            }
            return API_URL;
        };

        /**
         * Creates a URL for the API using the specified endpoint param
         * @param  string endpoint - the endpoint path to append to the API_URL
         * @return string - the url
         */
        self.url = function (endpoint) {
            return self.getApiUrl() + (endpoint.indexOf('/') !== 0 ? '/' + endpoint : endpoint);
        };
    });

}(window.angular));