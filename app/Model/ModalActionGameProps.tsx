import Case from "../Model/Case";

export default interface ModalActionGameProps {
    isModalVisible: boolean;
    closePopupActionGame: () => void;
    currentCase: Case;
}
