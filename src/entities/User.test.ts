import { describe, expect, it } from 'vitest';

import { userProps } from '../tests/utils';
import { User } from './User';

const {
  id,
  fullName,
  email,
  password,
  roleName,
  scope
} = userProps;

describe('Testando classe User.', () => {
  it('Deve ser possível criar uma instância.', () => {
    const user = new User(userProps);

    expect(user).toBeInstanceOf(User);
  });

  it(`Deve ser possível acessar os atributos ${Object.keys(userProps).join(', ')}.`, () => {
    const user = new User(userProps);

    expect(user.id).toBe(id);
    expect(user.fullName).toBe(fullName);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.roleName).toBe(roleName);
    expect(user.scope).toBe(scope);
  });
});
