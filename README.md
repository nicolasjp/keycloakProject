## Project Keycloak

Le projet vise à créer un prototype utilisant Keycloak et Node.js pour gérer les notes dans une université.

Dans mon projet, j'ai installé le serveur Keycloak en mode test dans un conteneur avec la commande suivante : 
- docker run --name projetKey -p 8082:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=adminpwd quay.io/keycloak/keycloak:latest start-dev

Le royaume Keycloak est présent dans le projet (au format json) sous le nom "realm-export.json".

Le projet se base sur la méthode de contrôle d'accès RBAC. Nous exploiterons les ressources de la documentation de Keycloak. 

L'objectif principal est de mettre en place la politique RBAC, sans se concentrer sur l'esthétique du site ou la création d'une base de données. 

Le livrable inclura un rapport détaillé, les fichiers sources, et une vidéo de démonstration à l'adresse suivante : 
- https://youtu.be/hk8Ez1-QdBA