export interface PVCTask {
  id: string;
  widthSize: number;
  lengthSize: number;
  printType: string;
  corners: string;
  image: string;
  moreInfo: string;
  formatType: string;
  taskType: string;
  startDate: Date | null;
  endDate: Date | null;
  isShipping: boolean;
  isPayed: boolean;
  isGotInvoice: boolean;
  taskStatus: string;
  price: number;
  count: number;
  customerId: string;
  cutomerName: string;
}
