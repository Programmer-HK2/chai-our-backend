import connect_DB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './env'
})

connect_DB()





















/*
import mongoose from "mongoose";
import {DB_NAME} from "./constants";
import express from "express";
const app = express()

;(async() =>{
    try {
        await mongoose.connect(`${process.env.
        MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) =>{
            console.log("Error :"  , error)
            throw error
        } )

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on Port ${process
                .env.PORT}`)
        })

    } catch (error) {
        console.error("Error", error)
        throw error
    }
})()

*/