const fileModel = require('../models/file.model')

class fileService {
         //Create File data
    async create(fileData){
        return await fileModel.create(fileData)
    }
}

module.exports = new fileService()
