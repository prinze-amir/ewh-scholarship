'use server'
import User from "@/models/userModel";
import connectMongoDB from "@/lib/mongo/mongoosedb";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { getSettings } from "../admin/settings/actions";
import bcrypt from 'bcrypt';

export const resetPassword = async (email, token, newPassword) => {
    await connectMongoDB();
    try {
        console.log(email, token, newPassword, 'email, token, newPassword')
        const user = await User.findOne({email});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        console.log(user, 'updated user')
        return user;
    }
    catch (error) {
        console.log(error.message, 'error')
        return error.message;
    }
}

export const sendResetPasswordEmail = async (email) => {
    await connectMongoDB();
    console.log(email, 'email')
    try {
        const user = await User
            .findOne({ email });
            console.log(user, 'user')
        if (!user) {
            throw new Error("No user found");
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
        console.log(token, 'token')
        user.resetPasswordToken = token;
        await user.save();
        const settings = await getSettings()
        console.log(settings, 'settings')

        const sendEmail = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
                user: settings[0].emailService.username,
                pass: settings[0].emailService.pass,
               
            }
        });
        const message = {
            from: settings[0].emailService.username,
            to: email,
            subject: 'Password Reset',
            html: `<div style="font-size:1.2rem"><p>${user.name}, you are receiving this email because you (or someone else) has requested the reset of a password.</p><p>To reset your password, please click on the link below:</p></div><a href="${process.env.NEXT_PUBLIC_BASE_URL}/password-reset?token=${token}&email=${email}"><button style="padding:10px 15px; border-radius:12px; background:#0cd5d1; color:#fff"></button>Reset Password</button></a>`

        }
        await sendEmail.sendMail(message);

        return token;
    }
    catch (error) {
        console.log(error.message, 'error')
        return {error: error.message};
    }
}