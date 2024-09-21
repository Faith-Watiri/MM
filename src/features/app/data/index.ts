/* eslint-disable prettier/prettier */
import Painting from '../../../assets/painting.jpg';
import Drawing from '../../../assets/drawing.jpg';
import Sculpture from '../../../assets/sculpture.jpg';
import Photography from '../../../assets/photography.jpg';
import DigitalArt from '../../../assets/digital.jpg';

const width = 150;

export const categories = [
  {
    id: 1,
    name: 'Painting',
    image: Painting,
    imgHeight: 300,
    imgWidth: width,
  },
  {
    id: 2,
    name: 'Sculpture',
    image: Sculpture,
    imgHeight: 250,
    imgWidth: width,
  },
  {
    id: 3,
    name: 'Photography',
    image: Photography,
    imgHeight: 160,
    imgWidth: width,
  },
  {
    id: 4,
    name: 'Drawings',
    image: Drawing,
    imgHeight: 300,
    imgWidth: width,
  },
  {
    id: 5,
    name: 'Digital Art',
    image: DigitalArt,
    imgHeight: 300,
    imgWidth: width,
  },
];
