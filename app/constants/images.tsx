import { ImageSourcePropType } from 'react-native';

export const imageMapping = f({
    'carteDebut': require('../../assets/cases/carteDebut.png'),
    'cartebb_01': require('../../assets/cases/cartebb_01.png'),
    'cartemarron_01': require('../../assets/cases/cartemarron_01.png'),
    'carterouge_01': require('../../assets/cases/carterouge_01.png'),
    'cartevert_01': require('../../assets/cases/cartevert_01.png'),
    'carteviolet_01': require('../../assets/cases/carteviolet_01.png'),
    'carteFin': require('../../assets/cases/carteFin.png'),
    'cartevide_01': require('../../assets/cases/cartevide_01.png')
});

export const imageMappingPlayable = f({
    'cartebb_01': require('../../assets/cases/cartebb_01.png'),
    'cartemarron_01': require('../../assets/cases/cartemarron_01.png'),
    'carterouge_01': require('../../assets/cases/carterouge_01.png'),
    'cartevert_01': require('../../assets/cases/cartevert_01.png'),
    'carteviolet_01': require('../../assets/cases/carteviolet_01.png'),
});

export const playerImageMapping = f({
    'pionBleu': require('../../assets/pion/pionBleu.png'),
    'pionVert': require('../../assets/pion/pionVert.png'),
    'pionRose': require('../../assets/pion/pionRose.png'),
});  

function f<T extends Record<string, string>>(obj: T): {[K in keyof T]: ImageSourcePropType  } {
    return obj;
}

