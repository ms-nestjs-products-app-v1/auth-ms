AUTH MICROSERVICE (Prisma with MongoDB & JWT)

* Inicializr el microservice
    - GitHub
        + Create new organization (Click "+ v" | "New organization" > Free | Click "Create a free organization")
            > organization name: {{ORGANIZATION_NAME}}
            > contact email: {{CONTACT_EMAIL}}
            > [true] My personal account
            > [true] I hereby accept Terms of Service....
            Click "Next" | 
            Click "Complete setup" | "Skip this step"
        + Create new repository (Click "New")
            > {{OWNER_MS_NAME}}/auth-ms
            > Description: {{REPO_DESCRIPTION}}
            > Public

    -  Crear la app
        $ nest new auth-ms
            > ? Which package manager would you ❤️  to use? npm
        $ cd auth-ms
        $ npm run start         // Run development
        $ npm run start:dev     // Run watch mode