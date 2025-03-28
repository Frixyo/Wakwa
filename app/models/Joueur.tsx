import { playerImageMapping } from '../constants/images';

export default interface Joueur {
    id: number;
    name: string;
    image: keyof typeof playerImageMapping;
}
