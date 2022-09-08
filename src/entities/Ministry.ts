export interface MinistryProps {
  id?: number
  name: string
}

export class Ministry {
  constructor (private props: MinistryProps) { }

  get id () {
    return this.props.id;
  }

  get name () {
    return this.props.name;
  }
}
