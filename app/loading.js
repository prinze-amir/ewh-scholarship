import { accentColor } from "@/utilities/theme"
import { CircularProgress } from "@chakra-ui/react"

export default function Loading() {
    return (
        <div className="flex justify-center self-center align-middle items-center h-[100vh] bg-slate-100">
            <CircularProgress isIndeterminate color={accentColor} size="150px" />
        </div>
    )
}
