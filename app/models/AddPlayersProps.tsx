import Joueur from "./Joueur";

export default interface AddPlayerProps {
    setJoueurs: (joueurs: Joueur[]) => void;
}