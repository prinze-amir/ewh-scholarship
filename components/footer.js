'use client'
import styled from 'styled-components';
import Image from 'next/image'
export const Footer = () => {

const Button1 = styled.button`
padding: 10px 20px;
color: #fff;
border-radius: 25px;
font-size: 1.2rem;
background-color: #2fd6b9;

&:hover {
    background-color: #333;
}
`;
const Button2 = styled.button`
padding: 10px 20px;
color: #fff;
border: solid 1px #fff;
border-radius: 25px;
font-size: 1.2rem;
background-color: rgb(255 255 255 / 17%);

&:hover {
    background-color: #2fd6b9;
}
`;
    const footerStyles = {
        divContainer: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem',
        backgroundColor: '#151515',
        color: '#fff',
        position: 'absolute',
        width: '100%',
        zIndex: '3',
        fontSize: '1.2rem', 
        },
        navmenu: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        listStyle: 'none',
        gap:`20px`,
        width: '30%',
        margin: '20px 0',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#2fd6b9',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.2rem',
        },
        button2: {
            padding: '10px 20px',
            backgroundColor: 'rgb(255 255 255 / 17%)',
            color: '#fff',
            border: 'solid 1px #fff',
            borderRadius: '15px',
            fontSize: '1.2rem',
        }
    }
    return (
        <div style={footerStyles.divContainer}>
             
        <h1 className="text-4xl">EWH Scholarships</h1>
        <h3 className="text-lg">Memorial Scholarship Fund</h3>
        <ul style={footerStyles.navmenu}>
            <li><Button1>Donate</Button1></li>
            <li><Button2>Apply</Button2></li>
        </ul>
        <h4 className="">Built and designed by WeArePlu2o</h4>
        </div>
    )
    }