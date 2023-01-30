const UserModel = require('../model/user.model');
const signUpUser = async (req, res) => {
    try {
        const {_id, user_name, user_email, user_password} = req.body
        const data = {
            _id: _id,
            user_name: user_name,
            user_email: user_email,
            user_password: user_password
        }
        await UserModel.create(data).then(data => {
            return res.json({
                message: 'User Register Success!',
                data:data
            });
        }).catch(err => {
            if (err) {
                return res.json({
                    message: 'Already Register User! Please login'
                });
            }
        });
    } catch (err) {
    }
};

const signInUser = async (req, res) => {
    try {
        const email = req.params['user_email'];
        const password = req.params['user_password'];

        const data = await UserModel.findOne({"user_email": email})

        if (data !== null) {
            const passwordValue = data.user_password;
            if (passwordValue === password) {
                return res.status(200).json({
                    message: 'User Login Success!'
                })
            } else {
                return res.json({
                    message: 'User Password Incorrect!'
                })
            }
        } else {
            return res.json({
                message: 'User not found!'
            })
        }
    } catch (err) {
    }
}

module.exports = {signUpUser, signInUser}