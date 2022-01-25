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
        const { rows } = await pool.query('SELECT * FROM dogs');
        return rows.map(row => new Dog(row));
    }
    static async getById(id){
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id=$1', [id]
        );
        return new Dog(rows[0]);
    }
    static async insert({ name, age, breed, description, favTreat }){
        const { rows } = await pool.query(
            `INSERT INTO dogs(name, age, breed, description, fav_treat) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, age, breed, description, favTreat]
        );
        return new Dog(rows[0]);
    }
    static async updateById(id, dogObj){
        // query the supabase using pool to get a dog
        // don't forget to sanitize.
        const dbRes = await pool.query(
            'SELECT * FROM dogs WHERE id=$1', [id]
            );
        const existingDog = dbRes.rows[0];
        // if the dog doesn't exist, throw an error.
        if (!existingDog){
            const error = new Error('Dog does not exist')
            error.status = 400;
            throw error;
        };
        // with the updated object, query the supabase using pool to update a dog.
        // use the ?? nullish coalesceing operator(dafuq...) to determine wether to update a value or use the existing one.
        const name = dogObj.name ?? existingDog.name; 
        const age = dogObj.age ?? existingDog.age; 
        const breed = dogObj.breed ?? existingDog.breed; 
        const description = dogObj.description ?? existingDog.description; 
        const favTreat = dogObj.favTreat ?? existingDog.fav_treat; 

        const { rows } = await pool.query(
            'UPDATE dogs SET name=$1, age=$2, breed=$3, description=$4, fav_treat=$5 WHERE id=$6 RETURNING *', [name, age, breed, description, favTreat, id]
        )
        // return a new Dog(<returning data>)
        return new Dog(rows[0]);
    }

    static async deleteById(id){
        const { rows } = await pool.query(
            'DELETE FROM dogs WHERE id=$1 RETURNING *', [id]
        )
        return new Dog(rows[0]);
    }
}