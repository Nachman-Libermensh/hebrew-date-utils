import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  COMPAT_MODULE_DOCS,
  CORE_MODULE_DOCS,
  type LibraryModuleDoc,
} from "@/lib/module-catalog";
import { SidebarThemeToggle } from "@/components/sidebar-theme-toggle";

function SidebarModuleItem({
  module,
  badge,
}: {
  module: LibraryModuleDoc;
  badge: string;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="h-auto items-start py-2.5">
        <Link href={module.href}>
          <span className="font-semibold">{module.name}</span>
          <span className="text-xs text-sidebar-foreground/70">{module.href}</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuBadge>{badge}</SidebarMenuBadge>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader className="gap-1 px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          hebrew-date-utils
        </Link>
        <p className="text-xs text-sidebar-foreground/70">
          מודולים ונתיבי תיעוד
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <Link href="/modules" aria-label="כל המודולים">
              הכל
            </Link>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {CORE_MODULE_DOCS.map((module) => (
                <SidebarModuleItem key={module.slug} module={module} badge="core" />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Compatibility</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {COMPAT_MODULE_DOCS.map((module) => (
                <SidebarModuleItem key={module.slug} module={module} badge="compat" />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <SidebarThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
