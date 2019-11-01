const mongoose = require('mongoose');

/*Define la estructura del esquema*/
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema)