#########

RULE : Do not run your local server on ports 4001 - 4005. These ports are already used in unit tests.

##########

1. Run tests:

    => npm run test

RESULT TESTS (screenshot) : https://ibb.co/nmSyHMh

##########

2. RUN IN DEVELOPMENT MODE:

    => npm run start:dev

##########

3. RUN IN PRODUCTION MODE: 

    => npm run start

##########

ROUTES:

1. GET 'http://localhost:4000/api/superheroes?page=1&limit=5' =>  Get superheroes from the first page.

2. GET http://localhost:4000/api/superheroes/superheroId' => Get superhero by id

3. POST http://localhost:4000/api/superheroes/superheroId' => Add new superhero

4. DELETE http://localhost:4000/api/superheroes/superheroId' => Delete superhero by id

5. PUT http://localhost:4000/api/superheroes/superheroId' => Update superhero by id

6. PATCH http://localhost:4000/api/superheroes/superheroId' => Add a new superhero picture

7. DELETE http://localhost:4000/api/superheroes/superheroId/pictureId' => Delete picture from superhero



