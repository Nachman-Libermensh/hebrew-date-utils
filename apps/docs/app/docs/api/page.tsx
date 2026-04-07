import { ApiModulesOverview } from "@/components/core-api/api-modules-overview";
import { API_MODULES } from "@/components/core-api/catalog";

export const metadata = {
  title: "Core API",
};

export default function CoreApiPage() {
  return <ApiModulesOverview modules={API_MODULES} />;
}
