'use client'
import { Switch, Input, Textarea, InputGroup, InputLeftAddon, InputRightAddon, IconButton, InputLeftElement } from '@chakra-ui/react'

import { PhoneIcon, AddIcon, DeleteIcon, ArrowBackIcon, EmailIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

const EditForm = ({ recipient }) => {
    const [formData, setFormData] = useState({
        name: recipient.name,
        email: recipient.email,
        phone: recipient.phone,
        bio: recipient.bio,
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData, 'form data');
        try {
            const response = await fetch(`/api/recipients/${recipient._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data, 'data');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    placeholder="Name"
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement >
                    <EmailIcon />
                </InputLeftElement>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    placeholder="Email"
                />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon >
                    <PhoneIcon />
                </InputLeftAddon>
                <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    placeholder="Phone"
                />
            </InputGroup>
            <InputGroup>
                <Textarea
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInput}
                    placeholder="Recipient Bio"
                />
            </InputGroup>
            <IconButton
                type="submit"
                aria-label="Update Recipient"
                icon={<ArrowBackIcon />}
            />
        </form>
    );
}

export { EditForm}