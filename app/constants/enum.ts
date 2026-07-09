/**
 * 系统框架事件枚举
 */
export enum EMitt {
  /**
   * 全局加载
   */
  OnLoading = "onLoading",
  /**
   * 切换语言
   */
  OnSwitchLang = "onSwitchLang",
  /**
   * 设置主题
   */
  OnSetTheme = "onSetTheme"
}

/**
 * 主题设置
 */
export enum EThemeSetting {
  /**
   * 主题色
   */
  ThemeColor = "themeColor",
  /**
   * 暗黑模式
   */
  DarkMode = "darkMode"
}
