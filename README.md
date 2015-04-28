# frontend-tool-lab
Playground for testing new front-end tools

Should be pretty clear but quick guide to getting this working:

1. Check out this repo
2. Run ```./frontend-setup.sh``` to install all dependencies (npm and bower). Alternatively just skip to step 3 as this step is handled whenever you run gulp.
3. Run ```./gulp.sh``` to start the default gulp task (karma test runner and live reload server).

To use live reload you need to add the browser add-on for Chrome/Firefox. Then whilst ```./gulp.sh``` is running, activate the live reload plugin in the browser for a given page. Then change the CSS for that page. The page should automatically update with changes without the need to refresh manually.

The karma test runner will automatically trigger and run tests whenever you modify a file defined in the ```karma.conf.js``` file. So as an example, try modifying ```RegistrationController.js``` or ```RegistrationControllerTest.js```.

*Base angular files*
angular.min.js
angular-resource.min.js
config.js
routes.js

*app specific files*
reports/ManagementReportsService.js
reports/ManagementReportsController.js

*Yii angular config*

```php
[
    'angular' => array(
        'basePath' => 'webroot.bower_components.angular',
        'js' => array('angular.min.js')
    ),
    'angular-resource' => array(
        'basePath' => 'webroot.bower_components.angular-resource',
        'js' => array('angular-resource.min.js')
    ),
    'angular-bootstrapper' => [
        'basePath' => 'webroot.js.angular',
        'depends' => [
            'angular'
        ],
        'js' => [
            'config.js',
            'routes.js'
        ]
    ],
    'angular-registration' => [
        'basePath' => 'webroot.js.angular.components',
        'depends' => [
            'angular-bootstrapper'
        ],
        'js' => [
            'validators/PasswordValidator.js',
            'validators/MatchValidator.js',
            'utils/ApiUtil.js',
            'directives/Submittable.js',
            'registration/RegistrationController.js'
        ],
    ],
    'angular-management-reports' => [
        'basePath' => 'webroot.js.angular.components',
        'depends' => [
            'angular-bootstrapper'
        ],
        'js' => [
            'reports/ManagementReportsService.js',
            'reports/ManagementReportsController.js'
        ],
    ]
]
```