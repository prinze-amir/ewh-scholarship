import { CircularProgress } from "@chakra-ui/react"
export default function Loading() {
    return (
        <div className="flex justify-center self-center align-middle items-center h-[100vh] bg-transparent">
            <CircularProgress isIndeterminate color='green.300' size="150px" />
        </div>
    )
}
