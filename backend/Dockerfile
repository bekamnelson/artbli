# ==========================================
# ÉTAPE 1 : Build de l'application avec Composer
# ==========================================
FROM composer:latest AS builder
WORKDIR /app

COPY . .
RUN composer install --no-dev --optimize-autoloader --no-scripts --ignore-platform-reqs

# ==========================================
# ÉTAPE 2 : Environnement de production (Runtime)
# ==========================================
FROM php:8.4-apache

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd

# 1. Configurer le DocumentRoot vers /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 2. CORRECTION DU 404 : Autoriser le .htaccess de Laravel pour que les routes fonctionnent
RUN echo "<Directory /var/www/html/public>\n\tAllowOverride All\n\tRequire all granted\n</Directory>" >> /etc/apache2/apache2.conf

# 3. CORRECTION RENDER : Forcer Apache à écouter sur le $PORT fourni par Render
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Activer le module de réécriture
RUN a2enmod rewrite

WORKDIR /var/www/html
COPY --from=builder /app .

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod +x deploy.sh

# Lancer le script
CMD ["./deploy.sh"]