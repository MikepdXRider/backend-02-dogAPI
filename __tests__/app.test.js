const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog.js');

const lolaTheTestDog = {
  name: "Lola",
  age: 6,
  breed: "American Staffordshire Mix.",
  description: "Loving, beautiful doggo! Lola is medium sized with black and white coat. Her coat is mostly black with a white underbelly, accents on her snout, and paws. Lola's favorite activity is frisbee at the park. She loves to chase squirrels.",
  favTreat: "Dry sweet potato/pigs ear."
}

describe('backend-02-dogAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('posts a doggo', async () => {
    const res = await request(app)
      .post('/api/v1/dogs/')
      .send(lolaTheTestDog);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: "Lola",
      age: 6,
      breed: "American Staffordshire Mix.",
      description: "Loving, beautiful doggo! Lola is medium sized with black and white coat. Her coat is mostly black with a white underbelly, accents on her snout, and paws. Lola's favorite activity is frisbee at the park. She loves to chase squirrels.",
      favTreat: "Dry sweet potato/pigs ear.",
      dateCreated: expect.any(String)
    });
  });

  it('gets all doggos', async () => {
    await Dog.insert(lolaTheTestDog);
    await Dog.insert({ ...lolaTheTestDog, name: 'Lolicia' });

    const res = await request(app).get('/api/v1/dogs/');

    const expected = [
      { ...lolaTheTestDog, id: expect.any(String), dateCreated: expect.any(String)},
      { ...lolaTheTestDog, name: 'Lolicia', id: expect.any(String), dateCreated: expect.any(String)}
    ];

    expect(res.body).toEqual(expected);
  });

  it('gets a doggo', async () => {
    const { id } = await Dog.insert(lolaTheTestDog);

    const res = await request(app).get(`/api/v1/dogs/${id}`);

    const expected = { 
      ...lolaTheTestDog, 
      id: expect.any(String), 
      dateCreated: expect.any(String)
    };

    expect(res.body).toEqual(expected);
  });

  it('updates a doggo', async () => {
    const { id } = await Dog.insert(lolaTheTestDog);

    const updatedLola = {...lolaTheTestDog, name: 'Lolicia'}

    await request(app).patch(`/api/v1/dogs/${id}`).send(updatedLola);

    const actual = await Dog.getById(id);

    const expected = { 
      ...lolaTheTestDog, 
      name: 'Lolicia',
      id: expect.any(String), 
      dateCreated: expect.anything()
    };

    expect(actual).toEqual(expected);
  });

  it('deletes a doggo', async () => {
    const { id } = await Dog.insert(lolaTheTestDog);

    await request(app).delete(`/api/v1/dogs/${id}`);

    // Note: You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
      // https://jestjs.io/docs/expect#tothrowerror
    // Note: Because async/await returns a promise jest will not see it's error. We must use the .rejects syntax to catch the expected behavior.
      // https://stackoverflow.com/a/61214808
      // https://jestjs.io/docs/asynchronous
    expect(async () => await Dog.getById(id)).rejects.toThrowError(/dog does not exist/i);
  });
});
