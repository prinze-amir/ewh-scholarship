import mongoose, {Schema, models, model} from "mongoose";

const settingsSchema = new Schema({
    siteName: {
        type: String,
    },
    emailService: new Schema({
        service: {
            type: String,
            required: true,
        },
    
        username: {
            type: String,
            required: true,
        },
        pass: {
            type: String,
            required: true,
        },
    }),
    themeSettings: new Schema({
            accentColor: {
                type: String,
            },
            primaryColor: {
                type: String,
            },
            secondaryColor: {
                type: String,
            },
            tertiaryColor: {
                type: String,
            },
        }),
    

}, {timestamps: true});

const Settings = models.Settings || model("Settings", settingsSchema);

export default Settings;