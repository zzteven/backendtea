const connection = require("../db/mysqldb.js")

module.exports = {
    getSettings() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM mas_settings", (error, data) => { 
                if (error) reject(error)
                else resolve(data)
            })
        })
    },
    getSettingById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM mas_settings WHERE id = ?", [id], (error, data) => { 
                if (error) reject(error)
                else resolve(data)
            })
        })
    },
    addSetting(params) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM mas_settings WHERE id = ?", [params.id], (error, data) => { 
                if (error) reject(error)
                else if (data.length !== 0) {
                    reject({
                        message: "Type exist in database"
                    })
                } else {
                    connection.query("INSERT INTO mas_settings VALUES (?,?,?,?,?)", Object.values(params).map(value => value), (error, data) => { 
                        if (error) reject(error)
                        else resolve({ message: "Settings successfully added" })
                    })
                }
            })
        })
    },
    updateSetting(params) {
        return new Promise((resolve, reject) => {
            const { name, description, type, options, id } = params
            connection.query("UPDATE mas_settings SET name = ?, description = ?, type = ?, options = ? WHERE id = ?", [name, description, type, options, id], (error, data) => { 
                if (error) reject(error)
                else resolve({ message: "Settings successfully updated" })
            })
        })
    },
    deleteSetting(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM mas_settings WHERE id = ?", [id], (error, data) => { 
                if (error) reject(error)
                else resolve({  message: "Settings successfully deleted" })
            })
        })
    }
}