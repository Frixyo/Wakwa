import { playerImageMapping } from '../Constant/images';

export default interface Joueur {
    name: string;
    image: keyof typeof playerImageMapping;
}
