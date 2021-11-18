const express = require("express");
const router = express.Router();

let param = { searchTerm: "" };

router.get("/", (req, res) => {
	res.send(param);
});

router.put("/", (req, res) => {
	param = req.body;
	console.log(param);
	res.status(204).send();
});

module.exports = router;
