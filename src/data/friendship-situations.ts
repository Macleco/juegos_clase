export type FriendshipSignal = 'green' | 'yellow' | 'red'

export interface FriendshipSituation {
  id: string
  text: string
  signal: FriendshipSignal
  image: string
}

export const FRIENDSHIP_SITUATIONS: readonly FriendshipSituation[] = [
  { id: 'abrazar', text: 'Me dan un abrazo cuando yo quiero.', signal: 'green', image: 'imagenes_amistad/abrazar.png' },
  { id: 'hablar-bonito', text: 'Me hablan con cariño y respeto.', signal: 'green', image: 'imagenes_amistad/hablar_bonito.jpg' },
  { id: 'jugar', text: 'Jugamos juntos y lo pasamos bien.', signal: 'green', image: 'imagenes_amistad/jugar.png' },
  { id: 'respeto', text: 'Respetan lo que digo y lo que siento.', signal: 'green', image: 'imagenes_amistad/respeto.jpg' },
  { id: 'cromos', text: 'No me gusta que cojan mis cromos sin permiso.', signal: 'yellow', image: 'imagenes_amistad/cromos.png' },
  { id: 'gritar', text: 'Me gritan y me hacen sentir mal.', signal: 'yellow', image: 'imagenes_amistad/gritar.png' },
  { id: 'no-hablar', text: 'Dejan de hablarme para hacerme sentir mal.', signal: 'yellow', image: 'imagenes_amistad/no_hablar.jpg' },
  { id: 'burla', text: 'Se burlan de mí para hacerme daño.', signal: 'red', image: 'imagenes_amistad/burla.png' },
  { id: 'molestar-fuerte', text: 'Me molestan y no respetan que pare.', signal: 'yellow', image: 'imagenes_amistad/molestar.png' },
  { id: 'no-incluye', text: 'Me excluyen del grupo a propósito.', signal: 'red', image: 'imagenes_amistad/no_incluye.jpg' },
  { id: 'quitar', text: 'Me quitan mis cosas sin permiso.', signal: 'red', image: 'imagenes_amistad/quitar.png' },
  { id: 'chantaje', text: 'Me chantajean para que haga algo que no quiero.', signal: 'red', image: 'imagenes_amistad/chantaje.jpg' },
  { id: 'empujar', text: 'Me empujan o me hacen daño.', signal: 'red', image: 'imagenes_amistad/empujar.png' },
  { id: 'pegar', text: 'Me pegan y tengo que pedir ayuda.', signal: 'red', image: 'imagenes_amistad/pegar.png' },
]
