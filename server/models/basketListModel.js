const mongoose = require("mongoose");
const { Schema } = mongoose;
const basketListSchema = new Schema(
  {
    items: {
      type: [],
      default: [],
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    owner: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const BasketList = mongoose.model("BasketList", basketListSchema);

module.exports = BasketList;
