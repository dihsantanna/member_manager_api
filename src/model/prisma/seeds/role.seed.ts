import { RoleName } from '@prisma/client';
import logger from 'node-color-log';
import { prisma } from '../client';

export async function roleSeed () {
  logger.color('yellow').log('Criando seed de Role...');
  const roles: RoleName[] = [
    'ADMIN',
    'PRESIDENT',
    'SECRETARY',
    'TREASURER',
    'PROGRAM_DIRECTOR',
    'MEMBER'
  ];

  for (const [index, role] of roles.entries()) {
    const newRole = await prisma.role.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: role
      }
    });

    logger.color('green').log(`Role ${newRole.name} criada com sucesso!`);
  }
}
