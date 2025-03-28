export default interface ModalMainProps {
  isModalVisible: boolean;
  closePopup: () => void;
  selectedPlateauIndex: string | null;
  listPlateaux: Record<string, number>;
}