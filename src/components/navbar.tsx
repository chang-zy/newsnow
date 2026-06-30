import { fixedColumnIds, metadata } from "@shared/metadata"
import { Link } from "@tanstack/react-router"
import { currentColumnIDAtom } from "~/atoms"

const columnIcons = {
  focus: "i-ph-star-duotone",
  hottest: "i-ph-flame-duotone",
  realtime: "i-ph-broadcast-duotone",
  updated: "i-ph-clock-counter-clockwise-duotone",
} as const

export function NavBar() {
  const currentId = useAtomValue(currentColumnIDAtom)
  const { toggle } = useSearchBar()
  return (
    <span
      role="navigation"
      aria-label="新闻频道"
      className="nav-rail"
    >
      <button
        type="button"
        onClick={() => toggle(true)}
        className="nav-item"
      >
        <span className="i-ph-magnifying-glass-duotone" aria-hidden="true" />
        <span>更多</span>
      </button>
      {fixedColumnIds.map(columnId => (
        <Link
          key={columnId}
          to="/c/$column"
          params={{ column: columnId }}
          className={$(
            "nav-item",
            currentId === columnId && "nav-item-active font-700",
          )}
        >
          <span className={columnIcons[columnId]} aria-hidden="true" />
          {metadata[columnId].name}
        </Link>
      ))}
    </span>
  )
}
