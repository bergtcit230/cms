const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema(
    {
        maxContactId:{ type: Number, required: true},
        maxDocumentId:{ type: Number, required: true},
        maxMessageId:{ type: Number, required: true},
    }
);

module.exports = mongoose.model('Sequence', sequenceSchema);