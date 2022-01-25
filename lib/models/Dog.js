const pool = require('./../utils/pool')

module.exports = class Dog {
    id; 
    name;
    age; 
    breed;
    description;
    favTreat;
    dateCreated;

    constructor(row){
        this.id = row.id;
        this.name = row.name;
        this.age = row.age;
        this.breed = row.breed;
        this.description = row.description;
        this.favTreat = row.fav_treat;
        this.dateCreated = row.date_created;
    }

    static async getAll(){
        const { rows } = await pool.query('SELECT * FROM dogs')
        return rows.map(row => new Dog(row));
    }
    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id=$1', [id]
        )
        return new Dog(rows[0]);
    }
    static async insert({ name, age, breed, description, favTreat }){
        const { rows } = await pool.query(
            `INSERT INTO dogs(name, age, breed, description, fav_treat) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, age, breed, description, favTreat]
        )
        
        return new Dog(rows[0]);
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