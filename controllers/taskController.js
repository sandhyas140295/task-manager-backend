const Task = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  const search = req.query.search || '';
  Task.getAll(search, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getTaskById = (req, res) => {
  const { id } = req.params;
  Task.getById(id, (err, task) => {
    if (err || !task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });
};

exports.createTask = (req, res) => {
  Task.create(req.body, (err, task) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(task);
  });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  Task.update(id, req.body, (err, task) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(task);
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  Task.delete(id, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Task deleted successfully' });
  });

};

  exports.deleteAllTasks = (req, res) => {
    Task.deleteAll((err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'All tasks deleted successfully' });
    });
  };
  

