import { MailServiceTest } from "../../gateways/mail/MailServiceTest";
import { getAToken } from "../usecases/getAToken";
import { LeadRepositoryTest } from "./LeadRepositoryTest";

var mailService: MailServiceTest;
var leadRepository: LeadRepositoryTest;

beforeEach(() => {
  mailService = new MailServiceTest();
  leadRepository = new LeadRepositoryTest();
});

it("A new lead get a valid token", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const result = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );
  expect(result?.status).toBe("success");
  expect(result?.token).toBeDefined();
});

it("A lead with a valid token get a new email with the same token", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";
  const firstResult = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );
  const result = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );
  expect(result?.status).toBe("success");
  expect(result?.token).toBe(firstResult?.token);
});

it("A lead with an expired token get a new tokenb", async () => {
  process.env.URL_GENERATION_PAGE = "https://something.com";

  const { token } = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );
  leadRepository.setCreatedDatetoYesterday("test@gmail.com", 2);

  const result = await getAToken(
    { email: "test@gmail.com" },
    {
      mailService,
      leadRepository,
    }
  );
  expect(result?.status).toBe("success");
  expect(result?.token).toBeDefined();
  expect(result?.token).not.toBe(token);

  const lead = await leadRepository.getByEmail("test@gmail.com");
  expect(lead?.asksForToken).toBe(2);
});
