'use client'
import { Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { updateSettings } from '@/app/admin/settings/actions';
import { Button } from '@chakra-ui/react';
import { accentColor } from '@/utilities/theme';

export const EmailAccount = ({account}) => {
    const [emailAccount, setEmailAccount] = useState({
                service: account?.service,
                username:account?.username,
                pass: account?.pass
            
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
const [color, setColor] = useState('');
    useEffect(() => {
        setColor(accentColor)
    }, [])

    console.log(account)
    const updateAcount = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(emailAccount, 'email account')
             const res = await updateSettings({emailService: emailAccount});
             console.log(res, 'email updated')
        } catch (e) {
            console.error(e)
        }
        setLoading(false);
    }
    const handleChange = (e) => {
        setEmailAccount({...emailAccount, [e.target.name]: e.target.value})
        console.log(emailAccount, 'email account')
    }

    return (
        <div className="bg-slate-100 p-5 rounded-lg flex flex-col gap-2 justify-center">
            <h1 className="text-3xl font-bold">Email Account</h1>

            <p>Enter your email account details for sending emails</p>
            <form className="flex flex-col gap-3 p-5" onSubmit={updateAcount}>
                <label>Service</label>
                <Select type="text" name="service" value={emailAccount.service} onChange={handleChange}>
                    <option value=""></option>
                    <option value="gmail">Gmail</option>
                    <option value="yahoo">Yahoo</option>
                    <option value="outlook">Outlook</option>
                    <option value="other">Other</option>
                </Select>
                <label>SMTP Username</label>
                <input  className="p-3 rounded-md border" autoComplete="username" type="email" name="username" value={emailAccount.username} onChange={handleChange} />
                <label>SMTP Password</label>
                <input className="p-3 rounded-md border" autoComplete="new-password" type="password" name="pass" value={emailAccount.pass} onChange={handleChange} />
                <Button isLoading={loading} size='lg' bgColor={color} type="submit">Save</Button>
            </form>
        </div>
    )
}