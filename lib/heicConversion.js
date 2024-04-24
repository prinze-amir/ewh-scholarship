
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Heic2any = dynamic(
  () => import("heic2any"),
  { ssr: false }
);

export const convertHeicToJpg = async (heicBuffer) => {
    const jpgBuffer = await Heic2any({
        blob: heicBuffer,
        toType: 'image/jpeg',
        quality: .8
    })
    return jpgBuffer
    }

//export default heic2any