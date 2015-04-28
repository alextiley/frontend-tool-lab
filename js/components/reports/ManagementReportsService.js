/**
 * Handles business logic for the management reports interface
 */
(function (angular) {

    'use strict';

    var app = angular.module('app.components.reports.service', []);

    app.constant('REPORT_TYPES', [
        {
            'label': 'Unify',
            'value': 'unify'
        },
        {
            'label': 'PDF Reports',
            'value': 'pdf'
        },
        {
            'label': 'Raw Data',
            'value': 'raw'
        },
        {
            'label': 'Staff Survey',
            'value': 'staff'
        }
    ]);

    app.constant('FILE_FORMATS', [
        {
            'label': 'Microsoft Excel (.xlsx)',
            'value': 'xlsx'
        },
        {
            'label': 'Comma separated values (.csv)',
            'value': 'csv'
        },
        {
            'label': 'Adobe PDF (.pdf)',
            'value': 'pdf'
        }
    ]);

    app.constant('REPORT_FORMATS', {
        'raw': ['csv', 'xlsx']
    });

    app.factory('managementReportsService', function (REPORT_TYPES, FILE_FORMATS, REPORT_FORMATS) {
        return {
            getReportTypes: function () {
                return REPORT_TYPES;
            },
            /**
             * Gets all file formats for a given report type
             * @param type - the report type
             * @returns []
             */
            getFileFormatsByType: function (type) {

                var reportTypeFormats = REPORT_FORMATS[type],
                    currentFormat,
                    formatObject,
                    ret = [],
                    format,
                    i = 0;

                // Check if the supplied report type has file formats associated (if none, the user can't select format)
                if (reportTypeFormats !== undefined) {
                    for (i; i < reportTypeFormats.length; i++) {

                        currentFormat = reportTypeFormats[i];

                        // Validate that the mapped format exists in FILE_FORMATS
                        format = FILE_FORMATS.filter(function (item) {
                            return currentFormat === item;
                        });

                        if (format !== undefined) {
                            formatObject = {};
                            formatObject[currentFormat] = format;
                            ret.push(formatObject);
                        }
                    }
                }
                return ret;
            }
        };
    });

}(window.angular));
