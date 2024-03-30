const { ObjectId } = require("mongodb");
const Menu = require("../../../../models/Menu.models");

const findSingleMenu = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await Menu.findById(query);
    res.send(result);
  }

module.exports = findSingleMenu;