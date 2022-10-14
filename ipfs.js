"use strict";

import { create } from "ipfs-http-client";
let IPFSNative;

async function ipfs() {
  try {
    const ipfs = create(new URL("http:127.0.0.1:5000"));
    IPFSNative = ipfs;
    console.log("connected to private ipfs root node..");
  } catch (error) {
    console.log("failed to connect to a  private ipfs root node..");
    console.error(error);
  }
}
(async () => await Promise.resolve(ipfs()))();

export const IPFSNativeQuery = async (key) => {
  try {
    const stream = await IPFSNative.dag.get(key);
    if (stream) {
      return stream.value.payload.value;
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    throw error;
  }
};

export const IPFSFileStats = async (fileName) => {
  try {
    const data = await IPFSNative.files.stat(fileName);
    return data;
  } catch (error) {
    if (
      error.code == "ERR_NOT_FOUND" ||
      error.message == `${fileName} does not exist`
    ) {
      return undefined;
    }
    throw error;
  }
};

// const response = await IPFSFileStats("/some.txt");
// console.log("response", response);

export const IPFSWriteFile = async (path, content, options = {}) => {
  try {
    return IPFSNative.files.write(path, JSON.stringify(content), options);
  } catch (error) {
    throw error;
  }
};
// const response = await IPFSWriteFile("/some.txt", { name: "chaincode" });
// console.log("response", response);

export const IPFSAddFile = async (path, content, options = {}) => {
  try {
    return IPFSNative.files.write(path, content, options);
  } catch (error) {
    throw error;
  }
};

// const response = await IPFSAddFile("/some.txt", "some_data", { create: true });
// console.log("response", response);

export const IPFSGetFileCID = async (cid, options = {}) => {
  try {
    const chunks = [];
    for await (const chunk of IPFSNative.cat(cid)) {
      chunks.push(chunk);
    }
    return chunks.toString();
  } catch (error) {
    if (
      error.code == "ERR_NOT_FOUND" ||
      error.message == `${cid} does not exist`
    ) {
      return undefined;
    }
    throw error;
  }
};

// const response = await IPFSGetFileCID(
//   "QmTe6afG9QeFjiNKLTH9Baa7huJwViCnMhSiKXWBqRmEAE"
// );
// console.log("response", response);

export const IPFSGetFile = async (path, options = {}) => {
  try {
    const chunks = [];
    for await (const chunk of IPFSNative.files.read(path)) {
      chunks.push(chunk);
    }
    const result = chunks.toString();
    return JSON.parse(result);
  } catch (error) {
    if (
      error.code == "ERR_NOT_FOUND" ||
      error.message == `${fileName} does not exist`
    ) {
      return undefined;
    }
    throw error;
  }
};

// const response = await IPFSGetFileCID("/ipfs/QmTe6afG9QeFjiNKLTH9Baa7huJwViCnMhSiKXWBqRmEAE");
// console.log("response", response);

export const IPFSRemoveFile = async (path, options = {}) => {
  try {
    await IPFSNative.files.read(path, options);
    let result = await IPFSNative.files.rm(path, options);
    for await (const gcResponse of IPFSNative.repo.gc()) {
      if (gcResponse.err) {
        throw gcResponse.err;
      }
    }
    if (!result) {
      result = true;
    }
    return result;
  } catch (error) {
    if (
      error.code == "ERR_NOT_FOUND" ||
      error.message == "file does not exist"
    ) {
      return undefined;
    }
    throw error;
  }
};

// const response = await IPFSRemoveFile("/some.txt");
// console.log("response", response);
