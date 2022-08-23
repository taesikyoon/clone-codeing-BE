import express from'express';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserRepository from "../repositories/user.repository.js";
import User from '../models';

const router = express.Router();




export default router;