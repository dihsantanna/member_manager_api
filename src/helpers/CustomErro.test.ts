import { describe, expect, it } from 'vitest';

import { CustomError } from './CustomError';

describe('Testando CustomError', () => {
  it('Deve ser possível criar uma instância.', () => {
    const error = new CustomError('message', 500);
    expect(error).toBeInstanceOf(CustomError);
  });

  it('Deve ter as propriedades "message" e "statusCode"', () => {
    const error = new CustomError('message', 500);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('statusCode');
  });
});
