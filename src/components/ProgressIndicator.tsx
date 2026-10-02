interface ProgressIndicatorProps { current: number; total: number }
export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return <p className="progress" aria-label={`${current} de ${total} dinosaurios clasificados`}><strong>{current} / {total}</strong><span aria-hidden="true"> · {Array.from({ length: total }, (_, i) => <i key={i} className={i < current ? 'done' : ''} />)}</span></p>
}
