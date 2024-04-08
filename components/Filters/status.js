'use client';
import { useRouter, usePathname } from "next/navigation";
import { Button, ButtonGroup } from "@chakra-ui/react";
const StatusFilters = () =>{
    const router = useRouter();
    const pathname = usePathname();
    const handleFilter = (filter) => {
        router.push(`${pathname}?filter=${filter}`, {shallow: true});
    }
    return (
        <div className='mt-4'>
            <ButtonGroup gap='2' display='flex' flexWrap='wrap' justifyContent={'center'} maxWidth='100%' spacing="2">
            <Button onClick={()=>handleFilter('approved')}>Show Recipients</Button>

            <Button onClick={()=>handleFilter('pending')}>Show New Applicants</Button>
            </ButtonGroup>
        </div>
    )
}
export { StatusFilters }