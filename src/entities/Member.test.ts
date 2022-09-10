import { describe, expect, it } from 'vitest';

import { memberProps } from '../tests/utils';
import { Member } from './Member';

const {
  id,
  fullName,
  birthDate,
  nationality,
  fatherName,
  motherName,
  civilStatus,
  rg,
  rgEmissionDate,
  rgDispatcher,
  cpf,
  email,
  phone,
  mobilePhone,
  street,
  number,
  complement,
  district,
  city,
  state,
  profession,
  congregated,
  occupations,
  ministries
} = memberProps;

describe('Testando classe Member.', () => {
  it('Deve ser possível criar uma instância.', () => {
    const member = new Member(memberProps);

    expect(member).toBeInstanceOf(Member);
  });

  it(`Deve ser possível acessar os atributos ${Object.keys(memberProps).join(', ')}.`, () => {
    const member = new Member(memberProps);

    expect(member.allProps).toBe(memberProps);
    expect(member.id).toBe(id);
    expect(member.fullName).toBe(fullName);
    expect(member.birthDate).toBe(birthDate);
    expect(member.nationality).toBe(nationality);
    expect(member.fatherName).toBe(fatherName);
    expect(member.motherName).toBe(motherName);
    expect(member.civilStatus).toBe(civilStatus);
    expect(member.rg).toBe(rg);
    expect(member.rgEmissionDate).toBe(rgEmissionDate);
    expect(member.rgDispatcher).toBe(rgDispatcher);
    expect(member.cpf).toBe(cpf);
    expect(member.email).toBe(email);
    expect(member.phone).toBe(phone);
    expect(member.mobilePhone).toBe(mobilePhone);
    expect(member.street).toBe(street);
    expect(member.number).toBe(number);
    expect(member.complement).toBe(complement);
    expect(member.district).toBe(district);
    expect(member.city).toBe(city);
    expect(member.state).toBe(state);
    expect(member.profession).toBe(profession);
    expect(member.congregated).toBe(congregated);
    expect(member.occupations).toBe(occupations);
    expect(member.ministries).toBe(ministries);
  });
});
