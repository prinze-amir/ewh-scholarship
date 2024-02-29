'use client'
import {useState} from 'react';
import Image from 'next/image';
const ApplyForm = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const date = new Date();
  const startYear = 1980;
  const year = date.getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/new-applicant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: e.target['name'].value,
        parents: e.target['parents'].value,
        graduateYear: e.target['year'].value,
        major: e.target['major'].value,
        college: e.target['school'].value,
        bio: e.target['bio'].value,
        recipient: false
      })
    });

    console.log('form submitted');
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Generate a URL for the file
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the generated URL for preview
        setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

    return (
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight text-gray-700 focus:outline-none focus:bg-white" id="name" type="text" placeholder="full name"/>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="parents">
              Parents Name
            </label>
            <input className="appearance-none block w-full bg-gray-200  border border-gray-200  text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="parents" type="text" placeholder="parents"/>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="year">
              High School Graduation Year
            </label>
            <select className="appearance-none block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white" id="year" placeholder={year}>
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
            <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none text-gray-700 focus:bg-white focus:border-gray-500" id="major" type="text" placeholder="Business"/>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="school">
                    School Your Attending
                </label>
                <input className="appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none text-gray-700 focus:bg-white focus:border-gray-500" id="school" type="text" placeholder="college your attending"/>
            </div>
            <div className="w-full px-3">
            {imagePreviewUrl && (
        <div className="w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="image-preview">
            Image Preview
          </label>
          <Image id="image-preview"  width={250} height={250} src={imagePreviewUrl} alt="Profile Preview" className=" mb-3" />
          {/* <img id="image-preview" src={imagePreviewUrl} alt="Profile Preview" className="w-full mb-3" /> */}
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
                <textarea className="appearance-none block w-full bg-gray-200  border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="bio"  placeholder="Tell us a litte about yourself"/>
            </div>
        </div>
        <button type="submit" className="bg-white p-3 text-gray-700 rounded-lg">Submit</button>
      </form>

    );
  }
  export default ApplyForm;