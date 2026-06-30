export function Footer() {
  return (
    <>
      <span>NowDesk personal edition</span>
      <span>
        <span>© 2026 </span>
        <a href={Author.url} target="_blank" rel="noopener noreferrer">
          {Author.name}
        </a>
        <span> · </span>
        <a href={`${Homepage}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">MIT LICENSE</a>
      </span>
    </>
  )
}
