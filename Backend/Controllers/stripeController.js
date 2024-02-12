const express = require("express");
const Stripe = require("stripe");
const Order = require("../Models/ordersModel");
const Products = require("../Models/productModel");
//const sharp = require("sharp");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
///
const StriperController = async (req, res) => {
  // ///////////////
  try {
    const insuficientesStock = await Checkstock(req.body.cartItems);
    if (insuficientesStock) {
      return res.status(400).send({ error: "Insuficient stock" });
    }
    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            // images: [
            //   imageData
            //     ? `data:${item.photo.contentType};base64,${imageData}`
            //     : null,
            // ],
            description: item.description,
            metadata: {
              id: item._id,
            },
          },

          unit_amount: Math.min(item.price * 100),
        },
        quantity: item.cuantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    const subtotalx = req.body.cartItems.reduce((ac, x) => {
      return (ac = ac + x.price * x.cuantity);
    }, 0);
    const totalx = subtotalx + (subtotalx * 18) / 100;
    const order = new Order({
      userId: req.body.userId,
      products: req.body.cartItems.map((item) => ({
        id: item._id,
        name: item.name,
        desc: item.description,
        price: item.price,
        photo: {
          data: Buffer.from(item.photo.data.data, "base64"),
          contentType: item.photo.contentType,
        },
        cuantity: item.cuantity,
      })),
      subtotal: subtotalx,
      total: totalx,
      delivery_status: "pending",
      payment_status: "success",
    });
    await order.save();
    await UpdateProductStock(req.body.cartItems);
    res.send({ url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send({ error: "Error processing payment" });
  }

  async function Checkstock(cartItems) {
    for (const item of cartItems) {
      const Product = await Products.findById(item._id);
      if (!Product || Product.quantity < item.cuantity) {
        //stock insuficiente para al menos un producto
        return true;
      }
    }
    //suficiente stock par alos productos
    return false;
  }
  async function UpdateProductStock(cartItems) {
    for (const item of cartItems) {
      const Product = await Products.findById(item._id);
      if (Product) {
        Product.quantity -= item.cuantity;
        await Product.save();
      }
    }
  }
};
module.exports = {
  StriperController,
};
