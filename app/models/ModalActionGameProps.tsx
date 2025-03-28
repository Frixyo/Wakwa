import Case from "../models/Case";

export default interface ModalActionGameProps {
    isModalVisible: boolean;
    closePopupActionGame: () => void;
    currentCase: Case;
}
