import Image from 'next/image'
const Recipient = ({ name, email, handleRemove }) => {
    

    return (
        <div>
            <Image src="/images/nayla.jpeg" alt="nayla" width={500} height={500} />
            <h2>Nayla Arnett</h2>
            <p>Bio description</p>
        </div>
    )

    };

    export  {Recipient};
