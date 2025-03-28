import Joueur from "./Joueur";

export default interface PlayersProps {
    joueurs: Joueur[];
    setJoueurs: (joueurs: Joueur[]) => void;
}
