FROM php:7-fpm
RUN requirements="libmcrypt-dev g++ libicu-dev libmcrypt4 libicu52 libfreetype6-dev libjpeg-dev libjpeg62-turbo-dev libpng12-dev libmcrypt-dev zlib1g-dev" \
   && apt-get update && apt-get install -y $requirements \
   && docker-php-ext-configure gd \
        --with-freetype-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ \
        --with-png-dir=/usr/include/ \
   && docker-php-ext-install zip pdo_mysql mysqli mcrypt mbstring intl gd iconv opcache \
   && requirementsToRemove="libmcrypt-dev g++ libicu-dev" \
   && apt-get purge --auto-remove -y $requirementsToRemove \
   && rm -rf /var/lib/apt/lists/*

COPY php-fpm.conf /usr/local/etc/php-fpm.d/php-fpm.conf

RUN curl -sSL https://getcomposer.org/installer | php \
   && mv composer.phar /usr/local/bin/composer

RUN usermod -u 1000 www-data
CMD ["php-fpm"]