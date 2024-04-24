'use client'
import { accentColor as themeColor } from "@/utilities/theme"
import { useEffect, useState } from "react"
import { CircularProgress } from "@chakra-ui/react"
export default function Loading() {
    const [accentColor, setAccentColor] = useState(themeColor)
    useEffect(()=>{
            setAccentColor(themeColor)
    }, [themeColor])
    return (
        <div className="flex justify-center self-center align-middle items-center h-[100vh] bg-transparent">
            <CircularProgress isIndeterminate color={accentColor} size="150px" />
        </div>
    )
}
