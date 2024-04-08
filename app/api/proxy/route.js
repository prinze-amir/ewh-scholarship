import { NextResponse } from "next/server";
//image proxy for Google Drive images to render using backgound-image: url()

export async function GET( req ){
    //base URL for Google Drive images
    let imageUrl = 'https://drive.google.com/uc?export=view&id='
    //get the image id from the query parameter   
    const imageId = new URL(req.url).searchParams.get('id')

        if (!imageId) {
            imageUrl = 'https://drive.google.com/uc?export=view&id=1zML9_4lYJsPwtfi_abQTKOHKv0yj_Pay'
        } else {
            imageUrl += imageId
        }

     const image = await fetch(imageUrl);
     const imageBuffer = await image.arrayBuffer();

 return new Response(imageBuffer, {
     headers: {
         'Content-Type': 'image/jpeg'
     }
 })
}