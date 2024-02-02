
import Link from 'next/link'
const Recipients = async () =>{

    const recipients = await fetch('http://localhost:3000/api/recipients')
    const data = await recipients.json();
    //console.log(data, 'data')

    if (!data) {    
        return (
            <h1>No recipients to display</h1>
        )
    }
    return (
        
        <div style={{display:'flex', flexWrap:"wrap", gap:"20px", justifyContent:'center', margin:'auto'}}>   
            {data.map((recipient) => {
                return (
                    <div style={{padding:"10px", border:'solid 1px #eee', width:"450px" }} key={recipient._id}>
                        <Link href={`/recipients/${recipient._id}`}>
                        <h2>{recipient.name}</h2></Link>
                        <p>{recipient.parents}</p>
                        <p>{recipient.graduateYear}</p>
                        <p>{recipient.college}</p>
                        <p>{recipient.major}</p>
                        <p>{recipient.bio}</p>
                    </div>
                )
            })}
            
        </div>

    )
}

export { Recipients}