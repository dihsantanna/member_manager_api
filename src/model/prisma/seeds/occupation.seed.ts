import logger from 'node-color-log';
import { prisma } from '../client';

export async function occupationSeed () {
  logger.color('yellow').log('Criando seed de Occupation...');
  const occupations = [
    { name: 'Pastor Presidente' },
    { name: 'Vice-Presidente' },
    { name: 'Secretario(a)' },
    { name: '2º Secretario(a)' },
    { name: 'Tesoureiro(a)' },
    { name: '2º Tesoureiro(a)' },
    { name: 'Diretor(a) de Programa' },
    { name: 'Presidente dos Diáconos' },
    { name: 'Vice-Presidente dos Diáconos' },
    { name: 'Líder do Ministério de Casais' },
    { name: 'Vice-Líder do Ministério de Casais' },
    { name: 'Presidente dos Homens' },
    { name: 'Vice-Presidente dos Homens' },
    { name: 'Presidente das Mulheres' },
    { name: 'Vice-Presidente das Mulheres' },
    { name: 'Líder do Ministério de Jovens' },
    { name: 'Vice-Líder do Ministério de Jovens' },
    { name: 'Líder do Ministério Infantil' },
    { name: 'Vice-Líder do Ministério Infantil' },
    { name: 'Líder do Ministério de Louvor' },
    { name: 'Vice-Líder do Ministério de Louvor' },
    { name: 'Líder do Ministério de Som e Imagem' },
    { name: 'Vice-Líder do Ministério de Som e Imagem' }
  ];

  for (const [index, occupation] of occupations.entries()) {
    const newOccupation = await prisma.occupation.upsert({
      where: { id: index + 1 },
      update: {},
      create: occupation
    });

    logger.color('green').log(`${newOccupation.name} criado com sucesso!`);
  }
}
