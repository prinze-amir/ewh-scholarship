"use server";
import { getAllRecipients } from "@/lib/mongo/recipients";
import connectToDatabase from "@/lib/mongo/mongoosedb";
import { defaultProfile } from "@/utilities/defaults";
import { uploadGoogleDrive, deletePhoto } from "@/lib/google/googleDriveService";
import bycrypt from "bcrypt";
import User from "@/models/userModel";
import Recipient from "@/models/recipientModel";

export const fetchNextPage = async (page, limit) => {
  const { recipients } = await getAllRecipients(page, limit);
  const allRecipients = JSON.parse(JSON.stringify(recipients));
  return allRecipients;
};
export const deleteUser = async (id) => {
  await connectToDatabase();
  const objectId = { _id: id };

  try {
    const user = await User.findByIdAndDelete(objectId);
    return "user deleted";
  } catch (error) {
    console.log(error.message, "the error");
    return error.message;
  }
};
export const getRecipients = async (page = 0, limit = 6) => {
  await connectToDatabase();
 
  const recipients = await Recipient.find({})
    .skip(page * limit)
    .limit(limit);
  return { recipients};
};

export const getProxyImages = async (image) => {
  if (image === null) return defaultProfile;
  return "/api/proxy?" + image;
};

export const getUsers = async () => {
   await connectToDatabase();
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(error.message, "error");
    return error.message;
  }
};
export const getUser = async (id) => {
  await connectToDatabase();
  const user = await User.findById(id);
  return user;
};

export const updateUser = async (id, formData) => {
    const userId = { _id: id };
    const user = await getUser(id);
 
    if(formData.password) {
          console.log('checking for password')  
        if (formData.password !== formData?.confirmPassword) {
        throw new Error("Passwords do not match");
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(formData.password, salt);
        formData.password = hashedPassword;
    }
    if(formData.removeImage){
        //delete the old image from google drive
        if (user.image?.id) {
          await deletePhoto(user.image.id)
        }
    }

    if (formData.image) {
      //check if profile image is new
      if (typeof formData.image !== 'object') {

        const uploadedImage  = await uploadGoogleDrive(formData.image, formData.name);
        formData.image = uploadedImage;
        console.log(formData.image, 'uploaded image')
        //delete the old image from google drive
        if (user.image?.id) {
          await deletePhoto(user.image.id)
        }
        
      } else if ( formData.image.id === user.image.id) {
        //remove the profileImage from the data object
        delete formData.image;
      } 

    }

   try { 
    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: formData },
        { new: true, runValidators: true }  // Return the updated object and run schema validators
      );
      console.log( updatedUser, 'updated user')
      const resp  = JSON.parse(JSON.stringify(updatedUser));
     return resp
   // return 'user updated successfully'
    } catch (error) {
          console.log(error.message, 'error')
          return error;
    }
  
};
export const addNewUser = async (formData) => {
  try {
    const { name, email, password, confirmPassword, access, image } =
      Object.fromEntries(formData);
    let role;
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (access === "superAdmin") {
      role = { isAdmin: true, isSuperAdmin: true };
    } else {
      role = { isAdmin: true, isSuperAdmin: false };
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    if (image) {
      const uploadedImage = await uploadGoogleDrive(image, name);
      formData.image = uploadedImage;
    }

    await connectToDatabase();
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    console.log(newUser, "new user");
  } catch (error) {
    console.log(error.message, "error");
    return error.message;
  }

};
