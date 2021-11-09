export interface JobTask {
  id: string;
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
  customerName: string;
}
