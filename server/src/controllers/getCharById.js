const axios = require( 'axios' );

require( 'dotenv' ).config()//process.env

const URL = process.env.API_URL
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const STATUS_OK = 200
const STATUS_ERROR = 400

const getCharById = async( request , response ) => {
    const { id } = request.params;
    try{
        const { name, gender, image, status, origin, species } = (await axios( `${ URL }${ id }` )).data
        const character = {
            id,
            name, 
            gender, 
            image, 
            status, 
            origin, 
            species
        }

        return character ? response.status( STATUS_OK ).json( character )
            : response.status( STATUS_ERROR ).send( "Character not found" )

    }catch (error){
        return response.status( 500 ).json( { message: error } )
    }
}


// const getCharById = ( response, id ) => {
//     axios( `${ API_URL }${ id }` )
//         .then( (result) => result.data )
//         .then( (data) => { 
//             const character = {
//                 id: data.id,
//                 name: data.name,
//                 image: data.image,
//                 gender: data.gender,
//                 species: data.species,
//                 status: data.status,
//                 origin: data.origin?.name
//             }
//             response.writeHead( 200 , { "Content-Type": "application/json" } )
//             response.end( JSON.stringify( character ) )
//         })
//         .catch( ( error ) => {
//             response.writeHead( 500, {"Content-Type": "text/plain"}  )
//             response.end( error.message )
//         })
// }

module.exports = {
    getCharById,
}
