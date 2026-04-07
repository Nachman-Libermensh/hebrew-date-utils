import type { ApiModuleDoc } from "../catalog-types";
import { arithmeticModule } from "./arithmetic";
import { boundariesModule } from "./boundaries";
import { constantsModule } from "./constants";
import { conversionModule } from "./conversion";
import { formattingModule } from "./formatting";
import { hebcalCompatModule } from "./hebcal-compat";
import { holidaysModule } from "./holidays";
import { infoModule } from "./info";
import { membershipModule } from "./membership";
import { monthUtilsModule } from "./month-utils";
import { navigationModule } from "./navigation";
import { rangesModule } from "./ranges";
import { typesModule } from "./types";
import { yearModule } from "./year";

export const API_MODULES: ApiModuleDoc[] = [
  conversionModule,
  arithmeticModule,
  boundariesModule,
  monthUtilsModule,
  navigationModule,
  rangesModule,
  infoModule,
  membershipModule,
  formattingModule,
  holidaysModule,
  yearModule,
  constantsModule,
  typesModule,
  hebcalCompatModule,
];

export const API_MODULE_MAP: Record<string, ApiModuleDoc> = Object.fromEntries(
  API_MODULES.map((moduleDoc) => [moduleDoc.slug, moduleDoc]),
);

export const API_MODULE_SLUGS = API_MODULES.map((moduleDoc) => moduleDoc.slug);
