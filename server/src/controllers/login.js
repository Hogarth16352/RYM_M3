require( 'dotenv' ).config()//process.env

const DB_EMAIL = process.env.EMAIL
const DB_PASSWORD = process.env.PASSWORD

const STATUS_OK = 200
const STATUS_ERROR = 400

const login = ( request, response ) => {
    const { password, email } = request.query;

    try {
        if( !password || !email ){
            return response.status( 500 ).json( { message: "There isn't a password or email" } );
        }
        if( password === DB_PASSWORD && email === DB_EMAIL ){
            response.status( STATUS_OK ).json( { access: true } )
        }else{
            response.status( STATUS_OK ).json( { access: false } )
        }
    } catch (error) {
        response.status( STATUS_ERROR ).json( { access: false } )
    }
}


module.exports = {
    login
}