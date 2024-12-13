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
export const SELECT_SERVICE_TYPE = "SELECT a.service_type_seq, a.service_type_name,b.username as created_by FROM SERVICE_TYPE_MASTER a left join users b on a.created_by = b.user_seq WHERE SERVICE_TYPE_NAME LIKE ?"
export const ADD_SERVICE_TYPE = "INSERT INTO SERVICE_TYPE_MASTER (SERVICE_TYPE_NAME,IS_ACTIVE,CREATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,NOW(),NOW())"

// service master
export const SELECT_SERVICE_NAME = "SELECT SERVICE_NAME FROM SERVICE_MASTER WHERE SERVICE_NAME = ?"
export const SELECT_SERVICES = "SELECT A.service_seq,a.hours,a.minutes, A.service_name,B.username AS created_by,a.price,a.discount_percent, C.service_type_name FROM SERVICE_MASTER A LEFT JOIN USERS B ON A.CREATED_BY = B.USER_SEQ LEFT JOIN SERVICE_TYPE_MASTER C ON A.SERVICE_TYPE_SEQ = C.SERVICE_TYPE_SEQ WHERE SERVICE_NAME LIKE ?"
export const SELECT_SERVICE = "SELECT A.service_seq,a.hours,a.minutes, A.service_name,a.price,a.discount_percent FROM SERVICE_MASTER A WHERE SERVICE_TYPE_SEQ = ? and is_Active = true"
export const ADD_SERVICE = "INSERT INTO SERVICE_MASTER (SERVICE_NAME,IS_ACTIVE,PRICE,DISCOUNT_PERCENT,SERVICE_TYPE_SEQ,HOURS,MINUTES,CREATED_BY,UPDATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,?,?,?,?,NOW(),NOW())"

// tokens
export const INSERT_TOKENS = "INSERT INTO USER_TOKENS(USER_SEQ,ACCESS_TOKEN,REFRESH_TOKEN,CREATED_AT,UPDATED_AT) VALUES(?,?,?,NOW(),NOW())"
export const UDPATE_TOKENS = "UPDATE  USER_TOKENS SET ACCESS_TOKEN=?,REFRESH_TOKEN=?,CREATED_AT=NOW(),UPDATED_AT=NOW() WHERE USER_SEQ = ?"
export const SELECT_TOKEN = "SELECT * FROM USER_TOKENS WHERE USER_SEQ = ?"

