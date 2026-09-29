export default function ToolBadge({ tool, size = 'md' }) {
  const hasIcon = Boolean(tool.icon);
  return (
    <span
      className={`tool-badge tool-${size} ${hasIcon ? 'has-icon' : ''} ${tool.wide ? 'is-wide' : ''}`}
      title={tool.name}
    >
      {hasIcon ? (
        <img src={tool.icon} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="tool-abbr" aria-hidden="true">{tool.abbr}</span>
      )}
    </span>
  );
}
