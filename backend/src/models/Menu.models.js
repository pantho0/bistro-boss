const { Schema, model } = require("mongoose");

const MenuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
//   exampleofarrayofobject: [
//     {
//       name: String,
//       details: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
});

const Menu = model('Menu', MenuSchema)

module.exports = Menu;

