import { motion } from "framer-motion"

// function ThemeToggle() {
//   const { isDark, toggleDark } = useDark()
//   return (
//     <li onClick={toggleDark} className="cursor-pointer [&_*]:cursor-pointer transition-all">
//       <span className={$("inline-block", isDark ? "i-ph-moon-stars-duotone" : "i-ph-sun-dim-duotone")} />
//       <span>
//         {isDark ? "浅色模式" : "深色模式"}
//       </span>
//     </li>
//   )
// }

export function Menu() {
  const { loggedIn, login, logout, userInfo, enableLogin } = useLogin()
  const [shown, show] = useState(false)
  return (
    <span className="relative" onMouseEnter={() => show(true)} onMouseLeave={() => show(false)}>
      <span className="flex items-center scale-90">
        {
          enableLogin && loggedIn && userInfo.avatar
            ? (
                <button
                  type="button"
                  aria-label="打开菜单"
                  className="h-8 w-8 rounded-xl bg-cover"
                  style={
                    {
                      backgroundImage: `url(${userInfo.avatar}&s=24)`,
                    }
                  }
                >
                </button>
              )
            : (
                <button type="button" aria-label="打开菜单" className="btn icon-btn">
                  <span className="i-si-more-muted-horiz-circle-duotone" />
                </button>
              )
        }
      </span>
      {shown && (
        <div className="absolute right-0 z-99 bg-transparent pt-4 top-4">
          <motion.div
            id="dropdown-menu"
            className={$([
              "w-220px",
              "backdrop-blur-5 rounded-2xl",
            ])}
            style={{
              border: "1px solid var(--nn-border-strong)",
              background: "var(--nn-surface-strong)",
              boxShadow: "var(--nn-shadow)",
            }}
            initial={{
              scale: 0.9,
            }}
            animate={{
              scale: 1,
            }}
          >
            <ol className="p-2 rounded-2xl color-base text-sm">
              {enableLogin && (loggedIn
                ? (
                  <li onClick={logout}>
                      <span className="i-ph-sign-out-duotone inline-block" />
                      <span>退出登录</span>
                    </li>
                  )
                : (
                    <li onClick={login}>
                      <span className="i-ph-sign-in-duotone inline-block" />
                      <span>Github 账号登录</span>
                    </li>
                  ))}
              {/* <ThemeToggle /> */}
              <li onClick={() => window.open(Homepage)} className="cursor-pointer [&_*]:cursor-pointer transition-all">
                <span className="i-ph-github-logo-duotone inline-block" />
                <span>项目仓库</span>
              </li>
              <li onClick={() => window.open(`${Homepage}/releases/tag/v${Version}`)} className="cursor-pointer [&_*]:cursor-pointer transition-all">
                <span className="i-ph-tag-duotone inline-block" />
                <span>{`当前版本 v${Version}`}</span>
              </li>
            </ol>
          </motion.div>
        </div>
      )}
    </span>
  )
}
