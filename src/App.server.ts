import { getAToken } from "./domain/register/usecases/getAToken";
import { textGen } from "./domain/textgen/usecases/textGen";
import * as dotenv from "dotenv";

const path = require("path");

dotenv.config({
  debug: true,
  path: path.resolve(process.cwd(), ".env"),
});

import { getLeadStats } from "./domain/register/usecases/getLeadStats";
import { LeadRepositoryPrisma } from "./gateways/prisma/LeadRepositoryPrisma";
import { MailgunMailService } from "./gateways/mailgun/MailgunMailService";
import { CedilleIAService } from "./gateways/cedille/CedilleIAService";

const dependencies = {
  mailService: new MailgunMailService(),
  leadRepository: new LeadRepositoryPrisma(),
  iaService: new CedilleIAService(),
};

export const App = {
  getAToken: async (params: { email: string }) =>
    getAToken(params, dependencies),
  textGen: async (params: { token: string; input: string; context: string }) =>
    textGen(params, dependencies),
  getLeadStats: async (params: { token: string }) =>
    getLeadStats(params, dependencies),
};
