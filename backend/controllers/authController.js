import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || "7d",
        }
    );
};

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (userExists) {
            return res.status(400).json({
                success: false,
                error:
                    userExists.email === email
                        ? "Email already registered"
                        : "Username already exists",
                statusCode: 400,
            });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    createdAt: user.createdAt,
                },
                token,
            },
            message: "User registered successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password",
                statusCode: 401,
            });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password",
                statusCode: 401,
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    createdAt: user.createdAt,
                },
                token,
            },
            message: "Login successful",
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
                statusCode: 404,
            });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    createdAt: user.createdAt,
                },
            },
            message: "Profile updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
                statusCode: 404,
            });
        }

        const isPasswordMatch =
            await user.comparePassword(currentPassword);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                error: "Current password is incorrect",
                statusCode: 400,
            });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};