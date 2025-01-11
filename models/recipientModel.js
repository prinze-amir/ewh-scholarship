import mongoose, {Schema, models} from 'mongoose';

const recipientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    graduationYear: {
        type: String,
        required: true
    },
    parents: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    address: new Schema({
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        }
    }),
    profileImage: new Schema({
        src: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: false
        },
    }),
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    },


}, {timestamps: true});

const Recipient = models.Recipient || mongoose.model('Recipient', recipientSchema);

 export default Recipient;