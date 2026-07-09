import baseService from "@/service/baseService"

/**
 * 提交联系表单
 */
export const submitContactForm = (data: {
  name: string
  email: string
  company?: string
  role?: string
  message: string
}) => {
  return baseService.post("/api/contact", data)
}

/**
 * 获取联系信息
 */
export const getContactInfo = () => {
  return baseService.get("/api/contact/info")
}
