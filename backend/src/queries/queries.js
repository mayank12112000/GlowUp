// role master
export const SELECT_ROLES = "select a.role_seq,a.role_name,a.role_code,b.username as created_by from role_master a left join users b on a.created_by = b.user_seq"
export const ADD_ROLE = 'insert into role_master (is_admin,is_employee,role_code,role_name,created_by,created_on,updated_on) values(?,?,?,?,?,now(),now())'
export const SELECT_ROLE = "select * from role_master where role_code = lower(?) or role_name=lower(?)"
export const SELECT_UNIQUE_ROLE = "select role_seq,role_code,role_name,is_employee,is_admin from role_master where role_seq = ?"
export const UPDATE_ROLE = "update role_master set role_code = ?, role_name=?,is_admin = ?, is_employee = ?, updated_on = now(), updated_by = ? where role_seq = ?"
// register user
export const SELECT_SINGLE_USER = 'select b.role_code,a.user_seq from users a left join role_master b on a.role_seq = b.role_seq where user_seq = ?'
export const SELECT_USER = "select * from users where username = lower(?) or email = lower(?) or mobile = ? and isactive = true"
export const CREATE_USER = "insert into users (username,email,password,name,mobile,role_seq,isactive,created_at,updated_at) values (?,?,?,?,?,?,?,now(),now())"
export const SELECT_USER_ROLE = 'select b.role_code from users a left join role_master b on a.role_seq = b.role_seq where user_seq = ?'
export const SELECT_EMP_ROLE_SEQ = "select role_seq as roleSeq from role_master where role_code = 'emp'"
export const CREATE_EMPLOYEE = "insert into employee_master (name,user_seq,created_by,created_at,updated_at) values(?,?,?,now(),now())"
// register employee
export const SELECT_USER_SEQ = "select user_seq as empUserSeq from users where username= ?"
export const SELECT_EMPLOYEE = "select date(e.created_at) as createdAt,e.employee_seq as employeeSeq,u.email as email,u.mobile  as mobile,u.username as username,u.name as name,u.isactive as isActive , srm.sub_role_name from employee_master e left join users u on e.user_seq = u.user_seq left join sub_role_master srm on srm.sub_role_master_seq = e.sub_role_master_seq"
// product master
export const SELECT_PRODUCT = "select * from product_master"
export const ADD_PRODUCT = "insert into product_master (product_name,is_active,price,discount_percent,product_type_seq,hours,minutes,created_by,updated_by,created_on,updated_on) values(?,?,?,?,?,?,?,?,?,now(),now())"
// logout user
export const SELECT_USER_BY_USER_SEQ = "select * from users where user_seq = ?"
export const REMOVE_TOKENS = "update user_tokens set access_token = null,refresh_token=null where user_seq = ?"
// get current role
export const GET_CURRENT_USER_ROLE = "select b.role_code from users a left join role_master b on a.role_seq = b.role_seq where user_seq = ?"

// branch master
export const SELECT_BRANCHES = "select * from branch_master"
export const SELECT_BRANCH = "select * from branch_master where branch_name = ?"
export const ADD_BRANCH = "insert into branch_master (branch_name,branch_address) values(?,?)"
// service type master
export const SELECT_SERVICE_TYPE = "select a.service_type_seq, a.service_type_name,b.username as created_by from service_type_master a left join users b on a.created_by = b.user_seq where service_type_name like ?"
export const ADD_SERVICE_TYPE = "insert into service_type_master (service_type_name,is_active,created_by,created_on,updated_on) values(?,?,?,now(),now())"

// service master
export const SELECT_SERVICE_NAME = "select service_name from service_master where service_name = ?"
export const SELECT_SERVICES = "select a.service_seq,a.hours,a.minutes, a.service_name,b.username as created_by,a.price,a.discount_percent, c.service_type_name from service_master a left join users b on a.created_by = b.user_seq left join service_type_master c on a.service_type_seq = c.service_type_seq where service_name like ?"
export const SELECT_SERVICE_FROM_SERVICESEQ = "select a.service_seq,a.hours,a.minutes, a.service_name,b.username as created_by,a.price,a.discount_percent, c.service_type_name from service_master a left join users b on a.created_by = b.user_seq left join service_type_master c on a.service_type_seq = c.service_type_seq where service_seq = ?"

export const SELECT_SERVICE = "select a.service_seq,a.hours,a.minutes, a.service_name,a.price,a.discount_percent from service_master a where service_type_seq = ? and is_active = true"
export const ADD_SERVICE = "insert into service_master (service_name,is_active,price,discount_percent,service_type_seq,hours,minutes,created_by,updated_by,created_on,updated_on) values(?,?,?,?,?,?,?,?,?,now(),now())"

// reviews
export const SELECT_REVIEWS = 'select r.review_master_seq,r.review,u.name,r.rating,date(r.created_at) as date from review_master r left join users u on r.user_seq = u.user_seq order by rating desc'
// tokens
export const INSERT_TOKENS = "insert into user_tokens(user_seq,access_token,refresh_token,created_at,updated_at) values(?,?,?,now(),now())"
export const UDPATE_TOKENS = "update  user_tokens set access_token=?,refresh_token=?,created_at=now(),updated_at=now() where user_seq = ?"
export const SELECT_TOKEN = "select * from user_tokens where user_seq = ?"
