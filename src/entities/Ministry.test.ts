import { describe, expect, it } from 'vitest';

import { ministryProps } from '../tests/utils';
import { Ministry } from './Ministry';

const { id, name } = ministryProps;

describe('Testando classe Ministry.', () => {
  it('Deve ser possível criar uma instância.', () => {
    const ministry = new Ministry(ministryProps);

    expect(ministry).toBeInstanceOf(Ministry);
  });

  it('Deve ser possível acessar os atributos "id" e "name".', () => {
    const ministry = new Ministry(ministryProps);

    expect(ministry.id).toBe(id);
    expect(ministry.name).toBe(name);
  });
});
