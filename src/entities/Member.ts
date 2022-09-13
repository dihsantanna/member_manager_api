import { Ministry } from './Ministry';
import { Occupation } from './Occupation';

export type State = 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS'
| 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO';

export interface Person {
  fullName: string
}

export interface MemberProps extends Person {
  id?: number
  birthDate: string
  nationality: string
  fatherName: string
  motherName: string
  civilStatus: string
  rg: string | null
  rgEmissionDate: string | null
  rgDispatcher: string | null
  cpf: string | null
  email: string | null
  phone: string | null
  mobilePhone: string | null
  street: string
  number: number | null
  complement: string | null
  district: string
  city: string
  state: State | null
  profession: string | null
  congregated: boolean
  occupations?: Occupation[] | number[]
  ministries?: Ministry[] | number[]
}

export class Member implements MemberProps {
  readonly id?: number;
  readonly fullName: string;
  readonly birthDate: string;
  readonly nationality: string;
  readonly fatherName: string;
  readonly motherName: string;
  readonly civilStatus: string;
  readonly rg: string | null;
  readonly rgEmissionDate: string | null;
  readonly rgDispatcher: string | null;
  readonly cpf: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly mobilePhone: string | null;
  readonly street: string;
  readonly number: number | null;
  readonly complement: string | null;
  readonly district: string;
  readonly city: string;
  readonly state: State | null;
  readonly profession: string | null;
  readonly congregated: boolean;
  readonly occupations?: Occupation[] | number[];
  readonly ministries?: Ministry[] | number[];

  constructor (props: MemberProps) {
    if (props.id) this.id = props.id;
    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.nationality = props.nationality;
    this.fatherName = props.fatherName;
    this.motherName = props.motherName;
    this.civilStatus = props.civilStatus;
    this.rg = props.rg;
    this.rgEmissionDate = props.rgEmissionDate;
    this.rgDispatcher = props.rgDispatcher;
    this.cpf = props.cpf;
    this.email = props.email;
    this.phone = props.phone;
    this.mobilePhone = props.mobilePhone;
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.district = props.district;
    this.city = props.city;
    this.state = props.state;
    this.profession = props.profession;
    this.congregated = props.congregated;
    if (props.occupations) this.occupations = props.occupations;
    if (props.ministries) this.ministries = props.ministries;
  }
}
