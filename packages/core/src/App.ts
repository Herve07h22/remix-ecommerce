import { IAServiceTest } from "./domain/gateways/ia/IAServiceTest";
import { MailServiceTest } from "./domain/gateways/mail/MailServiceTest";
import { LeadRepositoryTest } from "./domain/register/tests/LeadRepositoryTest";
import { getAToken } from "./domain/register/usecases/getAToken";
import { textGen } from "./domain/textgen/usecases/textGen";

import * as dotenv from "dotenv";
import { getLeadStats } from "./domain/register/usecases/getLeadStats";
import { LeadRepositoryPrisma } from "./gateways/prisma/LeadRepositoryPrisma";

const path = require("path");
//require("dotenv")
dotenv.config({
  debug: true,
  path: path.resolve(process.cwd(), ".env"),
});

const dependencies = {
  mailService: new MailServiceTest(),
  leadRepository: new LeadRepositoryPrisma(),
  iaService: new IAServiceTest(),
};

export const App = {
  getAToken: async (params: { email: string }) =>
    getAToken(params, dependencies),
  textGen: async (params: { token: string; input: string; context: string }) =>
    textGen(params, dependencies),
  getLeadStats: async (params: { token: string }) =>
    getLeadStats(params, dependencies),
};
