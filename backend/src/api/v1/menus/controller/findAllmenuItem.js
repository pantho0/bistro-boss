const findAllMenu = require("../../../../lib/menus/findAllMenu");

const findAllMenuItem = async (req, res, next) => {
      try{
        let sortObj = {}
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;
      if(sortField && sortOrder){
        sortObj[sortField] = sortOrder
      }
      
      const result = await findAllMenu(sortObj)

      res.send(result);
      }catch (error){
        next(error)
      }
    }


    module.exports = findAllMenuItem;