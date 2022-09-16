import { Ministry, MinistryWithMembersQty } from '../../entities';
import { memberMock1, memberMock2 } from './members';

export const ministryProps = { name: 'Ministério de Testes', id: 1 };

export const ministriesMock = [
  new Ministry({ id: 1, name: 'Ministério de Testes' }),
  new Ministry({ id: 2, name: 'Ministério de Internet' }),
  new Ministry({ id: 3, name: 'Ministério de Jogos' })
];

export const ministryWithMembersQtyMock = [
  new MinistryWithMembersQty(ministriesMock[0], 1),
  new MinistryWithMembersQty(ministriesMock[1], 2),
  new MinistryWithMembersQty(ministriesMock[2], 3)
];

export const ministryMembersMock = {
  members: [
    {
      member: { id: 1, ...memberMock1 }
    },
    {
      member: { id: 2, ...memberMock2 }
    }
  ]
};
