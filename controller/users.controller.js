const { hash } = require("bcrypt");
const { comparePass, jwt, hashPass } = require("../lib/comon.lib");
const UserModel = require("../models/user.model")

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const exist = await UserModel.findOne({ email }).lean();
        const match = await comparePass(password, exist.password);
        if (exist) {
            if (match === true) {
                const token = await jwt({ ...exist })
                console.log('token', token);
                return res.status(200).json({
                    message: 'Đăng nhập thành công',
                    data: [
                        {
                            token
                        }
                    ]
                })
            }
        }

        return res.status(201).json({ message: 'Đăng nhập thất bại', data: [] })
    } catch (error) {
        console.log(error);

        return res.status(505).json({ message: 'thất bại', data: [] })

    }
}
module.exports.register = async (req, res, next) => {
    try {

        const exits = await UserModel.findOne({ email: req.body.email }).lean();
        if (!exits) {
            const user = new UserModel({
                ...req.body,
                password: await hashPass(req.body.password)
            });
            const userSave = await user.save();
            if (userSave) {
                return res.status(200).json({
                    message: 'Đăng ký thành công',
                    data: []
                })
            }
        } else {
            return res.status(201).json({
                message: 'Email đã tồn tại',
                data: []
            })
        }

        return res.status(201).json({ message: 'Đăng ký thất bại', data: [] })
    } catch (error) {
        console.log(error);
        return res.status(505).json({ message: 'thất bại', data: [] })

    }
}