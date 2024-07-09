export interface IMapper<S, V> {
  map: (v: S, ...args: any) => V;
}
