#!/bin/sh

# Optimisation des caches de Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Exécution des migrations automatiquement (le --force est requis en production)
php artisan migrate --force

# Lancement d'Apache au premier plan (garde le conteneur en vie)
apache2-foreground