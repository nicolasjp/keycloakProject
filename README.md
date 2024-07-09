# Nicolas JACOB PERES' Keycloak project 🔐

## Description 
The project aims to create a prototype using Keycloak and Node.js to manage grades at a university. 
The project is based on the RBAC access control method. We will exploit the resources of the Keycloak documentation.
The main objective is to implement the RBAC policy, without concentrating on the aesthetics of the site or the creation of a database.\
You're free to re-use my code to improve my Keycloak project and enable it to be used via a website.

## Features 👀
Here is the functionnality of my keycloak project :
- You can log in under several different roles :
    - Student
    - Teacher
    - Teaching units manager
    - TD instructor of a teaching units
- View notes, add notes or validate them, depending on the user's rights.

## How to re-use
- In my project, I installed the Keycloak server in test mode in a container with the following command : 
    - docker run --name projetKey -p 8082:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=adminpwd quay.io/keycloak/keycloak:latest start-dev
- The Keycloak realm is present in the project (in json format) under the name "realm-export.json".
- The deliverable will include a detailed report, source files and a demonstration video at the following address: 
    - https://youtu.be/hk8Ez1-QdBA

## Credits 🤝
If you reuse my code again, please credit me.\
My github profile : https://github.com/nicolasjp. \
My portfolio : https://nicolasjp.github.io/Portfolio/.