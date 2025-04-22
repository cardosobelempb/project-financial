export class Result {
  constructor(
    readonly value: any,
    readonly errors: string[] = []
  ) {}

  static ok(value: any): Result {
    return new Result(value);
  }

  static fail(errors: string[]): Result {
    return new Result(undefined, errors);
  }

  static try(fn: () => any): Result {
    try {
      return Result.ok(fn());
    } catch (error) {
      if (error instanceof Error) {
        return Result.fail([error.message]);
      }
      console.error("Unexpected error:", error);
      return Result.fail(["Unexpected error occurred"]);
    }
  }

  static combine(results: Result[]): Result {
    const errors = results.flatMap((result) => result.errors);
    return errors.length > 0 ? Result.fail(errors) : Result.ok(undefined);
  }

  get success(): boolean {
    return this.errors.length === 0;
  }

  get failure(): boolean {
    return this.errors.length > 0;
  }

  thowIfError(): any {
    if (this.failure) {
      throw new Error(this.errors.join(", "));
    }
    return this.value;
  }
}
