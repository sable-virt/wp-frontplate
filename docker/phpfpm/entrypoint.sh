#!/usr/bin/env bash

if [ -d ${COMPOSER_PATH} ]; then
    echo $COMPOSER_PATH
    cd $COMPOSER_PATH
    composer install -o
fi
php-fpm
