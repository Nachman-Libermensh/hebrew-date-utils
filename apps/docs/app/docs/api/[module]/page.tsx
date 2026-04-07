import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiModuleDetails } from "@/components/core-api/api-module-details";
import {
  API_MODULE_MAP,
  API_MODULE_SLUGS,
} from "@/components/core-api/catalog";

interface ApiModulePageProps {
  params: {
    module: string;
  };
}

export function generateStaticParams() {
  return API_MODULE_SLUGS.map((module) => ({ module }));
}

export function generateMetadata({ params }: ApiModulePageProps): Metadata {
  const moduleDoc = API_MODULE_MAP[params.module];
  if (!moduleDoc) {
    return {
      title: "Core API",
    };
  }

  return {
    title: `Core API • ${moduleDoc.title}`,
    description: moduleDoc.summary,
  };
}

export default function ApiModulePage({ params }: ApiModulePageProps) {
  const moduleDoc = API_MODULE_MAP[params.module];
  if (!moduleDoc) {
    notFound();
  }

  return <ApiModuleDetails moduleDoc={moduleDoc} />;
}
