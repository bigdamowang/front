import { ref } from "vue"
import { submitContactForm } from "@/service/contact"

/**
 * 联系表单组合式函数
 */
export const useContactForm = () => {
  const form = ref({
    name: "",
    email: "",
    message: ""
  })

  const loading = ref(false)
  const submitted = ref(false)

  const handleSubmit = async () => {
    loading.value = true
    try {
      await submitContactForm(form.value)
      submitted.value = true
      form.value = { name: "", email: "", message: "" }
    } catch (error) {
      console.error("提交失败:", error)
    } finally {
      loading.value = false
    }
  }

  const resetForm = () => {
    form.value = { name: "", email: "", message: "" }
    submitted.value = false
  }

  return {
    form,
    loading,
    submitted,
    handleSubmit,
    resetForm
  }
}
