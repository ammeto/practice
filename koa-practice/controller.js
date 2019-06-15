const model = require('./model');
class UsersInfo {
    //insertInfo
    async insertInfo (name, city) {
        try {
            let info = await model.insertInfo(name, city);
            let reObj = {
                errCode: 0,
                msg: 'ok'
            };

            reObj.info = info;
            console.log("insertInfo result:", JSON.stringify(reObj))
            return JSON.stringify(reObj);
        } catch (err) {
            console.log("err:", err);
        }
    }
    //deleteInfoById
    async deleteInfoById (id) {
        try {
            let info = await model.deleteInfoById(id);
            let reObj = {
                errCode: 0,
                msg: 'ok'
            };

            reObj.info = info;
            console.log("deleteInfoById result:", JSON.stringify(reObj));
            return JSON.stringify(reObj);
        } catch (err) {
            console.log("err:", err);
        }
    }
    //selectAllInfo
    async selectAllInfo () {
        try {
            let info = await model.selectAllInfo();
            let reObj = {
                errCode: 0,
                msg: 'ok'
            };

            reObj.info = info;
            console.log("selectInfoByGender result:", JSON.stringify(reObj));
            return JSON.stringify(reObj);
        } catch (err) {
            console.log("err:", err);
        }
    }
}

module.exports = UsersInfo;