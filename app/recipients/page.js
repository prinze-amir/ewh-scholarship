
const RecipientsPage = () => {
    // const { data, error } = useSWR('/api/recipients', fetcher);
    
    // if (error) return <div>failed to load</div>;
    // if (!data) return <div>loading...</div>;
    
    return (
        <div>
        <h1>Recipients</h1>
        {/* <ul>
            {data.map((recipient) => (
            <li key={recipient.id}>
                <Link href={`/recipients/${recipient.id}`}>
                <a>{recipient.name}</a>
                </Link>
            </li>
            ))}
        </ul> */}
        </div>
    );
    }
    export default RecipientsPage;