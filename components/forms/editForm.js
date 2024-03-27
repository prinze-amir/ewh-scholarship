'use client'
import { Select, Stack, Input, Textarea, InputGroup, InputLeftAddon, InputRightAddon, IconButton, InputLeftElement, CircularProgress, Skeleton, Button } from '@chakra-ui/react'
import { states } from '@/utilities/states';
import  {useRouter} from 'next/navigation';
import  Image from 'next/image';
import { formatPhone } from '@/utilities/forms';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import style from '@/app/admin/admin.module.css';

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
        bio: recipient.bio,
        isApproved: recipient.isApproved,
        amountReceived: recipient.amountReceived,
    });
    const [profile, setProfile] = useState(recipient);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

     recipient._id = recipient._id.toString();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ [name]: value });
    };
    const handlePhoneInput = (e) => {
        formatPhone(e);
        const { name, value } = e.target;
        setFormData({ [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/recipients/' + recipient._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(formData);
            setProfile(prev=>({...prev, ...formData}));
            router.refresh();
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
        console.log(profile)

    };
    const imageUrl = recipient.profileImage ? recipient.profileImage.src : "/images/nayla.jpeg";

    return (
        <div className={style.adminContiainer}>
             {!isLoading && <div className={style.recipientView}>
                    <div className={style.info}>
                    <p className="text-3xl">{recipient.name}</p>
                    <p> Parents:  {recipient.parents}</p>
                    <p> {recipient.email}</p>
                    <p> {recipient.phone}</p>
                    {recipient.address && 
                    <>
                    <p> {recipient.address?.street}</p>
                    <p> {recipient.address?.city} {recipient.address?.state} {recipient.address?.zip}</p>
                    </> 
                
                    }
                    <p> {recipient.graduationYear}</p>
                    <p> Attending {recipient.college}</p>
                    <p> Studying {recipient.major}</p>
                    <p> Bio: {recipient.bio}</p>
                    <p>Amount Received: {recipient?.amountReceived}</p>
                    </div>
                    <Image src={imageUrl} height={250} width={250} alt={recipient.name} />
                </div>  }

                {isLoading && 
                <div className="relative">
                    <Skeleton isLoaded={!isLoading} height="30vh" width="700px" borderRadius='10px' startColor="rgb(38, 38, 38)">
                                    
                    </Skeleton>
                    <CircularProgress className={style.spinner} isIndeterminate zIndex={3} size="100px" color="green" 
                display='flex' position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'
                />
                </div>
               }

        <form className="text-white p-5 max-w-screen-sm rounded-lg " onSubmit={handleSubmit}>
            <Stack spacing={3}>
            <InputGroup size='lg' spacing={2} gap='3'>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    placeholder="Name"
                />
                <Input
                    type="text"
                    name="parents"
                    value={formData.parents}
                    onChange={handleInput}
                    placeholder="Parents"
                />
            </InputGroup>
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
            <InputGroup gap='3'>
               
                <Input
                    type="text"
                    name='address.street'
                    value={formData.address?.street}
                    onChange={handleInput}
                    placeholder="Address"
                />
                <Input
                    type="text"
                    name='address.city'
                    value={formData.address?.city}
                    onChange={handleInput}
                    placeholder="City"
                />
            </InputGroup >
            <InputGroup gap='3'>
               
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
        </form>
        </div>
    );
}

export { EditForm}