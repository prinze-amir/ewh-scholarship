'use client'
import { Button, Input, Heading, CardHeader, CardBody, Card, theme  } from '@chakra-ui/react'
import {useState, useEffect} from 'react';
import { accentColor } from "@/utilities/theme"
import { getSettings } from '@/app/admin/settings/actions';
import { updateSettings } from '@/app/admin/settings/actions';

export default function ColorPicker({theme}) {
    const [color, setColor] = useState('');

    useEffect(()=>{

        if(theme){
            setColor(theme.accentColor)
        } else {
            setColor(accentColor)
        }console.log(theme, 'theme')
      
    }, [])
       

    const handleSubmit = (e) => {
       // e.preventDefault();
        const newColor = e.target.color.value;
        try{

          const res = updateSettings({themeSettings: {accentColor: newColor}});
          console.log(res, 'settings updated')

        }catch(e){
            console.error(e)
        }
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
            <p className="text-white">Current Color: {color}</p>
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

