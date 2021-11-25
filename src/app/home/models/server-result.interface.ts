export interface ServerResultInterface {
  offset: number;
  limit: number;
  total: number;
  result: Result[];
}

export interface UpdateData {
  event: any;
  columnName:string;
  row: Result;
  index: number;
}

export interface Result {
  healthIndex?: number;
  endDate?: number;
  minValueDateTime?: number;
  type?: string;
  cowId?: number;
  animalId?: string;
  eventId?: number;
  deletable?: boolean;
  lactationNumber?: number;
  daysInLactation?: number;
  ageInDays?: number;
  startDateTime?: number;
  reportingDateTime?: number;
  alertType?: string;
  duration?: number;
  originalStartDateTime?: number;
  endDateTime?: number;
  daysInPregnancy?: number;
  heatIndexPeak?: string;
  newGroupId?: number;
  newGroupName?: string;
  currentGroupId?: number;
  currentGroupName?: string;
  destinationGroup?: number;
  destinationGroupName?: string;
  calvingEase?: number;
  oldLactationNumber?: number;
  newborns?: number;
  cowEntryStatus?: string;
  birthDateCalculated?: boolean;
  sire?: number;
  breedingNumber?: number;
  isOutOfBreedingWindow?: boolean;
  interval?: number;
  reportingDated?: string;
}
