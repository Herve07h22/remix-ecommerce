import { IAService } from "./IAService";

export class IAServiceTest implements IAService {
  async generate(input: string) {
    // console.log(`Generate IA for ${input}`);
    return ["hello"];
  }
}
