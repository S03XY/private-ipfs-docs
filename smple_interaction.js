import { create } from "ipfs-http-client";

async function addData() {
  const ipfs = create("http:localhost:5000");
  const response = await ipfs.add(
    JSON.stringify({ data: "this is a dummy data" })
  );

  console.log("response", response); // Qmev4kzLNqFwV9fWsPgb8cQo2A1aMMepGKWwFu1cidgbRX
  // this CID can be view from any private gateway
}

addData();
