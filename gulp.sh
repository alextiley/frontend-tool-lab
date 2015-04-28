#!/bin/bash

########################
# Usage ./gulp.sh [task]
########################

while test $# -gt 0; do
    case "$1" in
        -h|--help|--usage)
            echo "Usage: ./gulp.sh [task] (empty will run the default gulp task, i.e. LiveReload and karma)"
            exit 0
            ;;
        *)
            break
            ;;
    esac
done

# path to this script file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Update front-end dependencies
echo "Checking for new front-end dependencies..."

# Install npm globally if it's missing
if ! type "npm" > /dev/null; then
    echo "Please install npm on your system first."
fi

# Update npm dependencies in package.json
npm install

# Update bower components in bower.json
$DIR/node_modules/.bin/bower install

# run gulp with arguments
echo "Running gulp..."
${DIR}/node_modules/.bin/gulp "$@"
