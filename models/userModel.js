import mongoose, {Schema, models, model} from 'mongoose';

const roleSchema = new Schema({
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

const imageSchema = new Schema({
    src: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    }

})

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: roleSchema,
    image: imageSchema,

    resetPasswordToken: {
        type: String,
        default: ''
    },


}, {timestamps: true});


const User = models.User || model('User', userSchema);


export default User;