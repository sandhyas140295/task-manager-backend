const { body, validationResult } = require('express-validator');

exports.validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('due_date').optional().isISO8601().toDate(),
  body('status').optional().isIn(['Pending', 'Completed', 'In Progress']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
