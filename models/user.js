const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const userSchema = new Schema({
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profilePictureUrl:{type: String},
        backgroundPictureUrl:{type:String},
        saved: {type:Schema.Types.ObjectId, ref:'Recipes',type:Schema.Types.ObjectId, ref:'Plans', default:[]},
        recipes: [{type:Schema.Types.ObjectId, ref:'Recipes', default:[]}],
        plans: {type:Schema.Types.ObjectId, ref:'Plans', default:[]},
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    });

const User = mongoose.model('User', userSchema);

module.exports = User;