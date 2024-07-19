const { hash } = require("bcrypt");
const { comparePass, jwt, hashPass } = require("../lib/comon.lib");
const UserModel = require("../models/user.model");
const { WebcastPushConnection } = require('tiktok-live-connector');

const WebSocket = require('ws');




module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const exist = await UserModel.findOne({ email }).lean();
        const match = await comparePass(password, exist.password);
        if (exist) {
            if (match === true) {
                const token = await jwt({ ...exist })
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

module.exports.scrapeTikTok = (req, res, next) => {

    // Username of someone who is currently live
    let tiktokUsername = "tule081103";

    // Create a new wrapper object and pass the username
    let connection = new WebcastPushConnection(tiktokUsername);
    const wss = new WebSocket.Server({ port: 8080 });


    // Handle WebSocket connections
    wss.on('connection', ws => {
        console.log('Client connected');

        // Event handler for chat messages
        connection.on('chat', data => {
            const message = `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`;
            console.log(message);

            // Send the message to the connected client
            ws.send(JSON.stringify({ type: 'chat', message: data.comment }));
        });

        // Handle client disconnections
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    // Connect to the TikTok live stream
    connection.connect().then(state => {
        console.log(`Connected to roomId ${state.roomId}`);
    }).catch(err => {
        console.error('Failed to connect', err);
    });

    // const puppeteer = require('puppeteer');

    // async function sendZaloMessage(phoneNumber, message) {
    //     const browser = await puppeteer.launch({ headless: false }); // Launch the browser
    //     const page = await browser.newPage(); // Open a new page

    //     // Navigate to Zalo login page
    //     await page.goto('https://chat.zalo.me/');

    //     // Log in to Zalo
    //     // Note: You might need to handle the QR code login process manually or automate it with additional steps.
    //     console.log('Please log in to Zalo manually.');

    //     // Wait for user to complete the login
    //     await page.waitForNavigation({ waitUntil: 'networkidle0' });

    //     // Search for the phone number
    //     await page.type('input[placeholder="Tìm bạn bè, tin nhắn..."]', phoneNumber);
    //     await page.waitForTimeout(2000); // Wait for search results to load

    //     // Select the user from the search results
    //     await page.keyboard.press('Enter');
    //     await page.waitForTimeout(2000); // Wait for the chat to open

    //     // Type and send the message
    //     await page.type('textarea', message);
    //     await page.keyboard.press('Enter');

    //     console.log('Message sent successfully.');

    //     await browser.close(); // Close the browser
    // }

    // // Example usage
    // const phoneNumber = '0971357432';
    // const orderNumber = '123';
    // const message = `You have order number ${orderNumber}`;
    // sendZaloMessage(phoneNumber, message).catch(console.error);



    res.render('index', { title: "test" })

}
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.end();

}
module.exports.profile = (req, res, next) => {
    try {
        const { user } = req;
        res.status(200).json({ message: 'Lấy thông tin khách hàng thành công', data: [{ user }] })
    } catch (error) {
        console.log(error);
        res.status(505).json({ message: error.message, error: error.message })
    }
}
module.exports.updateProfile = async (req, res, next) => {
    try {

        const { _id } = req.user;
        const update = await UserModel.findOneAndUpdate({ _id }, req.body);
        if (update) {
            res.status(200).json({ message: 'Cập nhật thông tin khách hàng thành công', data: [] })

        }
        res.status(201).json({ message: 'Cập nhật thông tin khách hàng thất bại', data: [] })
    } catch (error) {
        console.log(error);
        res.status(505).json({ message: error.message, error: error.message })
    }
}