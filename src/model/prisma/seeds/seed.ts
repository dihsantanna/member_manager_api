import { prisma } from '../client';
import { memberSeed } from './member.seed';
import { ministrySeed } from './ministry.seed';
import { occupationSeed } from './occupation.seed';
import { roleSeed } from './role.seed';
import { roleScopeSeed } from './roleScope.seed';
import { scopeSeed } from './scope.seed';
import { userSeed } from './user.seed';

async function main () {
  // adicione seus seeds aqui
  await occupationSeed();
  await ministrySeed();
  await roleSeed();
  await scopeSeed();
  await roleScopeSeed();
  await memberSeed();
  await userSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
