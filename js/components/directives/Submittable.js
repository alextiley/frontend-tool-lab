/**
 * This directive allows manual form submission on forms with ng-submit.
 * By default angular does not allow the use of a controller when a form has an 'action' attribute.
 * This directive allows us to programmatically bind an action attribute to a form, and then submit with code.
 * Useful when you have a <form> that you want to submit normally (without AJAX), whilst using two-way data binding.
 */
(function (angular, $) {

    var app = angular.module('app.directive.submittable', []);

    app.directive('submittable', function () {
        return {
            require: 'form',
            restrict: 'A',
            link: function ($scope, $el, $attr, $form) {
                $form.triggerSubmission = function (action, type, callback) {
                    if (typeof type === 'function' && callback === undefined) {
                        callback = type;
                        type = undefined;
                    }
                    if (type === undefined) {
                        type = 'post';
                    }
                    // Add the action attribute
                    $el.attr('action', action);
                    // Set to post by default, overridable by adding 'get' as 2nd param to this method
                    $el.attr('method', type);
                    // Custom callback
                    if (typeof callback === 'function') {
                        callback.call(this, $el);
                    }
                    // Submit the form manually
                    $el[0].submit();
                };
            }
        };
    });

}(window.angular, window.$));
