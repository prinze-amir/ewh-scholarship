'use server'
import Settings from "@/models/settingsModel";
import connectMongoDB from "@/lib/mongo/mongoosedb";

export const getSettings = async () => {
    await connectMongoDB();
    try {
         const settings = await Settings.find({});
          return settings;
    } catch (error) {
        console.log(error.message, 'error')
        return error.message;
    }
}

export const updateSettings = async (data, setting='') => {
    await connectMongoDB();

    try {
        console.log(data, 'data')
         const updatedSettings = await Settings.findOneAndUpdate({}, {$set: data}, { new: true, runValidators: true });

         console.log(updatedSettings, 'updated settings')
         const settings = JSON.parse(JSON.stringify(updatedSettings));
         return settings;
    } catch (error) {
        console.log(error.message, 'error')
        return error.message;
    }
}
