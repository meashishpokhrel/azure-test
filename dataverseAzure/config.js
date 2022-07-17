const BASE_URL = process.env.BASE_URL;
const POWERAPPS_ENV_URL = process.env.POWER_APPS_ENV_URL;
const AUTHENTICATION_URL = process.env.AUTHENTICATION_URL;

const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const APPLICATION_USERS = JSON.parse(process.env.APPLICATION_USERS);

const ELIGIBILITY_USER = process.env.ELIGIBILITY_USER;
const ELIGIBILITY_PASS = process.env.ELIGIBILITY_PASS;
const PHICURE_ELIGIBILITY_API = process.env.PHICURE_ELIGIBILITY_API;

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
const CAPTCHA_ENABLED = process.env.CAPTCHA_ENABLED === "true";

const REDIS_HOST_NAME = process.env.REDIS_HOST_NAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_PORT = process.env.REDIS_PORT || 6380;
const REDIS_RESET = process.env.REDIS_RESET;
const REDIS_ENABLED = process.env.REDIS_ENABLED === "true";

const ENTITY_END_POINTS = {
  patient: "contacts",
  contacts: "contacts",
  accounts: "accounts",
  clinicDay: "msemr_slots",
  clinics: "msemr_locations",
  appSetting: "smvs_appsettings",
  localizedWebContents: "smvs_localise_website_ontents",
  appointments: "msemr_appointmentemrs",
  contactPersons: "smvs_contacting_persons",
  healthcareServices: "msemr_healthcareservices",
  eligibilityQuestion: "smvs_eligibilityquestions",
  accountLinkToClinic: "smvs_account_msemr_locationset",
  insuranceOrganization: "smvs_insuranceorganizations",
  screeningsQuestions: "smvs_patientscreeningquestions",
  availabilities: "smvs_appointment_slot_availabilities",
  waitlist: "smvs_waitlists",
  languages: "smvs_language_codes",
  singleUseCode: "smvs_single_use_codes",
  serviceTypes: "smvs_service_types",
  healthcareServiceCategories: "msemr_healthcareservicecategories",
  // serviceEligibilityQuestionsLink: 'smvs_msemr_healthcareservicecategory_smvs_elset',
  serviceEligibilityQuestionsLink: "smvs_eligibilityquestion_msemr_healthcaset",
  // serviceScreeningQuestionsLink: 'smvs_msemr_healthcareservicecategory_smvs_paset',
  serviceScreeningQuestionsLink: "smvs_patientscreeningquestion_msemr_heaset",
  serviceWebsiteContentLink: "smvs_msemr_healthcareservicecategory_smvs_loset",
  serviceToInsuranceOrganizationLink:
    "smvs_msemr_healthcareservicecategory_smvs_inset",
  slotAvailabilityLink: "smvs_slot_appointment_slot_availabilityset",
  slotSubServiceLink: "smvs_msemr_healthcareservice_msemr_slotset",
  claim: "smvs_claims",
};

const config = {
  baseUrl: BASE_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  powerAppsEnvURL: POWERAPPS_ENV_URL,
  authenticationUrl: AUTHENTICATION_URL,
  port: PORT || 3000,
  entity: {
    accounts: `${BASE_URL}/${ENTITY_END_POINTS.accounts}`,
    clinics: `${BASE_URL}/${ENTITY_END_POINTS.clinics}`,
    patient: `${BASE_URL}/${ENTITY_END_POINTS.patient}`,
    patients: `${BASE_URL}/${ENTITY_END_POINTS.contacts}`,
    clinicDay: `${BASE_URL}/${ENTITY_END_POINTS.clinicDay}`,
    appSetting: `${BASE_URL}/${ENTITY_END_POINTS.appSetting}`,
    localizedWebContents: `${BASE_URL}/${ENTITY_END_POINTS.localizedWebContents}`,
    appointments: `${BASE_URL}/${ENTITY_END_POINTS.appointments}`,
    accountLinkToClinic: `${BASE_URL}/${ENTITY_END_POINTS.accountLinkToClinic}`,
    insuranceOrganization: `${BASE_URL}/${ENTITY_END_POINTS.insuranceOrganization}`,
    screeningsQuestions: `${BASE_URL}/${ENTITY_END_POINTS.screeningsQuestions}`,
    availabilities: `${BASE_URL}/${ENTITY_END_POINTS.availabilities}`,
    contactPersons: `${BASE_URL}/${ENTITY_END_POINTS.contactPersons}`,
    waitlist: `${BASE_URL}/${ENTITY_END_POINTS.waitlist}`,
    eligibilityQuestion: `${BASE_URL}/${ENTITY_END_POINTS.eligibilityQuestion}`,
    batchRequest: `${BASE_URL}/$batch`,
    healthcareServices: `${BASE_URL}/${ENTITY_END_POINTS.healthcareServices}`,
    languages: `${BASE_URL}/${ENTITY_END_POINTS.languages}`,
    singleUseCode: `${BASE_URL}/${ENTITY_END_POINTS.singleUseCode}`,
    serviceTypes: `${BASE_URL}/${ENTITY_END_POINTS.serviceTypes}`,
    healthcareServiceCategories: `${BASE_URL}/${ENTITY_END_POINTS.healthcareServiceCategories}`,
    serviceEligibilityQuestionsLink: `${BASE_URL}/${ENTITY_END_POINTS.serviceEligibilityQuestionsLink}`,
    serviceScreeningQuestionsLink: `${BASE_URL}/${ENTITY_END_POINTS.serviceScreeningQuestionsLink}`,
    serviceWebsiteContentLink: `${BASE_URL}/${ENTITY_END_POINTS.serviceWebsiteContentLink}`,
    serviceToInsuranceOrganizationLink: `${BASE_URL}/${ENTITY_END_POINTS.serviceToInsuranceOrganizationLink}`,
    slotAvailabilityLink: `${BASE_URL}/${ENTITY_END_POINTS.slotAvailabilityLink}`,
    slotSubServiceLink: `${BASE_URL}/${ENTITY_END_POINTS.slotSubServiceLink}`,
  },
  eligibilityUser: ELIGIBILITY_USER,
  eligibilityPass: ELIGIBILITY_PASS,
  eligibilityApi: PHICURE_ELIGIBILITY_API,
  captchaSecret: CAPTCHA_SECRET,
  captchaEnabled: CAPTCHA_ENABLED,
  applicationUsers: APPLICATION_USERS,
  timezone: process.env.TIMEZONE,
  redisHostName: REDIS_HOST_NAME,
  redisPassword: REDIS_PASSWORD,
  redisPort: REDIS_PORT,
  redisReset: REDIS_RESET,
  redisEnabled: REDIS_ENABLED,
};

module.exports = config;
