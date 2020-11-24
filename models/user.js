const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const userSchema = new Schema({
        
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profilePictureUrl:{type: String,default:""},
        backgroundPictureUrl:{type:String,default:""},
        saved: [{type:Schema.Types.ObjectId, ref:'Recipe'}],
        liked: [{type:Schema.Types.ObjectId, ref:'Recipe'}],
        recipes: {type:Schema.Types.ObjectId, ref:'Recipe'},
        plans: {type:Schema.Types.ObjectId, ref:'Plans'},
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    });

const User = mongoose.model('User', userSchema);

module.exports = User;