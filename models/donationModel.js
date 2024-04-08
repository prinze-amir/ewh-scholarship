import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);