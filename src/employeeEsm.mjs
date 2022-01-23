let db = [];

export default {

  async insert(data) {
    if (process.env.mode === 'exception') throw new Error('Testing');
    db.push(data);
  },

  async find() {
    return db;
  },

  async removeAll() {
    db = [];
  },
}