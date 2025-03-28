import { imageMapping } from '../constants/images';

export default interface Case {
    description: string;
    image: keyof typeof imageMapping;
}