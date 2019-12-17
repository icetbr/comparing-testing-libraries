let db = [];

module.exports = {

  async insert(data) {
    // throw new Error('Testing');
    db.push(data);
  },

  async find() {
    return db;
  },

  async removeAll() {
    db = [];
  },
}