'use client'
import { Select, Stack, Input, Textarea, InputGroup, FormLabel, InputLeftElement, CircularProgress, Skeleton, Button } from '@chakra-ui/react'
import { states } from '@/utilities/states';
import  {useRouter} from 'next/navigation';
import  Image from 'next/image';
import { formatPhone } from '@/utilities/forms';
import {convertHeicToJpg} from '@/lib/heicConversion'

import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { BiDollar } from "react-icons/bi";
import { useState } from 'react';
import CustomSwitch from '@/components/Buttons/switchButton';
import style from '@/app/admin/admin.module.css';
import RecipientCard from '../Cards/recipientCard';

const EditForm = ({ recipient }) => {
    const [formData, setFormData] = useState({
        name: recipient.name,
        parents: recipient.parents,
        email: recipient.email,
        phone: recipient.phone,
        address: {
            street: recipient?.address?.street,
            city: recipient?.address?.city,
            state: recipient?.address?.state,
            zip: recipient?.address?.zip,
        },
        graduationYear: recipient.graduationYear,
        major: recipient.major,
        college: recipient.college,
        profileImage: recipient?.profileImage,
        bio: recipient.bio,
        isApproved: recipient.isApproved,
        amountReceived: recipient.amountReceived,
    });
    const [profile, setProfile] = useState(recipient);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(recipient.profileImage?.src);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const date = new Date();
    const startYear = 1980;
    const year = date.getFullYear();
    
    recipient._id = recipient._id.toString();

    const handleInput = (e) => {
        const { name, value } = e.target;
        
        setFormData(pre=>{

            if(name.startsWith('address.')) {
                return {
                    ...pre,
                    address: {
                        ...pre.address,
                        [name.split('.')[1]]: value
                    }
                }
            }

            return {
                ...pre,
                [name]: value
            }
        });
    };
    const handleToggle = (e) => {
        const { name } = e.target;
        const value = e.target.checked;
        console.log(name, value)
        
        setFormData(pre=>{

            return {
                ...pre,
                [name]: value
            }
        });
    };
    const handlePhoneInput = (e) => {
        formatPhone(e);
        const { name, value } = e.target;
        setFormData(prev=>{ 
            return {
                ...prev,
                [name]: value
             }
            }
        );
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
    
        if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
    
          try {
            const convertedBlob = await convertHeicToJpg(file)
    
            // Generate a URL for the converted file
            const reader = new FileReader();
    
            reader.onloadend = () => {
              // Set the generated URL for preview
              setImagePreviewUrl(reader.result);
              //set image to form data

              setFormData((prev)=>{ 
                    return {
                    ...prev, profileImage: reader.result 
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
                ...prev, profileImage: reader.result 
                }
            });
          };
    
          reader.readAsDataURL(file);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            const response = await fetch(`/api/recipients/${recipient._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response, 'response')
            if (!response.ok) {
                throw new Error('Failed to update recipient');
            }
            const data = await response.json();
            console.log(data, 'data')
            console.log(formData, 'form data');
            setProfile(prev=>({...prev, ...formData}));
            router.refresh();
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setIsLoading(false);
        console.log(profile, 'profile')

    };
    const imageUrl = recipient.profileImage ? recipient.profileImage.src : "/images/nayla.jpeg";

    return (
        <div className={style.editContainer}>
             {!isLoading && <RecipientCard recipient={recipient} style={style} icons={{email:EmailIcon,phone:PhoneIcon}} />}


                {isLoading && 
                <div className="relative">
                    <Skeleton isLoaded={!isLoading} height="30vh" width="700px" borderRadius='10px' startColor="rgb(38, 38, 38)">
                                    
                    </Skeleton>
                    <CircularProgress className={style.spinner} isIndeterminate zIndex={3} size="100px" color="green" 
                display='flex' position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'
                />
                </div>
               }
               {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="text-white p-5 max-w-screen-sm w-[100%] rounded-lg border shadow-lg self-center" onSubmit={handleSubmit}>
            <Stack spacing={3}>
            <label htmlFor="amountReceived" className="text-white font-medium">Amount Received</label>

                <InputGroup spacing={3} gap='3'>
                        <InputLeftElement>
                            <BiDollar />
                        </InputLeftElement>

                        <Input  
                        type="number"
                        name="amountReceived"
                        value={formData.amountReceived}
                        onChange={handleInput}
                        placeholder="Amount Received"
                        />
                <FormLabel htmlFor="isApproved" className="text-white font-medium">Approved</FormLabel>
                <CustomSwitch
                    name="isApproved"
                    onChange={handleToggle}
                    isChecked={formData.isApproved}
                /> 
                </InputGroup>
                <InputGroup size='lg' spacing={2} gap='3'>
                <div className="w-[50%]">
                    <FormLabel htmlFor="name" className="text-white font-medium">Name</FormLabel>
                    <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    placeholder="Name"
                />
                </div>
                <div className="w-[50%]">
                    <FormLabel htmlFor="parents" className="text-white font-medium">Parents</FormLabel>
                     <Input
                    type="text"
                    name="parents"
                    value={formData.parents}
                    onChange={handleInput}
                    placeholder="Parents"
                />
                </div>
               
                </InputGroup>
            <Stack spacing={3} direction={['column', 'row']}>
            <InputGroup>
               
                <InputLeftElement >
                    <EmailIcon />
                </InputLeftElement>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    placeholder="Email"
                />
            </InputGroup>
            <InputGroup>

                <InputLeftElement >
                <PhoneIcon color='gray.300' />
                </InputLeftElement>
                <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    placeholder="Phone"
                    maxLength='14'
                    pattern="\(\d{3}\) \d{3}-\d{4}"
                />
            </InputGroup>
               </Stack>
               

            <label className="font-medium">Address</label>
            <InputGroup gap='3'>
                <Input
                    type="text"
                    name='address.street'
                    value={formData.address?.street}
                    onChange={handleInput}
                    placeholder="Address"
                />
                
            </InputGroup >
            <InputGroup gap='3'>
            <Input
                    type="text"
                    name='address.city'
                    value={formData.address?.city}
                    onChange={handleInput}
                    placeholder="City"
                />
                <Select
                    name="address.state"
                    value={formData.address?.state}
                    onChange={handleInput}
                    placeholder="State"
                >
                    {states.map((state) => (
                        <option key={state.value} value={state.value}>
                            {state.label}
                        </option>
                    ))}
                </Select>;
                <Input
                    type="number"
                    name="address.zip"
                    value={formData.address?.zip}
                    onChange={handleInput}
                    placeholder="ZipCode"
                />
            </InputGroup>
               
             
               
               
            <InputGroup gap='4'>
                <div className="w-[50%]">
                    <FormLabel htmlFor="graduationYear" className="text-white">Graduation Year</FormLabel>
                <Select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInput}
                    placeholder={year}
                >
                   {
                        Array.from(new Array(50), (val, index) => index + startYear).map((year) => {
                            return (
                            <option key={year} value={year}>{year}</option>
                            )
                        })
                    }
                </Select>
                </div>

                <div className="w-[50%]">
                <FormLabel htmlFor="major" className="text-white">Major</FormLabel>

                  <Input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInput}
                    placeholder="Major"
                />
                </div>
            </InputGroup>
            <label htmlFor="college" className="text-white">College</label>
            <Input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInput}
                    placeholder="College"
                />
                {imagePreviewUrl && (
                <div className="w-full px-3 mb-6">
                 
                  <Image id="image-preview" alt="Profile-Image-Preview"  width={250} height={250} src={imagePreviewUrl} />
                </div>
                )}
                <label htmlFor="profileImage" className="text-white">Profile Image</label>
            <Input
                    type="file"
                    name="profileImage"
                    onChange={handleImageChange}
                    placeholder="Upload Image"
                />
                <label htmlFor="bio" className="text-white">Bio</label>
            <InputGroup>
                <Textarea
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInput}
                    placeholder="Bio"
                />
            </InputGroup>
            <Button id={recipient._id} isLoading={isLoading} type="submit" bgColor="#2fd6b9" color="white" _hover={{color:'#333', backgroundColor:'white'}} >UPDATE</Button>
            </Stack>
            {error && <p className="text-red-500 text-center">{error}</p>}

        </form>
        </div>
    );
}

export { EditForm}