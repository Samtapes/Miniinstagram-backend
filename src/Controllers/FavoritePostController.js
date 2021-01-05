const connection = require('../database/connection');

module.exports = {
    async create(req,res) {
        const user_id = req.headers.authorization;
        const post_id = req.params.id


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
        const favoritedResponse = await connection('user_favorited_post').where('post_id', post_id).where('user_id', user_id);
    

        if(favoritedResponse.length === 1){

            // User unfavorited the post
            await connection('user_favorited_post').where('post_id', post_id).where('user_id', user_id).delete();

            
            // Getting the actual favorite number
            const favoritesCount = await connection('favorite_post').where('post_id', post_id).select('favorites').first();


            // Unfavoriting the post if the post exist, the user exist and he already favorited the post
            await connection('favorite_post').where('post_id', post_id).update({
                favorites: favoritesCount.favorites - 1
            })


            // Getting the actual favorite number
            const actualFavoritesCount = await connection('favorite_post').where('post_id', post_id).select('favorites').first();

            return res.json(actualFavoritesCount)
        }



        // Getting the actual favorite number
        const favoritesCount = await connection('favorite_post').where('post_id', post_id).select('favorites').first();


        // Favoriting the post if the post exist, the user exist and he already don't favorited the post
        await connection('favorite_post').where('post_id', post_id).update({
            favorites: favoritesCount.favorites + 1
        })



        // Saving what user favorited what post
        await connection('user_favorited_post').insert({
            user_id,
            post_id
        })



        // Getting the actual favorite number
        const actualFavoritesCount = await connection('favorite_post').where('post_id', post_id).select('favorites').first();

        return res.json(actualFavoritesCount);
    },
}