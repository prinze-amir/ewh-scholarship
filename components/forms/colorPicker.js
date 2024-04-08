'use client'
import { Button, Input, Heading, CardHeader, CardBody, Card  } from '@chakra-ui/react'
import {useState, useEffect} from 'react';

export default function ColorPicker(props) {
    const [color, setColor] = useState('');
    let  {theme} = props;
    useEffect(()=>{

         theme = localStorage.getItem('theme-accent-color');

        if(theme){
            setColor(theme);
        }

    }, [])

    const handleSubmit = (e) => {
      //  e.preventDefault();
        const newColor = e.target.color.value;
        setColor(prev=>newColor);

        localStorage.setItem('theme-accent-color', newColor);
        theme = localStorage.getItem('theme-accent-color');

    }

  return (
    <Card>
      <CardHeader>
        <Heading>Theme Colors</Heading>
        <p>Select theme accent color.</p>
        <div style={{backgroundColor:`${color}`, height:'50px', padding:'10px'}}>
            <p>Current Color: {color}</p>
        </div>
      </CardHeader>
      <CardBody className="flex items-center space-y-4">
        <form className="flex items-center gap-4" onSubmit={handleSubmit}>
          <Input className="w-[300px]" id="color" placeholder="Color" type="color" />
          <Button bgColor={color} type="submit">Save</Button>
        </form>
      </CardBody>
    </Card>
    
  )
}

