import {MemberGroupResponsability} from './members';

export interface Group {
id: number;
name: string;
atCreate:Date | null;
memberGroupResponsabilities: MemberGroupResponsability[];
}
