const findAllMenu = require("../../../../lib/menus/findAllMenu");

const findAllMenuItem = async (req, res) => {
      let sortObj = {}
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;
      if(sortField && sortOrder){
        sortObj[sortField] = sortOrder
      }
      
      const result = await findAllMenu(sortObj)

      res.send(result);
    }


    module.exports = findAllMenuItem;