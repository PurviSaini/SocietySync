const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default:"Uploaded"
    },
    assignedTo: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;