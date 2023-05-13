const axios = require( 'axios' );

require( 'dotenv' ).config()//process.env

const STATUS_OK = 200
const STATUS_ERROR = 400

let myFavorites = [];

const postFav= ( request , response ) => {
    const { id, name, status, species, gender, origin, image } = request.body;
    try {
        if( !id || !name || !status || !species || !gender || !origin || !image ){
            return response
                .status( STATUS_ERROR )
                .json( { message: "The require information is missing" } )
        }
        const character = {
            id,
            name,
            status,
            species,
            gender,
            origin,
            image,
        };
        // console.log( character );
        myFavorites.push( character );
        response.status( STATUS_OK ).json( myFavorites );
    }catch (error){
        response.status( STATUS_ERROR ).json( { message: error} )
    }
        
}

const deleteFav= ( request , response ) => {
    const { id } =  request.params;
    try{
        if( !id ){
            return response.status( STATUS_ERROR ).json( { message: "id not found" } )
        }
        const newFavorites = myFavorites.filter( ( ch ) => ch.id !== Number( id ) )
        myFavorites = newFavorites;
        response.status( STATUS_OK ).json( myFavorites );
    }catch ( error ){
        response.status( STATUS_ERROR ).json( { message: error} )
    }


}

module.exports = {
    postFav,
    deleteFav
}