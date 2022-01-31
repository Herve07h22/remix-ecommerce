import { IAServiceTest } from "../../gateways/ia/IAServiceTest";
import { MailServiceTest } from "../../gateways/mail/MailServiceTest";
import { getAToken } from "../../register/usecases/getAToken";
import { LeadRepositoryTest } from "../../register/tests/LeadRepositoryTest";
import { textGen } from "../usecases/textGen";

const TEN_SECONDS = 1000 * 10;

var iaService: IAServiceTest;
var leadRepository: LeadRepositoryTest;
var mailService: MailServiceTest;

beforeEach(() => {
  iaService = new IAServiceTest();
  leadRepository = new LeadRepositoryTest();
  mailService = new MailServiceTest();
});

it("An invalid token prevent from generating", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const { token } = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );
  leadRepository.setCreatedDatetoYesterday("test@gmail.com", 2);
  expect(token).toBeDefined();
  if (token) {
    const result = await textGen(
      {
        token,
        input: "Dans ma boutique je vends des pommes",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );

    expect(result?.status).toBe("error");
    expect(result?.message).toBe("token not found");
  }
});

it("A lead can generate shops name with a valid token", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const { token } = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );

  expect(token).toBeDefined();
  if (token) {
    const result = await textGen(
      {
        token,
        input: "Dans ma boutique je vends des pommes",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );

    expect(result?.status).toBe("success");
    expect(result?.results).toHaveLength(1);
  }
});

it("A lead with a valid token has to wait 10 seconds between each IA generation", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const { token } = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );

  expect(token).toBeDefined();
  if (token) {
    await textGen(
      {
        token,
        input: "Dans ma boutique je vends des pommes",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );
    const result = await textGen(
      {
        token,
        input: "Dans ma boutique je vends des fraises",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );

    expect(result?.status).toBe("error");
    expect(result?.message).toBe("Wait 10 seconds between each IA generation");
  }
});

it("A lead with a valid token who waits between each IA generation gets 2 answers", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const { token } = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );

  expect(token).toBeDefined();
  if (token) {
    await textGen(
      {
        token,
        input: "Dans ma boutique je vends des pommes",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );
    const lead = await leadRepository.getByToken(token);
    if (lead) leadRepository.setLastGenerationBackTo(lead, TEN_SECONDS + 1);
    const result = await textGen(
      {
        token,
        input: "Dans ma boutique je vends des fraises",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );

    expect(result?.status).toBe("success");
    expect(result?.results).toHaveLength(1);
  }
});

it("A lead with a valid token who waits between each IA generation cannot get more than 10 answers", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const { token } = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );

  expect(token).toBeDefined();

  if (token) {
    for (let i = 0; i < 10; i++) {
      await textGen(
        {
          token,
          input: "Dans ma boutique je vends des pommes",
          context: "shop_name",
        },
        { iaService, leadRepository }
      );
      const lead = await leadRepository.getByToken(token);
      if (lead) leadRepository.setLastGenerationBackTo(lead, TEN_SECONDS + 1);
    }
    const result = await textGen(
      {
        token,
        input: "Dans ma boutique je vends des fraises",
        context: "shop_name",
      },
      { iaService, leadRepository }
    );

    expect(result?.status).toBe("error");
    expect(result?.message).toBe("No more than 10 IA generation each day");
  }
});
