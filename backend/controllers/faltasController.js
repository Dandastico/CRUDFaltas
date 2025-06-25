const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const faltas = await db('faltas').select('*');
    res.json(faltas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const falta = await db('faltas').where({ id: req.params.id }).first();
    if (!falta) return res.status(404).json({ error: 'Record not found' });
    res.json(falta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const [id] = await db('faltas').insert(req.body);
    const newRecord = await db('faltas').where({ id }).first();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await db('faltas')
      .where({ id: req.params.id })
      .update(req.body);
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    const updatedRecord = await db('faltas').where({ id: req.params.id }).first();
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await db('faltas').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};