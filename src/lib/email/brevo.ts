import SibApiV3Sdk from "sib-api-v3-typescript";
//const SibApiV3Sdk = require("sib-api-v3-typescript");

import { env } from "../env.mjs";

let emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
let contactApi = new SibApiV3Sdk.ContactsApi();

let emailApiKey = emailApi.authentications["apiKey"];
emailApiKey.apiKey = env.BREVO_API_KEY;

let contactApiKey = contactApi.authentications["apiKey"];
contactApiKey.apiKey = env.BREVO_API_KEY;

let templateStatus = true;
let limit = 50;
let offset = 0;

// emailApi.getSmtpTemplates(templateStatus, limit, offset).then(
//   function (data) {
//     console.log("API called successfully. Returned data: " + JSON.stringify(data, null, 2));
//   },
//   function (error) {
//     console.error(error);
//   }
// );

export async function sendTemplate({ to }) {
  let templateId = 2;

  let sendTestEmail = new SibApiV3Sdk.SendTestEmail();

  sendTestEmail.emailTo = to;

  emailApi.sendTestTemplate(templateId, sendTestEmail).then(
    function (data) {
      console.log("API called successfully. " + JSON.stringify(data));
    },
    function (error) {
      console.error(error);
    }
  );
}

export async function createContact({ email }) {
  let createContact = new SibApiV3Sdk.CreateContact();

  createContact.email = email;
  createContact.listIds = [2];

  contactApi.createContact(createContact).then(
    function (data) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    },
    function (error) {
      console.error(error);
    }
  );
}

// createContact({ email: "yolan@ywdesign.co" });
// sendTemplate({ to: ["yolan@ywdesign.co"] });
