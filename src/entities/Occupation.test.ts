import { describe, expect, it } from 'vitest';

import { occupationProps } from '../tests/utils';
import { Occupation } from './Occupation';

const { id, name } = occupationProps;

describe('Testando classe Occupation.', () => {
  it('Deve ser possível criar uma instância.', () => {
    const occupation = new Occupation(occupationProps);

    expect(occupation).toBeInstanceOf(Occupation);
  });
  it('Deve ser possível acessar os atributos "id" e "name".', () => {
    const occupation = new Occupation(occupationProps);

    expect(occupation.id).toBe(id);
    expect(occupation.name).toBe(name);
  });
});
