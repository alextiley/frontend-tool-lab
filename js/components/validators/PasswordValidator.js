(function (angular) {

    var app = angular.module('app.validator.password', []);

    app.directive('validatePassword', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attributes, controller) {
                controller.$validators.password = function () {
                    var valid = false,
                        min = 8;

                    if (controller.$viewValue === undefined) {
                        valid = false;
                    } else {
                        if (controller.$viewValue.length >= min) {
                            valid = true;
                        }
                    }
                    return valid;
                };
            }
        };
    });

}(window.angular));