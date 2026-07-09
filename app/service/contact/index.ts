import baseService from "@/service/baseService"

/**
 * 联系表单入参 - 与 node/server.js POST /api/contact 严格对齐
 * 必填: name, email, company, phone, product
 * 可选: role (v8 扩展字段,node 后端不消费), message
 */
export interface SubmitContactFormData {
  name: string
  email: string
  company: string
  phone: string
  product: string
  role?: string
  message?: string
}

/**
 * 提交联系表单
 * 调用 node/server.js POST /api/contact
 * 服务端行为: 写入飞书多维表格 + 发送邮件通知
 */
export const submitContactForm = (data: SubmitContactFormData) => {
  return baseService.post("/api/contact", data)
}

/**
 * 获取联系信息(预留,目前 server 端未实现 GET /api/contact/info)
 */
export const getContactInfo = () => {
  return baseService.get("/api/contact/info")
}
