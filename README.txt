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

    - Instalar dependencias
        + DotENV (Variables de entorno)
            $ npm i dotenv
        + Joi (Vaidador de Schema)
            $ npm i joi
        + Comenzar a crear microservices
            $ npm i --save @nestjs/microservices
        + NATS (Transporter)
            $ npm i --save nats
        + Validation (Validar la data)
            $ npm i --save class-validator class-transformer
        + Prisma (ORM)
            $ npm install prisma --save-dev (No support for Prisma ORM v7)
            $ npm install prisma@6.19 --save-dev
        + Prisma Client
            $ npm install @prisma/client (No support for Prisma ORM v7)
            $ npm install @prisma/client@6.19

    - Prisma CLI
        + Create initial setup
            $ npx prisma init --datasource-provider mongodb
            $ npx prisma init --datasource-provider mongodb --output ../generated/prisma
        + Introspect your DB (Crea o actualiza los modelos) [Optional]
            $ npx prisma db pull
        + Generate the types and Client (MongoDB no usa migraciones)
            $ npx prisma generate
        + Push the changes to your DB [Optional]
            $ npx prisma db push

    - NestJS CLI
        + Crear un nuevo resource (Sin archivos de test)
            $ nest g res auth --no-spec
                > ? What transport layer do you use? Microservice (non-HTTP)   // MS
                > ? Would you like to generate CRUD entry points? (Y/n) n
    
    - MongoDB (URL: https://www.mongodb.com/)
        + Sign In/Sign Up
        + Create a new Cluster (Click '+ Create')
            > M0 | FREE
            > Name: Ax2CDev
            Click 'Create Deployment'
        + Connection String (Click 'Connect' > 'Drivers' > Copy 'Connection String')
        + Connection with MongoDB Compass (Click 'Connect' > ddd > Copy the 'Connetion String' and use it on MongoDB Compass)
