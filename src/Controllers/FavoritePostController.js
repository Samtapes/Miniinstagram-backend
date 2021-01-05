const connection = require('../database/connection');

module.exports = {
    async create(req,res) {
        const user_id = req.headers.authorization;
        const post_id = req.params.id

        console.log(user_id, post_id)


        // Checking if the user exist
        const userResponse = await connection('users').where('id', user_id);

        if(userResponse.length === 0){
            return res.status(404).send();
        }



        // Checking if the post exist
        const postResponse = await connection('posts').where('id', post_id);

        if(postResponse.length === 0){
            return res.status(404).send();
        }



        // Checking if the user already favorited the post
        const favoritedResponse = await connection('favorite_post').where('post_id', post_id).where('user_id', user_id);

        if(favoritedResponse.length === 1){
            await connection('favorite_post').where('post_id', post_id).where('user_id', user_id).delete();

            const favorites = await connection('favorite_post').where('post_id', post_id).count().first();

            return res.json(favorites)
        }



        // Favoriting the post if the post exist, the user exist and he already don't favorited the post
        const [id] = await connection('favorite_post').insert({
            favorited: true,
            user_id,
            post_id
        })


        const favorites = await connection('favorite_post').where('post_id', post_id).count().first();

        return res.json(favorites);
    },
}