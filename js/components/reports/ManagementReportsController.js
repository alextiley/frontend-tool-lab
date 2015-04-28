/**
 * Handles the management reports interface
 */
(function (angular) {

    'use strict';

    var app = angular.module('app.components.reports', [
        'app.components.reports.service'
    ]);

    app.controller('ManagementReportsController', ['managementReportsService', function (reportService) {

        var self = this;

        // Page render data
        self.entity = {};
        self.reportTypes = reportService.getReportTypes();
        self.fileFormats = [];

        // Define default model values
        self.model = {
            reportType: ''
        };

        self.hasFileFormats = function () {
            return self.fileFormats.length > 0;
        };

        self.setFileFormats = function (type) {
            self.fileFormats = reportService.getFileFormatsByType(type);
        };

    }]);

}(window.angular));
