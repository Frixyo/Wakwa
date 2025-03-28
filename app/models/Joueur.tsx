import { playerImageMapping } from '../constants/images';

export default interface Joueur {
    name: string;
    image: keyof typeof playerImageMapping;
}
