const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const BasketList = require("../../models/basketListModel");
const auth = require("../../validation/auth");
const Delivery = require("../../models/deliveryModel");

// start basket list

router.post("/addBasketList", auth, async (req, res) => {
  try {
    const notClosedBasket = await BasketList.findOne({
      isClosed: false,
      owner: req.user._id,
    });
    if (notClosedBasket === null) {
      const basketList = new BasketList();
      basketList.items.push(req.body);
      basketList.owner = req.user._id;
      await basketList.save();
    } else {
      notClosedBasket.items.push(req.body);
      notClosedBasket.owner = req.user._id;
      await notClosedBasket.save();
    }
    res.status(201).send("added");
  } catch (err) {
    res.status(400).send(err);
  }
});

// get not closed basket to render in basket div
router.get("/notClosedBasket", auth, async (req, res) => {
  try {
    const basket = await BasketList.findOne({
      isClosed: false,
      owner: req.user._id,
    });
    res.send(basket);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete item from basket by his index

router.delete("/deleteBasketItem", auth, async (req, res) => {
  try {
    const basket = await BasketList.findOne({
      isClosed: false,
      owner: req.user._id,
    });
    basket.items.splice(req.body.index, 1);
    await basket.save();
    res.send("deleted");
  } catch (e) {
    res.status(400).send(e);
  }
});

// get not closed basket to render in basket div
router.get("/notClosedBasketForPayment", auth, async (req, res) => {
  try {
    const basket = await BasketList.findOne({
      isClosed: false,
      owner: req.user._id,
    });
    res.send({
      basket: basket,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      phoneNumber: req.user.phoneNumber,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// set basket to delivery

router.post("/setBasketToDelivery", auth, async (req, res) => {
  try {
    const basket = await BasketList.findOne({ _id: req.body.basketId });
    if (basket) {
      basket.isClosed = true;
    }
    const owner = req.user._id;
    const delivery = new Delivery({ ...req.body, owner });
    await basket.save();
    await delivery.save();
    res.status(201).send("added");
  } catch (e) {
    res.status(400).send("error");
  }
});

module.exports = router;
