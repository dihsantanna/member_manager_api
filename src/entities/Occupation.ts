export interface OccupationProps {
  id?: number
  name: string
}

export class Occupation {
  constructor (private props: OccupationProps) { }

  get id () {
    return this.props.id;
  }

  get name () {
    return this.props.name;
  }
}
