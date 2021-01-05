const connection = require('../database/connection');

module.exports = {
    async index (req,res) {
        const users = await connection('users').select('*');
    
        return res.json(users);
    },


    async create(req,res) {
        const { name, email, password } = req.body;



        // Check if already exist users with this email
        const emailResponse = await connection('users').where('email', email).count().first();

        if(emailResponse['count(*)'] >= 1){
            return res.status(405).send();
        }



        // Check if already exist users with this name
        const nameResponse = await connection('users').where('name', name).count().first();

        if(nameResponse['count(*)'] >= 1){
            return res.status(405).send();
        }

    

        const [id] = await connection('users').insert({
            name,
            email,
            password
        });
    
        return res.json({id: id})
    },


    async edit(req,res) {
        const { name } = req.body;
        const user_id = req.headers.authorization;


        
        // Check if already exist users with this name
        const nameResponse = await connection('users').where('name', name).count().first();

        if(nameResponse['count(*)'] >= 1){
            return res.status(405).send();
        }
        


        const response = await connection('users').where('id', user_id).update({
            name
        });


        if(response === 0){
            return res.status(404).send();
        }

        else{
            return res.status(204).send();
        }
    },


    async delete(req,res) {
        const user_id = req.headers.authorization;

        const response = await connection('users').where('id', user_id).first().delete();

        await connection('posts').where('user_id', user_id).delete();

        if(response === 0){
            return res.status(404).send();
        }

        else{
            return res.status(204).send();
        }

    }
}