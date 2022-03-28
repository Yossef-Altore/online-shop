const mongoose = require("mongoose");
const { Schema } = mongoose;
const deliverySchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveryHour: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    creditCard: {
      type: String,
      required: true,
    },
    creditCardExp: {
      type: Date,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    creditCardOwner: {
      type: String,
      required: true,
    },
    basketId: { type: Schema.Types.ObjectId, required: true },
    owner: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
