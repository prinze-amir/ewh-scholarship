'use client';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button, ButtonGroup } from "@chakra-ui/react";
const StatusFilters = () =>{
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const handleFilter = (filter) => {
        const query = new URLSearchParams(params);
      //  console.log(query.get('search'))
        query.set('filter', filter);
       
        router.push(`${pathname}?${query.toString()}`, {shallow: true});
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