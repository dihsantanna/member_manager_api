export interface OccupationProps {
  id?: number
  name: string
}

export class Occupation implements OccupationProps {
  readonly id?: number;
  readonly name: string;

  constructor (props: OccupationProps) {
    if (props.id) this.id = props.id;
    this.name = props.name;
  }
}
