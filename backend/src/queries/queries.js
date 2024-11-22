const SELECT_ROLES = "SELECT * FROM ROLE"
// register user
const SELECT_USER = "SELECT * FROM USERS WHERE USERNAME = LOWER(?) OR EMAIL = LOWER(?) OR MOBILE = ?"
const CREATE_USER = "INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,NAME,MOBILE,ROLE_SEQ,CREATED_AT,UPDATED_AT) VALUES (?,?,?,?,?,?,NOW(),NOW())"
const SELECT_USER_ROLE = 'SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?'


// tokens
const INSERT_TOKENS = "INSERT INTO USER_TOKENS(USER_SEQ,ACCESS_TOKEN,REFRESH_TOKEN,CREATED_AT,UPDATED_AT) VALUES(?,?,?,NOW(),NOW())"
const UDPATE_TOKENS = "UPDATE  USER_TOKENS SET ACCESS_TOKEN=?,REFRESH_TOKEN=?,CREATED_AT=NOW(),UPDATED_AT=NOW() WHERE USER_SEQ = ?"
const SELECT_TOKEN = "SELECT * FROM USER_TOKENS WHERE USER_SEQ = ?"

export {SELECT_USER_ROLE,SELECT_ROLES,SELECT_USER,CREATE_USER,INSERT_TOKENS,SELECT_TOKEN,UDPATE_TOKENS}