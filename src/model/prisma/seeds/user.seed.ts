import { RoleName } from '@prisma/client';
import logger from 'node-color-log';
import { prisma } from '../client';

export async function userSeed () {
  logger.color('yellow').log('Criando seed de User...');
  const users = [
    {
      email: 'admin@admin.com',
      password: '$2b$10$pIY.O.e0Jn1mKdeST0wPyO5Xp1t2Z26KXnkVu/OvLDJhlxwPb9YuW',
      roleName: 'ADMIN' as RoleName
    },
    {
      email: 'president@president.com',
      password: '$2b$10$MSDu8kAwDTOiFfTpurfuwuDNbr/NOEAcaGHQW9500rJIdZYT7FffS',
      roleName: 'PRESIDENT' as RoleName
    },
    {
      email: 'secretary@secretary.com',
      password: '$2b$10$weWS//Bw.wpJ.2xrGD9Iu.8EiMEfM4Yll/vhWpS28PoqwkxR0kXom',
      roleName: 'SECRETARY' as RoleName
    },
    {
      email: 'treasurer@treasurer.com',
      password: '$2b$10$DhMFZ4LEech30VIeJenOQ.NEDKDQVXQ6/7gXnfPZlsCsuUDN0cq3y',
      roleName: 'TREASURER' as RoleName
    },
    {
      email: 'programDirector@programDirector.com',
      password: '$2b$10$WgRJwZt77YOGzeAJZe8NXeTEdWWNgCmJxBUEsNwnGxiJFZpnr5HSa',
      roleName: 'PROGRAM_DIRECTOR' as RoleName
    },
    {
      email: 'member@member.com',
      password: '$2b$10$D1c9cPYMVyQgf5o3M2iOberxJhKX0sKK4vUY.M5FVXchRCBjMk2F.',
      roleName: 'MEMBER' as RoleName
    }
  ];

  for (const [index, user] of users.entries()) {
    const newUser = await prisma.user.upsert({
      where: { id: index + 1 },
      update: {},
      create: user
    });

    logger.color('green').log(`User ${newUser.email} criado com sucesso!`);
  }
}
