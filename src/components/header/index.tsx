import { Link } from "@tanstack/react-router"
import { useIsFetching } from "@tanstack/react-query"
import type { SourceID } from "@shared/types"
import { NavBar } from "../navbar"
import { Menu } from "./menu"
import { currentSourcesAtom, goToTopAtom } from "~/atoms"

function GoTop() {
  const { ok, fn: goToTop } = useAtomValue(goToTopAtom)
  return (
    <button
      type="button"
      title="Go To Top"
      aria-label="回到顶部"
      className={$("icon-btn", ok ? "op-65 btn" : "op-0")}
      onClick={goToTop}
    >
      <span className="i-ph-arrow-fat-up-duotone" />
    </button>
  )
}

function Github() {
  return (
    <button type="button" title="Github" aria-label="打开项目仓库" className="btn icon-btn" onClick={() => window.open(Homepage)}>
      <span className="i-ph-github-logo-duotone" />
    </button>
  )
}

function Refresh() {
  const currentSources = useAtomValue(currentSourcesAtom)
  const { refresh } = useRefetch()
  const refreshAll = useCallback(() => refresh(...currentSources), [refresh, currentSources])

  const isFetching = useIsFetching({
    predicate: (query) => {
      const [type, id] = query.queryKey as ["source" | "entire", SourceID]
      return (type === "source" && currentSources.includes(id)) || type === "entire"
    },
  })

  return (
    <button
      type="button"
      title="Refresh"
      aria-label="刷新当前频道"
      className="btn icon-btn"
      onClick={refreshAll}
    >
      <span className={$(isFetching ? "animate-spin i-ph-circle-dashed-duotone" : "i-ph-arrow-counter-clockwise-duotone")} />
    </button>
  )
}

export function Header() {
  return (
    <>
      <span className="flex justify-self-start">
        <Link to="/" className="brand-lockup" title="NowDesk">
          <span className="brand-mark" aria-hidden="true">
            <span className="i-ph-newspaper-clipping-duotone text-2xl" />
          </span>
          <span className="brand-copy">
            <span className="brand-kicker">personal edition</span>
            <span className="brand-title">
              <span>Now</span>
              <strong>Desk</strong>
            </span>
          </span>
        </Link>
        <a target="_blank" rel="noopener noreferrer" href={`${Homepage}/releases/tag/v${Version}`} className="version-pill ml-3">
          {`v${Version}`}
        </a>
      </span>
      <span className="justify-self-center">
        <span className="hidden md:(inline-block)">
          <NavBar />
        </span>
      </span>
      <span className="action-cluster">
        <GoTop />
        <Refresh />
        <Github />
        <Menu />
      </span>
    </>
  )
}
