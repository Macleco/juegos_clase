export type FriendshipSignal = 'green' | 'yellow' | 'red'

export interface FriendshipSituation {
  id: string
  text: string
  signal: FriendshipSignal
}

export const FRIENDSHIP_SITUATIONS: readonly FriendshipSituation[] = [
  { id: 'listen', text: 'Mi amiga me escucha cuando le cuento algo.', signal: 'green' },
  { id: 'share', text: 'Compartimos los juguetes y decidimos a qué jugar.', signal: 'green' },
  { id: 'help', text: 'Un amigo me ayuda cuando lo necesito.', signal: 'green' },
  { id: 'exclude', text: 'No me dejan participar en el juego.', signal: 'yellow' },
  { id: 'tease', text: 'Se ríen de mí por algo que no me gusta.', signal: 'yellow' },
  { id: 'take-turn', text: 'Cogen mis cosas sin preguntarme.', signal: 'yellow' },
  { id: 'hurt', text: 'Me pegan, me empujan o me hacen daño.', signal: 'red' },
  { id: 'threaten', text: 'Me amenazan para que haga algo que no quiero.', signal: 'red' },
  { id: 'secret', text: 'Me piden guardar un secreto que me hace sentir mal.', signal: 'red' },
]
