const Menu = require("../../models/Menu.models");

const findAllMenu = async(sortObj) =>{
   
     return  result = await Menu.find().sort(sortObj);
}

module.exports = findAllMenu;