// role master
export const SELECT_ROLES = "SELECT a.role_seq,a.role_name,a.role_code,b.username as created_by FROM ROLE a left join users b on a.created_by = b.user_seq"
export const ADD_ROLE = 'INSERT INTO ROLE (IS_ADMIN,IS_EMPLOYEE,ROLE_CODE,ROLE_NAME,CREATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,NOW(),NOW())'
export const SELECT_ROLE = "SELECT * FROM ROLE WHERE ROLE_CODE = LOWER(?) OR ROLE_NAME=LOWER(?)"
export const SELECT_UNIQUE_ROLE = "SELECT role_seq,role_code,role_name,is_employee,is_admin FROM ROLE WHERE ROLE_SEQ = ?"
export const UPDATE_ROLE = "UPDATE ROLE SET ROLE_CODE = ?, ROLE_NAME=?,IS_ADMIN = ?, IS_EMPLOYEE = ?, UPDATED_ON = NOW(), UPDATED_BY = ? WHERE ROLE_SEQ = ?"
// register user
export const SELECT_SINGLE_USER = 'SELECT B.ROLE_CODE,A.USER_SEQ FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?'
export const SELECT_USER = "SELECT * FROM USERS WHERE USERNAME = LOWER(?) OR EMAIL = LOWER(?) OR MOBILE = ?"
export const CREATE_USER = "INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,NAME,MOBILE,ROLE_SEQ,CREATED_AT,UPDATED_AT) VALUES (?,?,?,?,?,?,NOW(),NOW())"
export const SELECT_USER_ROLE = 'SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?'
// LOGOUT USER
export const SELECT_USER_BY_USER_SEQ = "SELECT * FROM USERS WHERE USER_SEQ = ?"
export const REMOVE_TOKENS = "UPDATE user_tokens SET access_token = null,refresh_token=null WHERE user_seq = ?"
// get current role
export const GET_CURRENT_USER_ROLE = "SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?"

// branch master
export const SELECT_BRANCHES = "SELECT * FROM BRANCH_MASTER"
export const SELECT_BRANCH = "SELECT * FROM BRANCH_MASTER WHERE BRANCH_NAME = ?"
export const ADD_BRANCH = "INSERT INTO BRANCH_MASTER (BRANCH_NAME,BRANCH_ADDRESS) VALUES(?,?)"
// service type master
export const SELECT_SERVICE_TYPE = "SELECT * FROM SERVICE_TYPE_MASTER WHERE SERVICE_TYPE_NAME LIKE ?"
export const ADD_SERVICE_TYPE = "INSERT INTO SERVICE_TYPE_MASTER (SERVICE_TYPE_NAME,CREATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,NOW(),NOW())"
// tokens
export const INSERT_TOKENS = "INSERT INTO USER_TOKENS(USER_SEQ,ACCESS_TOKEN,REFRESH_TOKEN,CREATED_AT,UPDATED_AT) VALUES(?,?,?,NOW(),NOW())"
export const UDPATE_TOKENS = "UPDATE  USER_TOKENS SET ACCESS_TOKEN=?,REFRESH_TOKEN=?,CREATED_AT=NOW(),UPDATED_AT=NOW() WHERE USER_SEQ = ?"
export const SELECT_TOKEN = "SELECT * FROM USER_TOKENS WHERE USER_SEQ = ?"

