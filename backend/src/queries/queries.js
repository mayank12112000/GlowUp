export const SELECT_ROLES = "SELECT * FROM ROLE"
 // register user
export const SELECT_SINGLE_USER = "SELECT USER_SEQ FROM USERS WHERE USER_SEQ = ?"
export const SELECT_USER = "SELECT * FROM USERS WHERE USERNAME = LOWER(?) OR EMAIL = LOWER(?) OR MOBILE = ?"
export const CREATE_USER = "INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,NAME,MOBILE,ROLE_SEQ,CREATED_AT,UPDATED_AT) VALUES (?,?,?,?,?,?,NOW(),NOW())"
export const SELECT_USER_ROLE = 'SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?'
 // LOGOUT USER
export const SELECT_USER_BY_USER_SEQ = "SELECT * FROM USERS WHERE USER_SEQ = ?"
export const REMOVE_TOKENS = "UPDATE user_tokens SET access_token = null,refresh_token=null WHERE user_seq = ?"
// get current role
export const GET_CURRENT_USER_ROLE = "SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?"
// tokens
export const INSERT_TOKENS = "INSERT INTO USER_TOKENS(USER_SEQ,ACCESS_TOKEN,REFRESH_TOKEN,CREATED_AT,UPDATED_AT) VALUES(?,?,?,NOW(),NOW())"
export const UDPATE_TOKENS = "UPDATE  USER_TOKENS SET ACCESS_TOKEN=?,REFRESH_TOKEN=?,CREATED_AT=NOW(),UPDATED_AT=NOW() WHERE USER_SEQ = ?"
export const SELECT_TOKEN = "SELECT * FROM USER_TOKENS WHERE USER_SEQ = ?"

