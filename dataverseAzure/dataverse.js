require("dotenv").config();
const axios = require("axios");
const request = require("request");

const logger = require("./logger");

const Agent = require("agentkeepalive");
const HttpsAgent = require("agentkeepalive").HttpsAgent;

const config = require("./config");
// const NetworkError = require('../errors/NetworkError');

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let ACCESS_TOKEN = "";

const keepAliveHttpAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const keepAliveHttpsAgent = new HttpsAgent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});
//#region axios interceptor
const instance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: false,
  httpAgent: keepAliveHttpAgent,
  httpsAgent: keepAliveHttpsAgent,
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...DEFAULT_HEADERS,
      ...config.headers,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    return config;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error);
    } else {
      return Promise.reject(
        new NetworkError({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        })
      );
    }
  }
);
// console.log(Authorization);

//#endregion

//#region Set token
/**
 * Fetch access token and set it in a variable.
 */
function fetchAccessToken() {
  const applicationUser = getApplicationUsers();

  const options = {
    method: "POST",
    url: config.authenticationUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Keep-Alive": "true",
      Cookie:
        "fpc=ArKu6-Rb2XZKmTqf7DHLZMyysD6fAQAAAG_L09YOAAAA; x-ms-gateway-slice=prod; stsservicecookie=ests",
    },
    formData: {
      grant_type: "client_credentials",
      client_id: applicationUser.CLIENT_ID,
      client_secret: applicationUser.CLIENT_SECRET,
      resource: config.powerAppsEnvURL,
    },
  };
  //   console.log(options);

  request(options, function (error, response) {
    if (error) throw new Error(error); // TODO: Need to fix

    const tokentObj = JSON.parse(response.body);
    const { access_token, expires_in } = tokentObj;
    ACCESS_TOKEN = access_token;

    const nextFetchTime = (expires_in - 600) * 1000; //  10 min before expiration.
    setTimeout(() => {
      fetchAccessToken();
    }, nextFetchTime);
  });
}

function getApplicationUsers() {
  const applicationUserIndex = Math.round(
    Math.random() * (config.applicationUsers.length - 1)
  );

  return config.applicationUsers[applicationUserIndex];
}

fetchAccessToken();

//#endregion

//#region  Request methods

/**
 * Set a get request to a url
 *
 * @param {string} url
 * @param {object} header: Header
 */
function get(url, headers = DEFAULT_HEADERS) {
  logger.info(`Sending GET request to url: ${url}`);
  logger.info("Headers: ", headers);

  return instance.get(url, { headers });
}

/**
 * Post request
 *
 * @param {string} url : Url
 * @param {*} param1
 */
function post(url, { headers, data }) {
  logger.info(`Sending POST request to url: ${url}`);
  logger.info("Header: ", headers);
  logger.info("payload: ", data);
  headers = headers
    ? headers
    : {
        "Content-Type": " application/json",
        "OData-MaxVersion": " 4.0",
        "OData-Version": " 4.0",
        Prefer: 'odata.include-annotations="*", return=representation',
      };

  return instance.post(url, data, { headers });
}

/**
 * Patch request
 *
 * @param {string} url : Url
 * @param {*} param1
 */
function patch(url, { headers, data }) {
  logger.info(`Sending patch request to: `, url);
  logger.info("Header: ", headers);
  logger.info("Data: ", data);
  headers = headers
    ? headers
    : {
        "Content-Type": " application/json",
        "OData-MaxVersion": " 4.0",
        "OData-Version": " 4.0",
        Prefer: " return=representation",
      };

  return instance.patch(url, data, { headers });
}

//#endregion

module.exports = {
  get,
  post,
  patch,
};
