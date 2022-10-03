const router = require("express").Router()
const controllers = require("../controllers/settings.js");
const settings = require("../controllers/settings.js")

router.get("/settings", async (req, res) => {
    try {
        res.status(200).send(await controllers.getSettings())
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.get("/setting", async (req, res) => {
    try {
        res.status(200).send(await controllers.getSettingById(req.body.id))
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.post("/settings", async (req, res) => {
    try {
        const checkTypes = () => {
            if (["toggle", "button", "text", "number"].includes(req.body.type)) return true
            return false
        }
        if (checkTypes()) res.status(200).send(await controllers.addSetting(req.body))
        else res.status(400).send({
            message: "Type doesn't exist in type list"
        })
    } catch (error) {
        if (error.message) res.status(409).send({
            message: error.message
        })
        else res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.put("/settings", async (req, res) => {
    try {
        const checkTypes = () => {
            if (["toggle", "button", "text", "number"].includes(req.body.type)) return true
            return false
        }
        if (checkTypes()) res.status(200).send(await controllers.updateSetting(req.body))
        else res.status(400).send({
            message: "Type doesn't exist in type list"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.delete("/settings", async (req, res) => {
    try {
        res.status(200).send(await controllers.deleteSetting(req.body.id))
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

module.exports = router;