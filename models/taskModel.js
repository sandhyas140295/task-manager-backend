const db = require('../config/database');

const Task = {
  getAll: (search, callback) => {
    const query = search
      ? `SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ?`
      : `SELECT * FROM tasks`;
    const params = search ? [`%${search}%`, `%${search}%`] : [];
    db.all(query, params, callback);
  },

  getById: (id, callback) => {
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], callback);
  },

  create: (task, callback) => {
    const { title, description, due_date, status } = task;
    db.run(
      `INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)`,
      [title, description, due_date, status],
      function (err) {
        callback(err, { id: this.lastID, ...task });
      }
    );
  },

  update: (id, task, callback) => {
    const { title, description, due_date, status } = task;
    db.run(
      `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, description, due_date, status, id],
      function (err) {
        callback(err, { id, ...task });
      }
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], callback);
  },
  
  deleteAll: (callback) => {
    db.run(`DELETE FROM tasks`, callback);
  }


};

module.exports = Task;
