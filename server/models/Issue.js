const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = require('bluebird');

const issueSchema = new Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String },
    status_text: { type: String },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date, default: Date.now },
    open: { type: Boolean, default: true }
});

module.exports = mongoose.model('Issue', issueSchema);
