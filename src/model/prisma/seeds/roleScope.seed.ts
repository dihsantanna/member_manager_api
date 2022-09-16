import { ScopeName } from '@prisma/client';
import logger from 'node-color-log';
import { prisma } from './seed';

export async function roleScopeSeed () {
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

  const scopeForRoles = {
    ADMIN: [...scopesNames],
    PRESIDENT: [...scopesNames],
    SECRETARY: [
      'CREATE_SECRETARY_USER',
      'UPDATE_SECRETARY_USER',
      'DELETE_SECRETARY_USER',
      'CREATE_TREASURER_USER',
      'UPDATE_TREASURER_USER',
      'DELETE_TREASURER_USER',
      'CREATE_USER',
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
    ] as ScopeName[],
    TREASURER: [
      'SEE_ALL_MEMBERS'
    ] as ScopeName[],
    PROGRAM_DIRECTOR: [
      'SEE_ALL_MEMBERS'
    ] as ScopeName[]
  };

  logger.color('yellow').log('Criando seed de RoleScope...');

  for (const scopeName of scopeForRoles.ADMIN) {
    await prisma.roleScope.upsert({
      where: { roleId_scopeId: { roleId: 1, scopeId: scopesNames.indexOf(scopeName) + 1 } },
      update: {},
      create: {
        roleId: 1,
        scopeId: scopesNames.indexOf(scopeName) + 1
      }
    });
    logger.color('green').log('RoleScope ADMIN criada com sucesso!');
  }

  for (const scopeName of scopeForRoles.PRESIDENT) {
    await prisma.roleScope.upsert({
      where: { roleId_scopeId: { roleId: 2, scopeId: scopesNames.indexOf(scopeName) + 1 } },
      update: {},
      create: {
        roleId: 2,
        scopeId: scopesNames.indexOf(scopeName) + 1
      }
    });
    logger.color('green').log('RoleScope PRESIDENT criada com sucesso!');
  }

  for (const scopeName of scopeForRoles.SECRETARY) {
    await prisma.roleScope.upsert({
      where: { roleId_scopeId: { roleId: 3, scopeId: scopesNames.indexOf(scopeName) + 1 } },
      update: {},
      create: {
        roleId: 3,
        scopeId: scopesNames.indexOf(scopeName) + 1
      }
    });
    logger.color('green').log('RoleScope SECRETARY criada com sucesso!');
  }

  for (const scopeName of scopeForRoles.TREASURER) {
    await prisma.roleScope.upsert({
      where: { roleId_scopeId: { roleId: 4, scopeId: scopesNames.indexOf(scopeName) + 1 } },
      update: {},
      create: {
        roleId: 4,
        scopeId: scopesNames.indexOf(scopeName) + 1
      }
    });
    logger.color('green').log('RoleScope TREASURER criada com sucesso!');
  }

  for (const scopeName of scopeForRoles.PROGRAM_DIRECTOR) {
    await prisma.roleScope.upsert({
      where: { roleId_scopeId: { roleId: 5, scopeId: scopesNames.indexOf(scopeName) + 1 } },
      update: {},
      create: {
        roleId: 5,
        scopeId: scopesNames.indexOf(scopeName) + 1
      }
    });
    logger.color('green').log('RoleScope PROGRAM_DIRECTOR criada com sucesso!');
  }
}
