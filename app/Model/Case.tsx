import { imageMapping } from '../Constant/images';

export default interface Case {
    description: string;
    image: keyof typeof imageMapping;
}