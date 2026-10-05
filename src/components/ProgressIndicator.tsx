interface ProgressIndicatorProps { current: number; total: number; label?: string }
export function ProgressIndicator({ current, total, label = 'dinosaurios clasificados' }: ProgressIndicatorProps) {
  return <p className="progress" aria-label={`${current} de ${total} ${label}`}><strong>{current} / {total}</strong><span aria-hidden="true"> · {Array.from({ length: total }, (_, i) => <i key={i} className={i < current ? 'done' : ''} />)}</span></p>
}
