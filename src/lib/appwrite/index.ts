"use server";

import { Client, Storage, Account } from "node-appwrite";
import { appwriteConfig } from "./config";

export const appwriteClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },

    get storage() {
      return new Storage(client);
    },
  };
};
