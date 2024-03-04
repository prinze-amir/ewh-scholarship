// lib/googleDriveService.js
import { google } from 'googleapis';
import path from 'path';
import { Readable } from 'stream';

//import { readFileSync } from 'fs';

const googleFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

// console.log(credentials, 'credentials')
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../../../../lib/google/ewhKey.json'), // Ensure this path is correct
    scopes: ['https://www.googleapis.com/auth/drive'],
  });


const driveService = google.drive({ version: 'v3', auth });

const uploadGoogleDrive = async (file, name) => {

    const imageBuffer = Buffer.from(file.split('base64,')[1], 'base64');
    const imageStream = bufferToStream(imageBuffer);  

    const fileMetadata = {
        name: `${name}-profile-image`,
        parents: [googleFolderId],
    };

    const media = {
        mimeType: 'image/jpeg',
        body: imageStream,
    };

    const {data} = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
    });

    await driveService.permissions.create({
        fileId: data.id,
        requestBody: {
        type: 'anyone',
        role: 'reader',
        },
    });

    const imageUrl = `https://drive.google.com/uc?export=view&id=${data.id}`;

    return imageUrl

};

function bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // End of the stream
    return stream;
  }
  
  

export { driveService, googleFolderId , uploadGoogleDrive };
