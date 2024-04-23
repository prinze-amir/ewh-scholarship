'use client'
import heic2any from 'heic2any'

export const convertHeicToJpg = async (heicBuffer) => {
    const jpgBuffer = await heic2any({
        blob: heicBuffer,
        toType: 'image/jpeg',
        quality: .8
    })
    return jpgBuffer
    }

//export default heic2any