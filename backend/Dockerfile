# ==========================================
# ÉTAPE 1 : Build de l'application avec Composer
# ==========================================
FROM composer:2.7-php8.4 AS builder
WORKDIR /app

# Copier l'ensemble des fichiers du sous-dossier
COPY . .

# Installer les dépendances PHP de production sans exécuter les scripts Laravel immédiatement
RUN composer install --no-dev --optimize-autoloader --no-scripts

# ==========================================
# ÉTAPE 2 : Environnement de production (Runtime)
# ==========================================
FROM php:8.4-apache

# Installer les bibliothèques système et les extensions PHP requises par Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd

# Configurer le DocumentRoot d'Apache vers le dossier /public de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Activer le module de réécriture d'Apache (Requis pour la gestion des routes de Laravel)
RUN a2enmod rewrite

# Définir le répertoire de travail final
WORKDIR /var/www/html

# Copier les fichiers de l'application préparés à l'étape 1
COPY --from=builder /app .

# Attribuer les permissions correctes pour que Laravel puisse écrire dans ses dossiers de stockage/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Rendre le script de déploiement exécutable
RUN chmod +x deploy.sh

# Exposer le port par défaut d'Apache
EXPOSE 80

# Définir le script de déploiement automatique comme point d'entrée
CMD ["./deploy.sh"]