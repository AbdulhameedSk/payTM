const express = require("express");
const Account = require("../models/account");
const { default: mongoose } = require("mongoose");

const balance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).send({ balance: account.balance });
  } catch (e) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const transfer = async (req, res) => {
  let { to, amount } = req.body;
  if (!to || !amount) {
    return res.status(400).send({ msg: "Invalid data" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const toAccount = await Account.findOne({ userId: to });

    if (!toAccount) {
      return res.status(400).send({ msg: "Receiver does not exist" });
    }

    const fromAccount = await Account.findOne({ userId: req.userId });
    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).send({ message: "Insufficient balance" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Transfer successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = { balance, transfer };
