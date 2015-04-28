# frontend-tool-lab
Playground for testing new front-end tools

Should be pretty clear but quick guide to getting this working:

1. Check out this repo
2. Run ```./frontend-setup.sh``` to install all dependencies (npm and bower). Alternatively just skip to step 3 as this step is handled whenever you run gulp.
3. Run ```./gulp.sh``` to start the default gulp task (karma test runner and live reload server).

To use live reload you need to add the browser add-on for Chrome/Firefox. Then whilst ```./gulp.sh``` is running, activate the live reload plugin in the browser for a given page. Then change the CSS for that page. The page should automatically update with changes without the need to refresh manually.

The karma test runner will automatically trigger and run tests whenever you modify a file defined in the ```karma.conf.js``` file. So as an example, try modifying ```RegistrationController.js``` or ```RegistrationControllerTest.js```.