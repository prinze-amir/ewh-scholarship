'use client'
import Image from 'next/image'
import styled from 'styled-components'

export const Latest = () => {

   
const LatestButton = styled.button`
    padding: 10px 20px;
    color: #fff;
    border-radius: 25px;
    font-size: 1.2rem;
    background-color: #2fd6b9;
    width: fit-content;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #333;
    }
`;
    return (
        <div className="flex items-center justify-center gap-x-4 mt-20 flex-wrap relative bg-slate-100 py-20">
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'20px', width:'fit-content'}}>
                <Image src="/images/nayla.jpeg" alt="nayla" width={500} height={500} />
                <LatestButton>Latest Recipient Nayla Arnett</LatestButton>
            </div>
            <div style={{
                color: '#333',
                marginTop: '15px',
                maxWidth: '500px',
                marginLeft: '20px',

            }}>
                <p style={{fontStyle:'italic', marginBottom:'8px'}}>-FUNDING THE FUTURE-</p>
                <h2 style={{color:'#2fd6b9', fontSize:'2.5em', lineHeight:'.5'}}>MISSION</h2>
                <h2 style={{fontSize:'2.5em',lineheight:'.5'}}>STATEMENT</h2>
                <p>IMPORTANCE OF EDUCATION</p>
                <p>To provide scholarships to an acredited college, university , or vocational school for graduating high school seniors who are decedants of Earline and William Hall.</p>
            </div>
        </div>
    )
}