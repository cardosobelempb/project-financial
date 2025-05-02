export interface IService<IN, OUT> {
  execute(input: IN): Promise<OUT | null>;
}
