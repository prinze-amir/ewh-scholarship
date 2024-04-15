'use client'
import { Button, Input, Heading, CardHeader, CardBody, Card  } from '@chakra-ui/react'
import {useState, useEffect} from 'react';
import { accentColor } from "@/utilities/theme"


export default function ColorPicker() {
    const [color, setColor] = useState('');
    useEffect(()=>{

        setColor(accentColor)

    }, [])

    const handleSubmit = (e) => {
      //  e.preventDefault();
        const newColor = e.target.color.value;
       // setColor(prev=>newColor);

        localStorage.setItem('theme-accent-color', newColor);

    }
    const handleChange = (e) => {
        setColor(e.target.value)
    }

  return (
    <Card className="h-fit">
      <CardHeader>
        <Heading>Theme Colors</Heading>
        <p>Select theme accent color.</p>
        <div className="border rounded-lg" style={{backgroundColor:`${color}`, height:'50px', padding:'10px'}}>
            <p>Current Color: {color}</p>
        </div>
      </CardHeader>
      <CardBody className="flex items-center space-y-4">
        <form className="flex items-center gap-4" onSubmit={handleSubmit}>
          <label htmlFor="color">Select</label>
          <Input className="p-1" id="color" placeholder="Color" type="color" value={color} onChange={handleChange} />
          <Button size='lg' bgColor={color} color="white" type="submit">Save</Button>
        </form>
      </CardBody>
    </Card>
    
  )
}

