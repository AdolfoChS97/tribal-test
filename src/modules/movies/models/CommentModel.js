const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    
    title: {
        type: String,
        required: true,
    }, 
    comment: [{
        text: {
            type: String,
            required: true,
        },
        by: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    }],
    
});

module.exports = Comment;