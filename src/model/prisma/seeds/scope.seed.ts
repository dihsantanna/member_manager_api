import { ScopeName } from '@prisma/client';
import logger from 'node-color-log';
import { prisma } from '../client';

export async function scopeSeed () {
  const scopesNames: ScopeName[] = [
    'CREATE_ADMIN_USER',
    'UPDATE_ADMIN_USER',
    'DELETE_ADMIN_USER',
    'CREATE_PRESIDENT_USER',
    'UPDATE_PRESIDENT_USER',
    'DELETE_PRESIDENT_USER',
    'CREATE_SECRETARY_USER',
    'UPDATE_SECRETARY_USER',
    'DELETE_SECRETARY_USER',
    'CREATE_TREASURER_USER',
    'UPDATE_TREASURER_USER',
    'DELETE_TREASURER_USER',
    'CREATE_USER',
    'UPDATE_USER',
    'DELETE_USER',
    'SEE_ALL_USERS',
    'CREATE_MEMBER',
    'UPDATE_MEMBER',
    'DELETE_MEMBER',
    'SEE_ALL_MEMBERS',
    'CREATE_MINISTRY',
    'UPDATE_MINISTRY',
    'DELETE_MINISTRY',
    'CREATE_OCCUPATION',
    'UPDATE_OCCUPATION',
    'DELETE_OCCUPATION',
    'ADD_MEMBER_TO_MINISTRY',
    'REMOVE_MEMBER_FROM_MINISTRY',
    'ADD_MEMBER_TO_OCCUPATION',
    'REMOVE_MEMBER_FROM_OCCUPATION'
  ];

  logger.color('yellow').log('Criando seed de Scope...');

  for (const [index, scopeName] of scopesNames.entries()) {
    const scope = await prisma.scope.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: scopeName
      }
    });
    logger.color('green').log(`Scope ${scope.name} criada com sucesso!`);
  }
}
