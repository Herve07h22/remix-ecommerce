import { getPostSentence } from "../../../domain/textgen/models/postSentence";
import { CedilleIAService } from "../CedilleIAService";

it("Cedille model returns a list of suggestion for my shop", async () => {
  const cedille = new CedilleIAService();
  const content =
    "Dans ma boutique je vends des pommes bio et d'autres légumes" +
    ". " +
    getPostSentence("shop_name");
  if (process.env.TEST_ADAPTERS === "true") {
    const result = await cedille.generate(content);
    console.log(result);
  }
});
