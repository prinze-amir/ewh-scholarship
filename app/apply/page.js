'use client'
import { useState, useEffect } from 'react'

export default function Apply(){
    
       const handleSubmit = async (e) => {
              e.preventDefault()
              const res = await fetch('/api/apply', {
                body: JSON.stringify({
                     name: e.target.name.value,
                     email: e.target.email.value,
                     message: e.target.message.value
                }),
                headers: {
                     'Content-Type': 'application/json'
                },
                method: 'POST'
              })
              const result = await res.json()
              console.log(result)
            }
    
        return (
           
            <div className="flex flex-col items-center justify-center gap-y-4 mt-20">
                <h1 className="text-3xl font-bold">Apply For Scholarship</h1>
                <div className="flex flex-col items-center justify-center gap-y-4">
                    <p className="text-xl">complete the form below</p>
                </div>
                <form className="flex flex-col justify-center gap-y-4" onSubmit={handleSubmit}>
                    <label className="text-xl">Full Name</label>
                    <input className="text-xl" type="text" name="name" />
                    <label className="text-xl">Parents full names</label>
                    <input className="text-xl" type="text" name="name" />
                    <label className="text-xl">Email</label>
                    <input className="text-xl" type="email" name="email" />
                    <label className="text-xl">Graduation Year</label>
                    <input className="text-xl" type="number" name="year" />
                    <label className="text-xl">School you will be attending</label>
                    <input className="text-xl" type="text" name="year" />
                    <label className="text-xl">Major</label>
                    <input className="text-xl" type="text" name="year" />
                    <label className="text-xl">Bio</label>
                    <textarea className="text-xl" name="message" rows="5" />
                    <button className="text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>

            </div>
        )
    }

