#!/bin/bash

# path to this script file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# install all project dependencies
npm install

# install bower components
$DIR/node_modules/.bin/bower install
