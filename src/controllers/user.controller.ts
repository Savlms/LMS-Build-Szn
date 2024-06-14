import UserService from "../services/user.service";
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import sendEmail from "../utils/sendMail";
import passwordReset from "../utils/mailTemplates/passwordReset";
import IUser from "../interfaces/user.interface";
import AdminIdServices from "../services/adminId.service";
const {
    create,
    update,
    findAll,
    findById,
    findByEmail,
    validateId,
    erase,
    findOneByFilter
} = new UserService();
const {
    createAdminId
} = new AdminIdServices();

export default class UserController {

    //edit a user
    async updateUser(req: Request, res: Response) {
        const data = req.body
        const id = req.params.id

        if (!await validateId(id)) {
            return res.status(400).send({
                message: 'Invalid Id',
                success: false
            })
        }
        //checks if user exists
        const user = findById(id)
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }

        const existingUser = await findByEmail(data.email);
        if (existingUser) {
            return res.status(409).send({
                message: 'Email already exists',
                success: false
            });
        }

        //if it exists you update the user
        //hash password again and return only needed fields
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await update(id, data);
        const { _id, email } = updatedUser!;
        return res.status(200).send({
            message: 'Update successfully',
            success: true,
            data: { _id, email }
        })
    }


    //delete a user
    async deleteUser(req: Request, res: Response) {
        const id = req.params.id

        if (!await validateId(id)) {
            return res.status(400).send({
                message: 'Invalid Id',
                success: false
            })
        }

        const user1 = await findById(id)
        if (!user1) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }

        const user = await erase(id)
        return res.status(200).send({
            message: 'User deleted successfully',
            success: true
        })
    }

    //find a single user
    async findOne(req: Request, res: Response) {
        const id = req.params.id

        if (!await validateId(id)) {
            return res.status(400).send({
                message: 'Invalid Id',
                success: false
            })
        }

        const user = await findById(id)
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }
        // only return the needed fields of user
        return res.status(200).send({
            message: 'User found',
            success: true,
            data: user
        })
    }

    //find all users
    async findAll(req: Request, res: Response) {
        const getAll = await findAll()
        // only return the needed fields of users
        return res.status(200).send({
            message: 'Users found successfully',
            success: true,
            data: getAll
        })
    }

    //move these 2 to auth controller and let their route be /auth instead of /user
    //Login
    async login(req: Request, res: Response) {
        const email = req.body.email
        const user = await findByEmail(email)
        if (!user) {
            return res.status(404).send({
                message: 'Invalid Email or Password',
                success: false
            })
        }

        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {
            return res.status(404).send({
                message: 'Invalid Username or Password',
                success: false
            })
        } else {
            const token = jwt.sign({ _id: user._id, username: user.email, role: user.role }, SECRET!, { expiresIn: (7 * 24 * 60 * 60) })
            res.cookie("token", token, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) })
            // only return the needed fields of user
            return res.status(200).send({
                message: 'Login Successful',
                success: true,
                data: {email:user.email,role:user.role, token}
            })
        }
    }

    //sign up or create a user
    async signup(req: Request, res: Response) {
        try {
            const userData = req.body;

            // Check if email already exists
            const existingUser = await findByEmail(userData.email);
            if (existingUser) {
                return res.status(409).send({
                    message: 'Email already exists',
                    success: false
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create the new user
            // only guest can use this route cuz you're not expecting role
            const newUser = await create({
                email: userData.email,
                password: hashedPassword, // Store hashed password
                role: userData.role
            });

            // Generate JWT token
            const token = jwt.sign({
                _id: newUser._id,
                username: newUser.email,
                role: newUser.role
            }, SECRET!, { expiresIn: (7 * 24 * 60 * 60) });

            // only return the needed fields of user
            res.cookie('token', token, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) }).status(200).send({
                message: 'User registered successfully',
                success: true,
                data: {email: newUser.email, role: newUser.role, token}
            });
        } catch (err: any) {
            res.status(500).send({
                message: 'Failed to register user',
                success: false,
                error: err.message
            });
        }
    }

    async sendResetLink(req: Request, res: Response) {
        const { email } = req.body;
        const _user = await findByEmail(email);
        if (!_user) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Email not found"
                });
        }
        if (_user.email !== email) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Invalid email"
                });
        }

        const token = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('');

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        const updatedUser = await update(_user.id, {
            resetToken: token,
            tokenExpiration: expiration
        });
        console.log(updatedUser)

        //Send Mail Method
        sendEmail(passwordReset(updatedUser as unknown as IUser));
        return res.status(200).send({
            success: true,
            message: "Reset link sent successfully"
        });
    }

    async resetPassword(req: Request, res: Response) {
        const token = req.params.token;
        const user = await findOneByFilter({
            resetToken: token,
            tokenExpiration: {
                $gte: new Date()
            }
        })
        if (!user) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Invalid token"
                });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const updatedUser = await update(String(user._id), { password: hashedPassword });

        // Generate JWT token
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, SECRET!, { expiresIn: (7 * 24 * 60 * 60) });

        // only return the needed fields of user
        res.cookie('token', jwtToken, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) }).status(200).send({
            message: 'Password reset successfully',
            success: true,
            data: updatedUser
        });
    }

    //logging a user out
    async logout(req: Request, res: Response) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1 
        });
        return res.status(200).send({
            message: 'Logged Out',
            success: true
        });
    }

    //sign up for an admin
    async signupAdmin(req: Request, res: Response) {
        try {
            const userData = req.body;

            // Check if email already exists
            const existingAdmin = await findByEmail(userData.email);
            if (existingAdmin) {
                return res.status(409).send({
                    message: 'Email already exists',
                    success: false
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create the new admin
           
            const newAdmin = await create({
                email: userData.email,
                password: hashedPassword, // Store hashed password
                role: userData.role
            });

            // Generate JWT token
            const token = jwt.sign({
                _id: newAdmin ._id,
                username: newAdmin .email,
                role: newAdmin.role
            }, SECRET!, { expiresIn: (7 * 24 * 60 * 60) });

            const uniqueId = [...Array(5)].map(() => Math.floor(Math.random() * 10)).join('');

            await createAdminId({
                uniqueId,
                adminId: String(newAdmin._id)
            })
            console.log(uniqueId)

            // only return the needed fields of admin
            res.cookie('token', token, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) }).status(200).send({
                message: 'Admin registered successfully',
                success: true,
                uniqueId
            });
        } catch (err: any) {
            res.status(500).send({
                message: 'Failed to register Admin',
                success: false,
                error: err.message
            });
        }
    }

    async sendResetLinkAdmin(req: Request, res: Response) {
        const { email } = req.body;
        const _admin = await findByEmail(email);
        if (!_admin ) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Email not found"
                });
        }
        if (_admin .email !== email) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Invalid email"
                });
        }

        const token = [...Array(4)].map(() => Math.floor(Math.random() * 10)).join('');

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        const updatedAdmin = await update(_admin.id, {
            resetToken: token,
            tokenExpiration: expiration
        });
        console.log(updatedAdmin)
        }
    }

        