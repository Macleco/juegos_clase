export type Diet = 'herbivore' | 'carnivore'

export interface Dinosaur {
  id: string
  name: string
  diet: Diet
  image?: string
}

export const DINOSAURS: readonly Dinosaur[] = [
  { id: 'triceratops', name: 'Triceratops', diet: 'herbivore' },
  { id: 'diplodocus', name: 'Diplodocus', diet: 'herbivore' },
  { id: 'brachiosaurus', name: 'Brachiosaurus', diet: 'herbivore' },
  { id: 'stegosaurus', name: 'Stegosaurus', diet: 'herbivore' },
  { id: 'ankylosaurus', name: 'Ankylosaurus', diet: 'herbivore' },
  { id: 'parasaurolophus', name: 'Parasaurolophus', diet: 'herbivore' },
  { id: 'tyrannosaurus-rex', name: 'Tyrannosaurus Rex', diet: 'carnivore' },
  { id: 'velociraptor', name: 'Velociraptor', diet: 'carnivore' },
  { id: 'spinosaurus', name: 'Spinosaurus', diet: 'carnivore' },
  { id: 'allosaurus', name: 'Allosaurus', diet: 'carnivore' },
  { id: 'carnotaurus', name: 'Carnotaurus', diet: 'carnivore' },
  { id: 'dilophosaurus', name: 'Dilophosaurus', diet: 'carnivore' },
]
