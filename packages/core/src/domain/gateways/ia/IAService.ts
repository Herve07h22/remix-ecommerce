export interface IAService {
  generate(input: string): Promise<string[]>;
}
