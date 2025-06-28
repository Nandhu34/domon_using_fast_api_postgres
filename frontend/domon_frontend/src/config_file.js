

//   const BASE_BACKEND_URL = "https://domonbackend-production.up.railway.app" ;

//   // const BASE_BACKEND_URL="http://127.0.0.1:8000"
// const config = {
//     // globalUrl: BASE_BACKEND_URL,

//     BASE_URL:  "http://localhost:3000",
//     COOKIENAME:"user_data",
//     LOGIN_BACKEND_URL: `${BASE_BACKEND_URL}/v1/auth/login`,
//     REGISTER_BACKEND_URL: `${BASE_BACKEND_URL}/v1/auth/register`,
//     FORGET_PADDWORD_URL: `${BASE_BACKEND_URL}/v1/auth/forget-password`, 
//     RESET_PASSWORD_TOKEN: `${BASE_BACKEND_URL}/v1/auth/reset-password/`,

//     GET_WHOIS_URL: `${BASE_BACKEND_URL}/v1/other_services/get_whois?domain_name=`,
//     GET_DNS_LOOKUP_URL: `${BASE_BACKEND_URL}/v1/other_services/dns_lookup?domain_name=`, 
//     GET_IP_FINDER_URL: `${BASE_BACKEND_URL}/v1/other_services/get_ip?domain_name=`, 
//     GET_MX_RECORD_URL: `${BASE_BACKEND_URL}/v1/other_services/get_mx_record?domain_name=`,
//     GET_REGISTER_SCORE_URL: `${BASE_BACKEND_URL}/v1/other_services/get_register_Score?domain_name=`,

//     INSERT_SCEDULE_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/scedule_domain`, 
//     INSERT_EXPIRATION_SCEDULED_DOMAIN: `${BASE_BACKEND_URL}/v1/scedule/scedule_domain_expiry`,
    
//     GET_SCHEDULED_DOMAINS_URL: `${BASE_BACKEND_URL}/v1/scedule/get_domains?`,
//     GET_EXPIRY_SCHEDULED_DOMAINS_URL: `${BASE_BACKEND_URL}/v1/scedule/get_expiry_domains?`,
    
//     UPDATE_DOMAIN_SCHEDULE_URL: `${BASE_BACKEND_URL}/v1/scedule/update_domain`,
//     UPDATE_DOMAIN_EXPIRY_SCHEDULE_URL: `${BASE_BACKEND_URL}/v1/scedule/update_domain_expiry`,
    
//     PAUSE_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/pause_domain`, 
//     PAUSE_DOMAIN_EXPIRY_URL: `${BASE_BACKEND_URL}/v1/scedule/pause_domain_expiry`,
    
//     UNPAUSE_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/unpause_domain`,
//     UNPAUSE_DOMAIN_EXPIRY_URL: `${BASE_BACKEND_URL}/v1/scedule/unpause_domain_expiry`,
    
//     DELETE_SCHEDULED_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/delete_domain`,
//     DELETE_EXPIRY_SCHEDULED_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/delete_domain_expiry`, 
    
//     GET_ANALYTICS_URL: `${BASE_BACKEND_URL}/v1/analytics/get_analytics`,
//     GET_ALL_KEYWORDS_URL: `${BASE_BACKEND_URL}/v1/analytics/get_all_keywords?email=`,
//     GET_KEYWORDS_RESULT_CHART_URL: `${BASE_BACKEND_URL}/v1/analytics/keyword_result_chart?email=`, 
//     GET_DOMAIN_EXPIRY_CHART_URL: `${BASE_BACKEND_URL}/v1/analytics/get_domain_expiry_chart?email=`, 
//     GET_DOMAIN_IMPERSINATION_CHART_URL: `${BASE_BACKEND_URL}/v1/analytics/get_impersination_chart?email=`,
    
//     UPDATE_USER_DETAILS_URL: `${BASE_BACKEND_URL}/v1/auth/update_user`,
//     DELETE_USER_ACCOUNT_URL: `${BASE_BACKEND_URL}/v1/auth/delete_user`
// };

// export default config;


const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://domonbackend-production.up.railway.app";
const BASE_FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

const config = {
  BASE_URL: BASE_FRONTEND_URL,
  COOKIENAME: "user_data",

  LOGIN_BACKEND_URL: `${BASE_BACKEND_URL}/v1/auth/login`,
  REGISTER_BACKEND_URL: `${BASE_BACKEND_URL}/v1/auth/register`,
  FORGET_PADDWORD_URL: `${BASE_BACKEND_URL}/v1/auth/forget-password`,
  RESET_PASSWORD_TOKEN: `${BASE_BACKEND_URL}/v1/auth/reset-password/`,

  GET_WHOIS_URL: `${BASE_BACKEND_URL}/v1/other_services/get_whois?domain_name=`,
  GET_DNS_LOOKUP_URL: `${BASE_BACKEND_URL}/v1/other_services/dns_lookup?domain_name=`,
  GET_IP_FINDER_URL: `${BASE_BACKEND_URL}/v1/other_services/get_ip?domain_name=`,
  GET_MX_RECORD_URL: `${BASE_BACKEND_URL}/v1/other_services/get_mx_record?domain_name=`,
  GET_REGISTER_SCORE_URL: `${BASE_BACKEND_URL}/v1/other_services/get_register_Score?domain_name=`,

  INSERT_SCEDULE_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/scedule_domain`,
  INSERT_EXPIRATION_SCEDULED_DOMAIN: `${BASE_BACKEND_URL}/v1/scedule/scedule_domain_expiry`,
  
  GET_SCHEDULED_DOMAINS_URL: `${BASE_BACKEND_URL}/v1/scedule/get_domains?`,
  GET_EXPIRY_SCHEDULED_DOMAINS_URL: `${BASE_BACKEND_URL}/v1/scedule/get_expiry_domains?`,
  
  UPDATE_DOMAIN_SCHEDULE_URL: `${BASE_BACKEND_URL}/v1/scedule/update_domain`,
  UPDATE_DOMAIN_EXPIRY_SCHEDULE_URL: `${BASE_BACKEND_URL}/v1/scedule/update_domain_expiry`,
  
  PAUSE_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/pause_domain`,
  PAUSE_DOMAIN_EXPIRY_URL: `${BASE_BACKEND_URL}/v1/scedule/pause_domain_expiry`,
  
  UNPAUSE_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/unpause_domain`,
  UNPAUSE_DOMAIN_EXPIRY_URL: `${BASE_BACKEND_URL}/v1/scedule/unpause_domain_expiry`,
  
  DELETE_SCHEDULED_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/delete_domain`,
  DELETE_EXPIRY_SCHEDULED_DOMAIN_URL: `${BASE_BACKEND_URL}/v1/scedule/delete_domain_expiry`,

  GET_ANALYTICS_URL: `${BASE_BACKEND_URL}/v1/analytics/get_analytics`,
  GET_ALL_KEYWORDS_URL: `${BASE_BACKEND_URL}/v1/analytics/get_all_keywords?email=`,
  GET_KEYWORDS_RESULT_CHART_URL: `${BASE_BACKEND_URL}/v1/analytics/keyword_result_chart?email=`,
  GET_DOMAIN_EXPIRY_CHART_URL: `${BASE_BACKEND_URL}/v1/analytics/get_domain_expiry_chart?email=`,
  GET_DOMAIN_IMPERSINATION_CHART_URL: `${BASE_BACKEND_URL}/v1/analytics/get_impersination_chart?email=`,

  UPDATE_USER_DETAILS_URL: `${BASE_BACKEND_URL}/v1/auth/update_user`,
  DELETE_USER_ACCOUNT_URL: `${BASE_BACKEND_URL}/v1/auth/delete_user`,
};

export default config;
