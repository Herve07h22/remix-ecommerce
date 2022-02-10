import { IAService } from "../../domain/gateways/ia/IAService";

export class CedilleIAService implements IAService {
  private cedilleApiUrl: string;
  private cedilleApiKey: string;
  private nbOfIterations = 3;

  constructor() {
    require("dotenv").config();
    if (!process.env.CEDILLE_API)
      throw new Error("Cedille API url is not defined in .env file");
    if (!process.env.CEDILLE_KEY)
      throw new Error("Cedille key is not defined in .env file");

    this.cedilleApiUrl = process.env.CEDILLE_API;
    this.cedilleApiKey = process.env.CEDILLE_KEY;
  }
  generate(input: string): Promise<string[]> {
    return Promise.all(
      Array(this.nbOfIterations)
        .fill(0)
        .map(() => this.generateOne(input))
    );
  }

  crop(textToCrop: string | undefined): string {
    if (!textToCrop) return "";
    // Extract the first sentence
    const regex = /^.*?[\.!,\?](?:\s|$)/;
    const firstSentence = textToCrop.match(regex);
    return (firstSentence && firstSentence[0]) || textToCrop;
  }

  async generateOne(input: string): Promise<string> {
    const body = {
      prompt: input,
      max_length: 12,
      temperature: 1,
      top_p: 0.8,
      top_k: 50,
      repetition_penalty: 1.1,
      n: 1,
    };
    const response = await fetch(this.cedilleApiUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.cedilleApiKey}`,
      },
    });
    const data = await response.json();
    console.log(data);

    if (data.choices && data.choices.length) {
      return this.crop(data.choices[0].text);
    }

    return "";
  }
}
