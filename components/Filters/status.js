'use client';
import { useRouter, usePathname } from "next/navigation";

const ButtonFilters = () =>{
    const router = useRouter();
    const pathname = usePathname();
    const handleFilter = (filter) => {
        router.push(`${pathname}?filter=${filter}`, {shallow: true});
    }
    return (
        <div>
            <button onClick={()=>handleFilter('pending')}>Show New Applicants</button>
            <button onClick={()=>handleFilter('approved')}>Show Approved Applicants</button>
        </div>
    )
}
export { ButtonFilters }