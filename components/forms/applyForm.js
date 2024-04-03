'use client'
import {useState} from 'react';
import Image from 'next/image';
import style from '@/components/forms/forms.module.css';
import { useRouter } from 'next/navigation'
import { Skeleton, Button, CircularProgress } from '@chakra-ui/react'
import { formatPhone } from '@/utilities/forms';

const ApplyForm = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const date = new Date();
  const startYear = 1980;
  const year = date.getFullYear();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/new-applicant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: e.target['name'].value,
          parents: e.target['parents'].value,
          email: e.target['email'].value,
          phone: e.target['phone'].value,
          address: {
            street: e.target['addressStreet'].value,
            city: e.target['addressCity'].value,
            state: e.target['addressState'].value,
            zip: e.target['addressZip'].value
          },
          graduationYear: e.target['year'].value,
          major: e.target['major'].value,
          college: e.target['school'].value,
          profileImage: imagePreviewUrl,
          bio: e.target['bio'].value,
          date: date,
          isApproved: false
        })
      });
  
      const result = await response.json();
      
      console.log('form submitted', result);

    } catch (error) {
      console.error('Failed to submit form', error);
      setLoading(false);
    }
      
    router.push('/recipients');
    
  }

  const testForm = () => {
      document.getElementById('name').value = 'Amir Arnett';
      document.getElementById('parents').value = 'Donna and Derrick';
      document.getElementById('email').value = 'amir@yahoo.com';
      document.getElementById('phone').value = '(404) 555-5555';
      document.getElementById('addressStreet').value = '1234 Elm St';
      document.getElementById('addressCity').value = 'Atlanta';
      document.getElementById('addressState').value = 'GA';
      document.getElementById('addressZip').value = '30303';
      document.getElementById('year').value = '2023';
      document.getElementById('major').value = 'Business';
      document.getElementById('school').value = 'Georgia State University';
      document.getElementById('bio').value = 'I am a very smart and hard working'
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
      };

      reader.readAsDataURL(file);
    }
};

  if (loading) {
      return (
        <div className={style.skeletonContainer}>
        <CircularProgress isIndeterminate color='green.300' size="150px" className={style.spinning} />

        <Skeleton isLoaded={!loading} height="50vh" width="70vw">

        </Skeleton>

        </div>
                  

        
      )
  }


    return (
      <div  className={style.formContainer}>
        <button onClick={testForm} className="bg-orange-700 p-3">Test Button</button>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight text-gray-700 focus:outline-none focus:bg-white" id="name" type="text"  required placeholder="full name"/>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="parents">
                Parents Name
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-gray-200  text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required id="parents" type="text" placeholder="parents"/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight text-gray-700 focus:outline-none focus:bg-white" id="email" type="email" required placeholder="email"/>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none text-gray-700 focus:bg-white focus:border-gray-500" id="phone"  maxLength={14} onChange={formatPhone} pattern="\(\d{3}\) \d{3}-\d{4}" type="tel" required placeholder="phone"/>
            </div>
            <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="addressStreet">
                      Address
                  </label>
                  <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none text-gray-700 focus:bg-white focus:border-gray-500" id="addressStreet" type="text" required placeholder="Street Address"/>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="addressCity">
                City
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight text-gray-700 focus:outline-none focus:bg-white" id="addressCity" type="text" required placeholder="City"/>
            </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="addressState">
                State
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight text-gray-700 focus:outline-none focus:bg-white" id="addressState" type="text" required placeholder="State"/>
            </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="addressZip">
                Zipcode
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight text-gray-700 focus:outline-none focus:bg-white" id="addressZip" type="text" required placeholder="Zipcode"/>
            </div>

          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="year">
                High School Graduation Year
              </label>
              <select className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white" id="year" required placeholder={year}>
                {
                  Array.from(new Array(50), (val, index) => index + startYear).map((year) => {
                    return (
                      <option key={year} value={year}>{year}</option>
                    )
                  })
                }

              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="major">
                Major
              </label>
              <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none text-gray-700 focus:bg-white focus:border-gray-500" id="major" type="text" required placeholder="Business"/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="school">
                      School Your Attending
                  </label>
                  <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none text-gray-700 focus:bg-white focus:border-gray-500" id="school" type="text" required placeholder="college your attending"/>
              </div>
              <div className="w-full md:w-1/2 px-3">
              {imagePreviewUrl && (
                <div className="w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="image-preview">
                    Image Preview
                  </label>
                  <Image id="image-preview" alt="Profile-Image-Preview"  width={250} height={250} src={imagePreviewUrl} className="mb-3" />
                </div>
                )}
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="photo">
                      Upload a photo of yourself
                  </label>
                  <input className="appearance-none block w-full bg-gray-200  border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="photo" type="file" onChange={handleImageChange} />
              </div>
              <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="bio">
                      Bio
                  </label>
                  <textarea className="appearance-none block w-full bg-gray-200  border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="bio"  required placeholder="Tell us a litte about yourself"/>
              </div>
          </div>
          <Button  colorScheme="green" variant="outline" type="submit">Submit</Button>
        </form>
      </div>

    );
  }
  export default ApplyForm;