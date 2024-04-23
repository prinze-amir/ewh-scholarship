'use client'
import { signOut } from "next-auth/react";
import { accentColor } from "@/utilities/theme";
import { Button } from '@chakra-ui/react';

export const SignOutButton = () => {

    return (
        <div>
            <Button variant={'outline'} onClick={signOut}>Sign Out</Button>
        </div>
    )
}