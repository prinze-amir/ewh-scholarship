'use client'
import { Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { updateSettings } from '@/app/admin/settings/actions';
import { Button } from '@chakra-ui/react';
import { accentColor } from '@/utilities/theme';
import { set } from 'mongoose';

export const EmailAccount = ({account}) => {
    const [emailAccount, setEmailAccount] = useState({
                service: account?.service,
                host: account?.host,
                username:account?.username,
                pass: account?.pass
            
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        setColor(accentColor)
        if(emailAccount.service !== 'other'){
            setDisabled(true)
        }
    }, [])

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
        if(e.target.name === 'service') {
            if(e.target.value === 'gmail') {
                setEmailAccount({...emailAccount, host: 'smtp.gmail.com', service: 'gmail'})
                if(!disabled) setDisabled(true)
            } else if(e.target.value === 'yahoo') {
                setEmailAccount({...emailAccount, host: 'smtp.mail.yahoo.com', service: 'yahoo'} )
                if(!disabled) setDisabled(true)

            } else if(e.target.value === 'outlook') {
                setEmailAccount({...emailAccount, host: 'smtp-mail.outlook.com', service:'outlook'})
                if(!disabled) setDisabled(true)

            } else {
                setEmailAccount({...emailAccount, host: 'smtp.', service:'other'})
                setDisabled(false)
            }
        }
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
                <label>SMTP Host</label>
                <input  className="p-3 rounded-md border" disabled={disabled} autoComplete="host" type="text" name="host" value={emailAccount.host} onChange={handleChange} />
                <label>SMTP Username</label>
                <input  className="p-3 rounded-md border" autoComplete="username" type="email" name="username" value={emailAccount.username} onChange={handleChange} />
                {emailAccount.service === 'gmail' ? <label>Google App Password</label>: <label>Password</label>}

                <input className="p-3 rounded-md border" autoComplete="new-password" type="password" name="pass" value={emailAccount.pass} onChange={handleChange} />
               {emailAccount.service === 'gmail' && <a className="text-sm text-blue-600" href="https://support.google.com/mail/answer/185833?hl=en#:~:text=Go%20to%20your%20Google%20Account,the%20page%2C%20select%20App%20passwords." target="_blank">How do I find my app password?</a>}

                <Button isLoading={loading} size='lg' bgColor={color} type="submit">Save</Button>
            </form>
        </div>
    )
}