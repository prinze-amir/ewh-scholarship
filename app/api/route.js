const handler = async (request) => {
    try{
      console.log(request, 'the request')
      const resp =  request.nextUrl
    // console.log(resp, 'the response')
    if (request.method === 'POST') {
      console.log('this is a post request')
       const requestBody = await request.json()
      // console.log(body, 'the body')
      return Response.json({message: 'this was post', body:requestBody, status: 200})
    }

    return Response.json({message: 'hello world', body:JSON.stringify(request.json()), status: 200})

    }catch(e){
        console.log(e)
    }
    
  }
  
  export { handler as GET, handler as POST}

  // Path: app/api/route.js
// export async function GET(request) {
    
//     return Response.json({message: 'hello world'})
   
//   }
  
