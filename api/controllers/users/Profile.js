const helper = require('../../helper');
const userPre = require('../../models/User_privilage');
const moment = require('moment');

const Profile = () => {
    const index = async(req, res) => {
        try {
            return res.json(
                helper.globalRes(200, req.users)
            )
        } catch (error) {
            return res.status(500).json(
                helper.globalRes(500, error.message)
            )
        }
    }

    return {
        index
    }
}

module.exports = Profile