export const authConfig = {
    providers:[],
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
    },
    callbacks: {
        authorized(auth,request){
            const isLoggedIn = auth?.user;
            const isOnAdminPage = request.nextUrl.pathname.includes('/admin');
            if (!isLoggedIn && isOnAdminPage) {
                return '/login';
            }
            if(isLoggedIn){
                return Response.redirect('/admin');
                //return Response.redirect( new URL('/admin', request.nextUrl));
            }
            return true;
        }
    },

}