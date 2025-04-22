export default interface IService<IN, OUT> {
  execute(input: IN): Promise<OUT>
}