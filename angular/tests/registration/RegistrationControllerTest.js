(function () {

    'use strict';

    /*global describe, angular, beforeEach, module, inject, expect, it*/

    describe('The login view of RegistrationController', function () {

        var self = {};

        beforeEach(module('app.main'));

        beforeEach(inject(function ($controller, $rootScope) {
            self.$scope = $rootScope.$new();
            self.controller = $controller('RegistrationController', {$scope: self.$scope});
        }));

        it('should have login as the default view', function () {
            expect(self.$scope.activeView).toEqual(self.$scope.FORM_VIEWS.LOGIN);
        });

        it('should have e-mail placeholder text by default', function () {
            expect(typeof self.$scope.getEmailPlaceholder()).toEqual('string');
        });

        it('should have e-mail placeholder text for the login view', function () {
            self.$scope.activeView = self.$scope.FORM_VIEWS.LOGIN;
            expect(typeof self.$scope.getEmailPlaceholder()).toEqual('string');
        });

        it('should have e-mail placeholder text for the register view', function () {
            self.$scope.activeView = self.$scope.FORM_VIEWS.REGISTER;
            expect(typeof self.$scope.getEmailPlaceholder()).toEqual('string');
        });

        it('should not contain a placeholder on the login error header', function () {
            var header = self.$scope.getErrorHeader(self.$scope.FORM_VIEWS.LOGIN);
            expect(header).not.toContain('%1');
        });

        it('should not contain a placeholder on the registration error header', function () {
            var header = self.$scope.getErrorHeader(self.$scope.FORM_VIEWS.REGISTER);
            expect(header).not.toContain('%1');
        });

        it('should always have a title as type: string', function () {
            expect(typeof self.$scope.getFormTitle()).toEqual('string');
        });


        it('should only show error notifications when the login view is visible', function () {
            self.$scope.activeView = self.$scope.FORM_VIEWS.LOGIN;
            var isVisible = self.$scope.showErrorNotification(self.$scope.activeView);
            expect(isVisible).toBeTruthy();
        });

        it('should not show error notifications when the register view is visible', function () {
            self.$scope.activeView = self.$scope.FORM_VIEWS.REGISTER;
            var isVisible = self.$scope.showErrorNotification(self.$scope.activeView);
            expect(isVisible).toBeFalsy();
        });
    });


    describe('The registration view of RegistrationController', function () {

        var self = {};

        beforeEach(module('app.main'));

        // Mock window location
        beforeEach(function () {
            module(function ($provide) {
                $provide.value('$window', {
                    location: {
                        pathname: '/register'
                    }
                });
            });
        });

        // Inject dependencies into the controller
        beforeEach(function () {
            inject(function ($controller, $rootScope, $window) {
                self.$scope = $rootScope.$new();
                self.$window = $window;
                self.controller = $controller('RegistrationController', {
                    $scope: self.$scope,
                    $window: self.$window
                });
            });
        });

        it('should have register as the default view', function () {
            expect(self.$scope.activeView).toEqual(self.$scope.FORM_VIEWS.REGISTER);
        });

        it('should only show error notifications when the register view is visible', function () {
            self.$scope.activeView = self.$scope.FORM_VIEWS.REGISTER;
            var isVisible = self.$scope.showErrorNotification(self.$scope.activeView);
            expect(isVisible).toBeTruthy();
        });

        it('should not show error notifications when the login view is visible', function () {
            self.$scope.activeView = self.$scope.FORM_VIEWS.LOGIN;
            var isVisible = self.$scope.showErrorNotification(self.$scope.activeView);
            expect(isVisible).toBeFalsy();
        });
    });

}());
