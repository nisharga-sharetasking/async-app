import { randomUUID } from "node:crypto";
function generateTranId(prefix = "nk") {
  return `${prefix}${randomUUID().slice(0, 6)}`; // e.g., 'nk123e456'
}

export const store_id = process.env.STORE_ID;
export const store_passwd = process.env.STORE_PASSWORD;
export const is_live = process.env.IS_STORE_LIVE === "true"; //true for live, false for sandbox

export const data = {
  total_amount: 1500,
  currency: "BDT",
  tran_id: generateTranId(), // use unique tran_id for each api call
  success_url: "http://localhost:3030/success",
  fail_url: "http://localhost:3030/fail",
  cancel_url: "http://localhost:3030/cancel",
  ipn_url: "http://localhost:3030/ipn",
  shipping_method: "Courier",
  product_name: "Computer.",
  product_category: "Electronic",
  product_profile: "general",
  cus_name: "Customer Name",
  cus_email: "customer@example.com",
  cus_add1: "Dhaka",
  cus_add2: "Dhaka",
  cus_city: "Dhaka",
  cus_state: "Dhaka",
  cus_postcode: "1000",
  cus_country: "Bangladesh",
  cus_phone: "01711111111",
  cus_fax: "01711111111",
  ship_name: "Customer Name",
  ship_add1: "Dhaka",
  ship_add2: "Dhaka",
  ship_city: "Dhaka",
  ship_state: "Dhaka",
  ship_postcode: 1000,
  ship_country: "Bangladesh",
};
