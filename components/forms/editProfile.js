'use client'
import { useState, useEffect } from 'react';
 import { Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { accentColor } from '@/utilities/theme';
import  Image  from 'next/image';
import heic2any from '@/lib/heicConversion'
import { updateUser } from '@/app/actions';

export const EditProfile = ({user, onClose, handleEdit}) =>{

    const [color, setColor] = useState();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        removeImage: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(user.image?.src);
    const isSuperAdmin = user.role.isSuperAdmin;
    const {data: session} = useSession();
    const isCurrentUserSuperAdmin = session?.user.role.isSuperAdmin;
    const router = useRouter();

    useEffect(() =>{
        setColor(accentColor);

    },[]);

    const handleInput = (e) => {
        const {name, value} = e.target;

        setFormData(prev=>{

            if (name === 'role') {
                if (value === 'superAdmin'){
                    return {...prev, role: {
                        isAdmin: true,
                        isSuperAdmin: true
                    }}
                } else
                return {...prev, role: {
                    isAdmin: true,
                    isSuperAdmin: false
                }}
            }
            
                    
           return {...prev, [name]: value}
        }
    );
        console.log(formData, 'form data on change')
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
    
        if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
    
          try {
            const convertedBlob = await heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.8 // Adjust quality as needed
            });
    
            // Generate a URL for the converted file
            const reader = new FileReader();
    
            reader.onloadend = () => {
              // Set the generated URL for preview
              setImagePreviewUrl(reader.result);
              //set image to form data

              setFormData((prev)=>{ 
                    return {
                    ...prev, image: reader.result 
                    }
                });
            };
      
            reader.readAsDataURL(convertedBlob);        
          } catch (error) {
            console.error('Error converting HEIC to JPEG', error);
            alert('Failed to convert image format. Please select a different file.');
          }} else {
          // Generate a URL for the file
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // Set the generated URL for preview
            setImagePreviewUrl(reader.result);
            //set image to form data
            setFormData((prev)=>{ 
                return {
                ...prev, image: reader.result 
                }
            });
          };
    
          reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateUser(user._id, formData);
            console.log(updatedUser, 'updated user')
            if (session.user.id !== user._id) {
                handleEdit(e, updatedUser); 
                onClose();
            }
            setLoading(false);  
  
            } catch(e){
                setError(e.message);
                console.log(e.message, 'error occured')
            }
    }
    const removeImage = () => {
        setImagePreviewUrl(null);
        setFormData((prev)=>{ 
            return {
            ...prev, image: null, removeImage: true 
            }
        });
    }
    const accessSettings = (
        <>
        <label htmlFor="role">Access</label>
                <select className="border p-2 rounded-lg" name="role" id="role" value={formData.role.isSuperAdmin ? 'superAdmin':'admin'} onChange={handleInput}>
                    <option value={"admin"}>Admin</option>
                    <option value="superAdmin">Super Admin</option>
                </select>
        </>
    )
    const showAccess = isCurrentUserSuperAdmin & session?.user.id !== user._id ? accessSettings : null;

    return (
        <div className="bg-white rounded-lg p-4 w-[400px] max-w-full">
            <h1 className="text-2xl">Edit Profile</h1>
            <p className="text-red-500">{error ? error: ''}</p>
            <form onSubmit={handleSubmit}  data={formData} className=" flex flex-col m-2 rounded-lg gap-2 justify-center bg-white p-4 w-[350px] max-w-full">
            {imagePreviewUrl && (
                <div className="w-full px-3 mb-6">
                 
                  <Image id="image-preview" alt="Profile-Image-Preview"  width={250} height={250} src={imagePreviewUrl} />
                  <button className="p-2 w-fit border rounded-lg shadow-md my-2 hover:bg-slate-200" onClick={removeImage}>Remove</button>
                </div>
                )}
                <label htmlFor="image" className="text-lg">Profile Image</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    placeholder="Upload Image"
                />
                <label htmlFor="name">Name</label>
                <input className="border p-2 rounded-lg" type="text" name="name" autoComplete="name" id="name" value={formData.name} onChange={handleInput}  />
                <label htmlFor="email">Email</label>
                <input className="border p-2 rounded-lg" type="email" name="email"  id="email" autoComplete="username" onChange={handleInput} value={formData.email} />
                <label htmlFor="password">Change Password</label>
                <input className="border p-2 rounded-lg" onChange={handleInput} type="password" autoComplete="new-password" name="password" id="password" placeholder='enter new password'  />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className="border p-2 rounded-lg" onChange={handleInput} type="password" autoComplete="new-password" name="confirmPassword" id="confirmPassword"  />
                {showAccess}
                <Button bgColor={color} color='white' width='fit-content' isLoading={loading} shadow='lg' _hover={{background:'white',color:'#333'}} type="submit">Add New User</Button>
            </form>
        </div>
    )
}