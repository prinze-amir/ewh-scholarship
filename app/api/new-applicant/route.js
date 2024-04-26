import { newApplicant } from "@/lib/mongo/recipients";
import {
  driveService,
  googleFolderId,
  uploadGoogleDrive,
} from "@/lib/google/googleDriveService";
import { getSettings } from "@/app/admin/settings/actions";
import connectMongoDB from "@/lib/mongo/mongoosedb";
import Recipient from "@/models/recipientModel";
import nodemailer from "nodemailer";
import { getUsers } from "@/app/actions";

export async function POST(request) {
  try {
    const applicant = await request.json();
    const emailImage = applicant.profileImage;
    if (applicant.profileImage !== "") {
      const uploadedImage = await uploadGoogleDrive(
        applicant.profileImage,
        applicant.name
      );
      // Replace the base64 image data with the URL from Google Drive
      applicant.profileImage = uploadedImage;
    } else {
      delete applicant.profileImage;
    }

    console.log(applicant, "the applicant");

    // Insert the new recipient into the database
    //  const result = await newApplicant(applicant);
    await connectMongoDB();
    await Recipient.create(applicant);

    // Send an email to the admin
    await newApplicantEmail(applicant, emailImage);

    // Send a response back to the client
    return Response.json({ message: "Applicant added successfully", result });
  } catch (error) {
    console.log(error.message, "error")
    return Response.json({ message: "Failed to add new applicant" });
  }
}

const newApplicantEmail = async (applicant, image) => {
  try {
    const settings = await getSettings();
    const Admins = await getUsers();
     const emails = Admins.map((admin) => admin.email);

    const sendEmail = nodemailer.createTransport({
      host: settings[0].emailService.host,
      port: 465,
      secure: true,
      service: settings[0].emailService.service,
      auth: {
        user: settings[0].emailService.username,
        pass: settings[0].emailService.pass,
      },
    });
    const message = {
      from: settings[0].emailService.username,
      to: emails,
      subject: `New Applicant - ${applicant.name}`,
      html: `<div style="margin:auto;font-size:1.5em;padding:20px;text-align:center"><h1 style="text-transform:capitalize;text-align:center;color:#2da7a9">You have received a new applicant.</h1><div style="margin:10px 0"><img  style="border-radius:25px" src='${image}'  width="120px" /></div><h2>${applicant.name}</h2><p> Graduated/Graduating in ${applicant.graduationYear}<p></p>Plan to attend ${applicant.college}</p> <p>Login to view full application.</p><a href="${process.env.baseURI}/admin?filter=pending" target="_blank"><button style="padding:9px 16px; font-size:1.5em; border-radius:18px; border:none;background:#2fd6b9;color:#fff">View New Applicants</button></a></div>`,
    };
    await sendEmail.sendMail(message);
  } catch (error) {
    console.log(error.message);
  }
};
