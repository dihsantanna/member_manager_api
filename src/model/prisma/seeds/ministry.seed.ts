import logger from 'node-color-log';
import { prisma } from './seed';

export async function ministrySeed () {
  logger.color('yellow').log('Criando seed de Ministry...');
  const ministries = [
    { name: 'Ministério Pastoral' },
    { name: 'Ministério Diaconal' },
    { name: 'Ministério Casais' },
    { name: 'Ministério de Homens' },
    { name: 'Ministério de Mulheres' },
    { name: 'Ministério de Jovens' },
    { name: 'Ministério Infantil' },
    { name: 'Ministério de Louvor' },
    { name: 'Ministério de Som e Imagem' }
  ];

  for (const [index, ministry] of ministries.entries()) {
    const newMinistry = await prisma.ministry.upsert({
      where: { id: index + 1 },
      update: {},
      create: ministry
    });

    logger.color('green').log(`${newMinistry.name} criado com sucesso!`);
  }
}
