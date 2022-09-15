import logger from 'node-color-log';
import { prisma } from '../client';

export async function memberSeed () {
  logger.color('yellow').log('Criando seed de Member...');
  const members = [
    {
      fullName: 'admin',
      birthDate: new Date().toLocaleDateString('pt-BR'),
      nationality: 'brasileiro',
      fatherName: 'admin',
      motherName: 'admin',
      civilStatus: 'admin',
      email: 'admin@admin.com',
      street: 'admin',
      district: 'admin',
      city: 'admin'
    },
    {
      fullName: 'president',
      birthDate: new Date().toLocaleDateString('pt-BR'),
      nationality: 'brasileiro',
      fatherName: 'president',
      motherName: 'president',
      civilStatus: 'president',
      email: 'president@president.com',
      street: 'president',
      district: 'president',
      city: 'president',
      ministries: {
        create: {
          ministryId: 1
        }
      },
      occupations: {
        create: {
          occupationId: 1
        }
      }
    },
    {
      fullName: 'secretary',
      birthDate: new Date().toLocaleDateString('pt-BR'),
      nationality: 'brasileiro',
      fatherName: 'secretary',
      motherName: 'secretary',
      civilStatus: 'secretary',
      email: 'secretary@secretary.com',
      street: 'secretary',
      district: 'secretary',
      city: 'secretary',
      ministries: {
        create: {
          ministryId: 2
        }
      },
      occupations: {
        create: {
          occupationId: 3
        }
      }
    },
    {
      fullName: 'treasurer',
      birthDate: new Date().toLocaleDateString('pt-BR'),
      nationality: 'brasileiro',
      fatherName: 'treasurer',
      motherName: 'treasurer',
      civilStatus: 'treasurer',
      email: 'treasurer@treasurer.com',
      street: 'treasurer',
      district: 'treasurer',
      city: 'treasurer',
      ministries: {
        create: {
          ministryId: 5
        }
      },
      occupations: {
        create: {
          occupationId: 5
        }
      }
    },
    {
      fullName: 'programDirector',
      birthDate: new Date().toLocaleDateString('pt-BR'),
      nationality: 'brasileiro',
      fatherName: 'programDirector',
      motherName: 'programDirector',
      civilStatus: 'programDirector',
      email: 'programDirector@programDirector.com',
      street: 'programDirector',
      district: 'programDirector',
      city: 'programDirector',
      ministries: {
        create: {
          ministryId: 6
        }
      },
      occupations: {
        create: {
          occupationId: 7
        }
      }
    },
    {
      fullName: 'member',
      birthDate: new Date().toLocaleDateString('pt-BR'),
      nationality: 'brasileiro',
      fatherName: 'member',
      motherName: 'member',
      civilStatus: 'member',
      email: 'member@member.com',
      street: 'member',
      district: 'member',
      city: 'member',
      ministries: {
        create: {
          ministryId: 6
        }
      },
      occupations: {
        create: {
          occupationId: 16
        }
      }
    }
  ];

  for (const [index, member] of members.entries()) {
    const newMember = await prisma.member.upsert({
      where: { id: index + 1 },
      update: {},
      create: member
    });

    logger.color('green').log(`${newMember.fullName} criado com sucesso!`);
  }
}
