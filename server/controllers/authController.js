const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require("jsonwebtoken");
console.log("wqw3q")

const login = async (req,res) => {
    const{email,password}=req.body;
    User.findOne({email: email})
    .then(user =>{
        console.log(user)
        if(user && user.password===password){
            if(user.password===password){
                console.log(process.env.ACCESS_TOKEN_SECRET)
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": user.email,
                            "roles": user.role
                        }
                    },
                    `${process.env.ACCESS_TOKEN_SECRET}`,
                    {expiresIn: "100s"}
                );
                const rToken = jwt.sign(
                    {id: user.email},
                    `${process.env.REFRESH_TOKEN_SECRET}`,
                    {expiresIn: "1d"}
                );

                res.cookie('jwt', rToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 7*24*60*1000
                })
                run();
                async function run(){
                    await user.updateOne({refreshToken:rToken})
                }
                console.log("qwe")
                return res.json({"auth": true, "token": accessToken, "role":user.role});
            }
            else{
                return res.json({"auth": false});
            }
        }
        else{
            return res.json({"auth": false});
        }
    })
}

const refresh = (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    if(!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'})

            const foundUser = await User.findOne({email: decoded.id}).exec()

            if(!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.email,
                        "roles": foundUser.role
                    }
                },
                `${process.env.ACCESS_TOKEN_SECRET}`,
                {expiresIn: "100s"}
            );
            const email=foundUser.email
            const password=foundUser.password
            const roles=foundUser.role
            res.json({accessToken,email,password,roles})
        }
    )
}

const logout = async (req, res) => {
    // console.log(req)
    const cookies = req.cookies;
    console.log("fgh")
    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    // foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
    // const result = await foundUser.save();
    // console.log(result);
    await User.updateOne({refreshToken:refreshToken},{refreshToken:""})


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = {login, refresh, logout};