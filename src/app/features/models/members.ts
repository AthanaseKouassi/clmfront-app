
export interface Member {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | null;
  gender: string;
  phone: string;
  address: string;
  idNumber: string;
  entryDate: Date | null;
  maritalStatus: string;
  weddingDate: Date | null;
  weddingOfficiant: string;
  profession: string;
  baptismDate: Date | null;
  baptismOfficiant: string;
  childNumber: number;
  originChurch: string;
  consentToSharePersonalInfo: boolean;
  consentToUseImageInVisuals: boolean;
  idGroup: number | null;
  idResponsability: number | null;
}

export enum Gender {
  MALE = 'Homme',
  FEMALE = 'Femme',
}

export enum MaritalStatus {
  SINGLE = 'CÉLIBATAIRE',
  MARRIED = 'MARIÉ(E)',
  DIVORCED = 'DIVORCÉ(E)',
  WIDOWED = 'VEUF / VEUVE',
}

