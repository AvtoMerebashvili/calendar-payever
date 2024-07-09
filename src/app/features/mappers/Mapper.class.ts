import { IMapper } from './mapper.interface';

export class Mapper<S, V> {
  constructor(private mapper: IMapper<S, V>) {}
  map = this.mapper.map;
}
