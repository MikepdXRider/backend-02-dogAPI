# DOG API

## MVP
### Goals/Inspiration:
    - Placekitten/placemurry for ACL dogs/pets.
    - Offer a reliable API that can be used and contributed to by the ACL community.

### Data Shape:
```js
const obj = {
    id: expect.any(string) // Will be generated by DB.
    name: expect.any(string),
    age: expect.any(number),
    breed: expect.any(string),
    dateCreated: expect.any(string) //Could be num?
    description: expect.any(string)
    favTreat: expect.any(string) //STRETCH!
    img: expect.any(string), //STRETCH: Have front end form hooked up with cloudinary to offer a url that can be saved in the DB.
    favToys: expect.arrayContaining() //STRETCH!
}
```
### App.js routes
```js
app.use('/api/v1/dogs/', require('path to controller'));
```
### dogs.js controller
```js
const Router = require('express');
// import model

module.exports = Router()
    .post('/', async (req, res, next) => {
        const dog = await model.insert({...req.body});
        res.send(dogs);
    })
    .get('/', async (req, res, next) => {
        const dogs = await model.getAll();
        res.send(dogs);
    })
    .get('/:id', async (req, res, next) => {
        const { id } = req.params;
        const dog = await model.getById(id)
    })
    .patch('/:id', async (req, res, next) => {
        const { id } = req.params;
        const dog = await model.update(id, {...req.body})
        res.send(dogs);
    })
    .delete('/:id', async (req, res, next) => {
        const { id } = req.params;
        const dog = await model.update(id, {...req.body});
        res.send(dogs);
    })
```
### dogs model
```js
// import pool

module.export = new Class Dog {
    id; 
    name;
    age; 
    breed;
    dateCreated;
    description;
    img;
    favTreat;

    constructor(row){
        this.id = row.id;
        this.name = row.name;
        this.age = row.age;
        this.breed = row.breed;
        this.dateCreated = row.date_created;
        this.description = row.description;
        this.img = row.img;
        this.favTreat = row.favTreat;
    }

    static async getAll(){
        // query the supabase using pool to request all dogs
        // return a new Dog(<returning data>)
    }
    static async getAllById(id){
        // query the supabase using pool to request a dog with a matching id
        // don't forget to sanitize.
        // return a new Dog(<returning data>)
    }
    static async insert(){
        // query the supabase using pool to post a dog
        // don't forget to sanitize.
        // return a new Dog(<returning data>)
    }
    static async update(id, dogObj){
        // query the supabase using pool to get a dog
        // don't forget to sanitize.
        // if the dog doesn't exist, throw an error.
        // use the ?? nullish coalesceing operator(dafuq...) to determine wether to update a value or use the existing one.
        // with the updated object, query the supabase using pool to update a dog.
        // return a new Dog(<returning data>)
    }
    static async deleteById(id){
    // query the supabase using pool to delete a dog with a matching id
    // don't forget to sanitize.
    // return a new Dog(<returning data>)
    }
}
```

### STRETCH:
- General:
    - Needs to oncludes a boolean.
    - Needs to offer various data types for rendering, munging, and querying.
    - Needs to be robust so that students with styling goals have sufficient material to work with per animal(think list vs detail views).
    - Includes a category for pet type. That's right, dogAPI is rebranding to petAPI! 🚀
- Routes:
    - All get routes will be updated to return an array of toys per dog. 
    - getRandom dog object
    - getRandom dog image
    - Query dogs by breed
    - Query dogs by name
- Tables:
    - Toys:
        - id
        - dog_id
        - toy_name


<hr>


Demo[](https://alchemycodelab.github.io/backend-anyapi/#demo)
-------------------------------------------------------------

[https://alchemy-backend-anyapi.herokuapp.com](https://alchemy-backend-anyapi.herokuapp.com/)

### Learning Objectives[](https://alchemycodelab.github.io/backend-anyapi/#learning-objectives)

-   Create and deploy a POST endpoint that creates a resource and responds created object
-   Create and deploy a GET endpoint that returns an array of objects
-   Create and deploy a GET endpoint that returns a single matching object based on the id in the path and req.params.id
-   Create and deploy a PUT/PATCH endpoint that updates a resource with the matching id and responds the updated object
-   Create and deploy a DELETE endpoint that deletes a resource with the matching id and responds the deleted object
-   Add JSON deserialization middleware and use the body in a route
-   Use params to simplify the extraction of "id" from a router
-   Utilize Router to implement a horizontally scalable Express App architecture
-   Use the pg library with $1, $2, $3 syntax to sanitize our SQL queries to prevent SQL injection.
-   Use pg to make queries against a Postgres DB
-   Connect to a Postgres DB using the pg node module
-   Deploy an API to Heroku

### Description[](https://alchemycodelab.github.io/backend-anyapi/#description)

Your task is to create an API with full CRUD capabilities and deploy it to Heroku. Choose what type of data your API will manage (e.g. animals, plants, songs, games, etc.) and build out the corresponding controller, model, and tests.

NOTE: When deploying to Heroku, make sure to:

-   Add the Heroku Postgres add-on
-   Set the `PGSSLMODE` env var to `required`
-   Run `npm run setup-heroku` locally or `npm run setup-db` from your Heroku app -> More -> Run console

### Acceptance Criteria[](https://alchemycodelab.github.io/backend-anyapi/#acceptance-criteria)

-   A controller exists with routes for GET, POST, PUT/PATCH, and DELETE requests
-   A model exists with methods for inserting a row, listing all rows, getting a single row, updating a row, and deleting a row
-   Routes defined in the controller follow REST conventions
    -   See [here](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/) and [here](https://restfulapi.net/resource-naming/) for examples
-   `setup.sql` includes the necessary SQL to recreate your table
-   `app.test.js` includes a test for every route

### Rubric[](https://alchemycodelab.github.io/backend-anyapi/#rubric)

| Task | Points |
| --- | --- |
| Controller with all CRUD routes | 4 |
| Model with all required methods | 4 |
| Tests for each route | 4 |
| API is deployed to Heroku | 4 |
| API routes are RESTful | 2 |
| Filenames follow the documented conventions | 2 |


<hr>

