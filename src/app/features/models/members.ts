
export interface Member {
  id: number;
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
  SINGLE = 'Célibataire',
  MARRIED = 'Marié(e)',
  DIVORCED = 'Divorcé(e)',
  WIDOWED = 'Veuf/Veuve',
}

export interface MemberGroupResponsability {
  id: number;
  role: string;
  memberId: number;
  groupId: number;
}
