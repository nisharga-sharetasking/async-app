import express from "express";
import QRCode from "qrcode";
// import { SSLCommerzPayment } from "sslcommerz-lts";
import "dotenv/config";
import SSLCommerzPayment from "sslcommerz-lts";
import { data, is_live, store_id, store_passwd } from "./config.js";

const app = express();
const port = 3000;

app.get("/qr", async (req, res) => {
  const text = req.query.text;
  if (!text) {
    res.status(400).send("Please enter a string");
    return;
  }
  try {
    const qrDataUrl = await QRCode.toDataURL(text);
    const image = {
      qrCodeImage: qrDataUrl,
    };
    res.send(image);
    res.type("html").send(`<img src="${qrDataUrl}" alt="QR Code">`);
  } catch (error) {
    console.error("QR generation failed:", error);
    res.status(500).send("Failed to generate QR code");
  }
});

//sslcommerz init
app.get("/init", (req, res) => {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });
});

app.get("/validate", (req, res) => {
  const id = req.query.id;
  console.log("🚀 ~ id:", id);
  if (!id) {
    res.status(400).send("Please enter a string");
    return;
  }
  const data = {
    val_id: id, //that you go from sslcommerz response
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.validate(data).then((data) => {
    // console.log(data);
    //process the response that got from sslcommerz
    // https://developer.sslcommerz.com/doc/v4/#order-validation-api
  });
});

app.get("/transaction-query-by-transaction-id", (req, res) => {
  const data = {
    tran_id: "abc23",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.transactionQueryByTransactionId(data).then((data) => {
    // console.log("🚀 ~ data:", data);
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#by-session-id
  });
});

app.get("/initiate-refund", (req, res) => {
  const data = {
    refund_amount: 1500,
    refund_remarks: "back",
    bank_tran_id: "2511022344391XVS7TYmfO2WzlB",
    refe_id: "EASY5645415455oo",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.initiateRefund(data).then((data) => {
    console.log("🚀 ~ data:", data);
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
