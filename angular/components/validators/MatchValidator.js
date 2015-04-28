(function (angular) {

    var app = angular.module('app.validator.match', []);

    app.directive('validateMatch', function ($parse) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attributes, controller) {

                var parser = $parse(attributes.validateMatch),
                    self = {};

                self.getMatchValue = function () {
                    var match = parser(scope);
                    if (angular.isObject(match) && match.hasOwnProperty('$viewValue')) {
                        match = match.$viewValue;
                    }
                    return match;
                };

                scope.$watch(self.getMatchValue, controller.$validate);

                controller.$validators.match = function () {
                    return controller.$viewValue === self.getMatchValue();
                };
            }
        };
    });

}(window.angular));
