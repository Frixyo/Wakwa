export default interface ModalMainProps {
  isModalVisible: boolean;
  closePopup: () => void;
  selectedPlateauIndex: number | null;
  listPlateaux: Record<string, number>;
}