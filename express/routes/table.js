const express = require("express");
const router = express.Router();

const { SelectTableData } = require("../controllers/table");

router.get("/list", async (req, res) => {
  const { page, pageSize } = req.query;

  const params = {
    start: (page - 1) * pageSize,
    end: pageSize,
  };

  const result = await SelectTableData(params);

  res.send({ data: result });
});

router.post("/add", async (req, res) => {
    console.log(req.body)
    // const { page, pageSize } = req.params;
  
    // const params = {
    //   start: (page - 1) * pageSize,
    //   end: pageSize,
    // };
  
    // const result = await SelectTableData(params);
  
    res.send({ req:req.body });
  });

module.exports = router;
