require("dotenv").config();
const config = require("./config");
const http = require("./dataverse");
// const { errorHandler } = require("../utils/build-error");
// const { CLINIC_ERROR } = require("../constants/errorMessages");
// const { DynamicsAPIQuery, CONDITION_OPERATOR } = require("../utils/query");
// const slotSubServiceLinkFields = require("../constants/fields/slotSubServiceLinkFields");
const logger = require("./logger");
console.log("error!!");
/**
 * Expects subServiceId as parameter
 * and returns a list of slots pointing
 *
 *
 * @param {string} clinicDay
 * @returns {Promise<Object>}
 */
// const fetchSlotsForSubSerivceLink = async (subServiceId, minDate, maxDate) => {
console.log("enter");
// logger.info("Fetching slots for ", subServiceId);
const xml = `
    <fetch>
      <entity name="smvs_claim">
      </entity>
    </fetch>
  `;

const urlEmbedForXML = encodeURIComponent(xml);
console.log(urlEmbedForXML);
const url = `${config.entity.claim}?fetchXml=${urlEmbedForXML}`;
console.log(url);
console.log("url");
 try{
  
 }

console.log("working");
