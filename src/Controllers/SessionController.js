const connection = require("../database/connection");

module.exports = {
    async create (req,res) {
        const { email, password } = req.body;

        const response = await connection('users').select('*').where('email', email).where('password', password);

        if(response.length > 0){
            return res.status(204).send();
        }

        else{
            return res.status(404).send();
        }

    }
}