import { Ministry, Occupation, State } from '../../entities';
import { ministryProps } from './ministries';
import { occupationProps } from './occupations';

export const memberProps = {
  id: 1,
  fullName: 'John Doe',
  birthDate: '2000-01-01',
  nationality: 'brasileiro(a)',
  fatherName: 'John Doe Pai',
  motherName: 'Joana Doe',
  civilStatus: 'solteiro(a)',
  rg: '12.123.123-4',
  rgEmissionDate: '2016-01-01',
  rgDispatcher: 'DETRAN',
  cpf: '123.123.123-45',
  email: 'email@email.com',
  phone: '(11) 1234-5678',
  mobilePhone: '(11) 91234-5678',
  street: 'Rua dos Testes',
  number: 123,
  complement: 'Casa 1',
  district: 'Bairro dos Testes',
  city: 'Cidade dos Tests',
  state: 'SP' as State,
  profession: 'Testador(a)',
  congregated: false,
  occupations: [new Occupation(occupationProps)],
  ministries: [new Ministry(ministryProps)]
};

export const createMemberProps = {
  id: 1,
  fullName: 'John Doe',
  birthDate: '2000-01-01',
  nationality: 'brasileiro(a)',
  fatherName: 'John Doe Pai',
  motherName: 'Joana Doe',
  civilStatus: 'solteiro(a)',
  rg: '12.123.123-4',
  rgEmissionDate: '2016-01-01',
  rgDispatcher: 'DETRAN',
  cpf: '123.123.123-45',
  email: 'email@email.com',
  phone: '(11) 1234-5678',
  mobilePhone: '(11) 91234-5678',
  street: 'Rua dos Testes',
  number: 123,
  complement: 'Casa 1',
  district: 'Bairro dos Testes',
  city: 'Cidade dos Tests',
  state: 'SP' as State,
  profession: 'Testador(a)',
  congregated: false,
  occupations: [1, 2],
  ministries: [1, 2]
};
