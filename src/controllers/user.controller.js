
const userModel = require('../models/user.model');
const UserService = require('../services/user.service')

class UserController {

    
         // login a user
        async login(req, res, next) {
            const {email, password} = req.body;

            try {
                const user = await service.findbyID({ email : email});
                
                if (!user) {
                    return res.status(401).json({ success: false, message: 'Invalid email' })
                }
                
                const result = await user.matchPassword(password)

                if(!result){ 
                    return res.status(401).json({ success: false, message: 'Invalid Password'})
                }
            } catch (error) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found',
                })
            }
        }



    //create a User
    async createUser(req, res){
        
        const data = req.body;
        // console.log(data)

        try {
            //check for existing user
        if(await UserService.fetchOne({ email: data.email.toLowerCase()})){
            res.status(403).json({
                success: false,
                message: 'User Already Exists'
            })
        }
        //else create a new user 
         const newUser = await UserService.create(data);

            res.status(201).json({
            success: true,
            message: 'User created Successfully',
            data: newUser
        })

        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
        

    }

    //Get a Single by Id
    async findUser(req, res){
        const info = req.params.id
        // console.log(info)

        try {
            // console.log(user)
            const user = await UserService.fetchById({ _id: info })
            
            if(!user)
             { 
                    return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }
            return res.status(404).json({
                success: true,
                message: user
            })
           
        } catch (error) {
                return res.status(403).json({
                success: false,
                message: error
            })
        }
    }

    //Find by username
    async findByUsername(req, res){
        const username = req.params.username

        try  {
            const user = await UserService.fetchOne({ username: username })

            if(!user)
            {
                return res.status(403).json({
                success: false,
                message: 'User not found'
            })

            } 

            return res.status(200).json({
                success: true,
                message: 'User Fetched Successfully',
                data: user
            })

        }  catch(error){
            return res.status(403).json({
                success: false,
                message: error
            })
        }


        
    }


    //Get All Users
    async findUsers(req, res){

        try {
        const users = await UserService.fetch()

                return res.status(200).json({
                    success: true,
                    message: 'Users Fetched Successfully',
                    data: users
                })
        } catch(error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
      

    }


    //Update User
    async updateUser(req, res){
        const id = req.params.id;
        const updateData = req.body;

        try { 
            const user = await UserService.fetchById(id);

            //check user
            if(!user) {
                res.status(403).json({
                success: false,
                message: 'User to update not found'
            })
            } 
    
            //check for existing user 
            if(updateData.email){
                const userUpdate = await UserService.fetchOne({ email: updateData.email.toLowerCase()})
                if(userUpdate){
                    if(userUpdate._id.toString() !== id){
                    res.status(403).json({
                        success: false,
                        message: 'User already exists'
                    })
                }
                }
                
            }
    
            //update user
            const updatedData = await UserService.update(id, updateData)
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: updatedData 
            })

        } 
        
        catch (error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
       
    }

    async deleteUser(req, res){
              const id = req.params.id;

            try {
            //check if user exits before updating
            const checkUser = await UserService.fetchById({ _id: id })

            if(!checkUser) return res.status(404).json({
                success: false,
                message: 'User not found'
            })

            //delete user 
            await UserService.delete(id)

            return res.status(200).json({
                success: true,
                message: 'User Deleted Successfully',
                data: checkUser
            })

         }
            catch (error) {
                return res.status(403).json({
                    success: false,
                    message: error
                })
            }
        
    }

}

module.exports = new UserController()
