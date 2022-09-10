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

export class Member {
  constructor (private props: MemberProps) { }

  get allProps () {
    return this.props;
  }

  get id () {
    return this.props.id;
  }

  get fullName () {
    return this.props.fullName;
  }

  get birthDate () {
    return this.props.birthDate;
  }

  get nationality () {
    return this.props.nationality;
  }

  get fatherName () {
    return this.props.fatherName;
  }

  get motherName () {
    return this.props.motherName;
  }

  get civilStatus () {
    return this.props.civilStatus;
  }

  get rg () {
    return this.props.rg;
  }

  get rgEmissionDate () {
    return this.props.rgEmissionDate;
  }

  get rgDispatcher () {
    return this.props.rgDispatcher;
  }

  get cpf () {
    return this.props.cpf;
  }

  get email () {
    return this.props.email;
  }

  get phone () {
    return this.props.phone;
  }

  get mobilePhone () {
    return this.props.mobilePhone;
  }

  get street () {
    return this.props.street;
  }

  get number () {
    return this.props.number;
  }

  get complement () {
    return this.props.complement;
  }

  get district () {
    return this.props.district;
  }

  get city () {
    return this.props.city;
  }

  get state () {
    return this.props.state;
  }

  get profession () {
    return this.props.profession;
  }

  get congregated () {
    return this.props.congregated;
  }

  get occupations () {
    return this.props.occupations;
  }

  get ministries () {
    return this.props.ministries;
  }
}
