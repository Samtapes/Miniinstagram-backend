const connection = require('../database/connection');

module.exports = {
    async index(req,res) {

        // Getting all the posts
        const posts = await connection('posts').select('*');

        return res.json(posts)
    },


    async create(req,res) {

        // Getting data
        const { image, description } = req.body;
        const  user_id = req.headers.authorization;



        // Checking if the user exist
        const userResponse = await connection('users').where('id', user_id);

        if(userResponse.length === 0){
            return res.status(404).send();
        }


        // Creating the post
        const [id] = await connection('posts').insert({
            image,
            description,
            favorites: 0,
            user_id
        })

        return res.json({ id : id })
    },



    async edit(req,res) {

        // Get data
        const { description } = req.body;

        const user_id = req.headers.authorization;
        const post_id = req.params.id;


        // Updating the post descriptiom
        const response = await connection('posts').where('id', post_id).where('user_id', user_id).update({
            description
        });


        if(response === 0){
            return res.status(405).send();
        }

        else{
            return res.status(204).send();
        }
    },

    

    async delete(req,res) {

        // Get data
        const user_id = req.headers.authorization;
        const post_id = req.params.id;
        

        // Deleting the post
        const response = await connection('posts').where('id', post_id).where('user_id', user_id).delete();



        // If can't delete
        if(response === 0){
            return res.status(405).send();
        }

        else{
            return res.status(204).send();
        }
    }
}