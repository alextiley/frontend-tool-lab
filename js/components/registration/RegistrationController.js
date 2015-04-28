/**
 * Handles the login and registration form views
 */
(function (angular) {

    var app = angular.module('app.components.registration', [
            'app.validator.password',
            'app.validator.match',
            'app.directive.submittable'
        ]);

    app.constant('FORM_VIEWS', {
        'LOGIN': 'login',
        'REGISTER': 'register'
    });

    app.controller('RegistrationController', function ($scope, $window, $location, $anchorScroll, FORM_VIEWS) {

        // Privates
        var self = {};

        /**
         * Handles user log in
         * @param form
         */
        self.login = function (form) {
            // Consider moving this callback into a custom directive (ideally dom manip should not be in the controller)
            form.triggerSubmission('/admin/auth/login', function ($form) {
                var model = 'admin_models_form_LoginForm';
                $form.find('input[name="email"]').attr('name', model + '[username]');
                $form.find('input[name="password"]').attr('name', model + '[password]');
            });
        };

        /**
         * Handles registration for new users
         * @param form
         */
        self.register = function (form) {
            form.triggerSubmission('/admin/auth/register', function ($form) {
                var model = 'admin_models_form_RegisterForm';
                $form.find('input[name="email"]').attr('name', model + '[username]');
                $form.find('input[name="password"]').attr('name', model + '[password]');
                $form.find('input[name="passwordConfirm"]').attr('name', model + '[passwordConfirm]');
            });
        };

        /**
         * Determines whether to show the login or register view on load, based on the current URL
         * @param window
         * @returns {string}
         */
        self.getActiveViewFromRequest = function (window) {
            var view = FORM_VIEWS.LOGIN;

            if (window.location.pathname.indexOf('register') !== -1) {
                view = FORM_VIEWS.REGISTER;
            }
            return view;
        };

        self.originalView = self.getActiveViewFromRequest($window);

        // Publics
        $scope.model = {}; // stores each model field value.
        $scope.userForm = {}; // form, used for validation.
        $scope.FORM_VIEWS = FORM_VIEWS;
        $scope.activeView = self.originalView;

        $scope.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            // Bypass routing as we don't use it
            $location.hash(old);
        };

        $scope.setView = function (view, scroll) {
            scroll = scroll || false;
            $scope.activeView = view;
            $scope.userForm.$setPristine();
            // Scroll to the registration form on mobile devices
            if (scroll && !$window.matchMedia('(min-width:1024px)').matches) {
                $scope.scrollTo('main');
            }
        };

        $scope.getEmailPlaceholder = function (view) {
            var text = 'Please enter an email address';
            if (view === FORM_VIEWS.REGISTER) {
                text = 'Please enter your professional email address';
            }
            return text;
        };

        $scope.isSubmissionDisabled = function (form) {
            return form.$submitted && !form.$valid;
        };

        $scope.getErrorHeader = function (view) {
            var header = 'Sorry, but there was a problem %1.';
            return header.replace('%1', (view === FORM_VIEWS.REGISTER ? 'during registration' : 'logging in'));
        };

        $scope.getFormTitle = function (view) {
            return (view === FORM_VIEWS.REGISTER ? 'Register' : 'Login');
        };

        $scope.showErrorNotification = function (view) {
            return (view === self.originalView);
        };

        /**
         * View helper which should be used on submission of the form
         * @param form
         * @param model
         * @returns {boolean}
         */
        $scope.doSubmission = function (form, model) {
            if (!form.$valid) {
                return false;
            }
            self[$scope.activeView](form, model);
        };
    });

}(window.angular));
