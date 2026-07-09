import { ref, reactive } from "vue"
import { submitContactForm } from "@/service/contact"

/**
 * 联系表单状态(空字段、loading 状态、提交结果)
 */
export type ContactStatus = "idle" | "loading" | "success" | "error"

/**
 * 联系表单字段 - 与 node/server.js /api/contact 入参一致
 * (name, email, company, phone, product, message)
 */
export interface ContactForm {
  name: string
  email: string
  company: string
  phone: string
  product: string         // 关注的产品(收益管理 / 运价管理 / ...)
  role: string             // 您的角色(收益总监 / CIO / ...) - v8 扩展,node 不消费
  message: string
}

/**
 * 空表单初始值
 */
const emptyForm = (): ContactForm => ({
  name: "",
  email: "",
  company: "",
  phone: "",
  product: "",
  role: "",
  message: ""
})

/**
 * 联系表单组合式函数
 * 走规范 service/contact 链路调用 /api/contact
 * 区分 4 种 status + 统一错误处理
 */
export const useContactForm = () => {
  const form = reactive<ContactForm>(emptyForm())
  const status = ref<ContactStatus>("idle")
  const errorMessage = ref("")

  const reset = () => {
    Object.assign(form, emptyForm())
    status.value = "idle"
    errorMessage.value = ""
  }

  const submit = async (): Promise<boolean> => {
    // 客户端预校验 (与 node 端 /api/contact 校验对齐)
    if (!form.name.trim() || !form.email.trim() || !form.company.trim() || !form.phone.trim() || !form.product) {
      status.value = "error"
      errorMessage.value = "请填写完整信息 (姓名/邮箱/公司/电话/关注产品)"
      return false
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(form.email)) {
      status.value = "error"
      errorMessage.value = "邮箱格式不正确"
      return false
    }
    const phoneRe = /^[+\d\s-()]{6,20}$/
    if (!phoneRe.test(form.phone)) {
      status.value = "error"
      errorMessage.value = "电话格式不正确"
      return false
    }

    status.value = "loading"
    errorMessage.value = ""
    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        product: form.product,
        role: form.role,
        message: form.message
      })
      status.value = "success"
      return true
    } catch (err: any) {
      status.value = "error"
      // 区分网络错误 / HTTP 4xx / 5xx
      if (err?.statusCode === 400) {
        errorMessage.value = err?.data?.message || "提交信息不完整"
      } else if (err?.statusCode >= 500) {
        errorMessage.value = "服务器错误,请稍后重试或邮件联系 contact@mitoaitech.com"
      } else if (err?.message) {
        errorMessage.value = `网络错误: ${err.message}`
      } else {
        errorMessage.value = "提交失败,请稍后重试"
      }
      console.error("[useContactForm] submit failed:", err)
      return false
    }
  }

  return {
    form,
    status,
    errorMessage,
    submit,
    reset
  }
}
