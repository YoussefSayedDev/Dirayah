"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavItems } from "@/hooks/use-nav-items";
import { GraduationCap, Menu, School, UserCircle, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  userRole: string;
  locale: string;
};

export function DashboardSidebar({ userRole }: SidebarProps) {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();
  const { navItems } = useNavItems(userRole);

  // Role icon mapping
  const roleIcons = {
    student: GraduationCap,
    teacher: School,
    parent: Users,
    admin: UserCircle,
  };

  const RoleIcon = roleIcons[userRole as keyof typeof roleIcons] || UserCircle;

  const renderSidebarContent = () => (
    <>
      <SidebarHeader className="px-4 py-2">
        <div className="flex items-center gap-2">
          <RoleIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">{t("lms")}</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <RoleIcon className="text-primary h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{t(userRole)}</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </>
  );

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-40 lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTitle className="">
            <h2 className="sr-only">{t("lms")}</h2>
          </SheetTitle>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex h-full flex-col">{renderSidebarContent()}</div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop sidebar
  return (
    <Sidebar collapsible="icon" className="hidden border-r lg:flex">
      {renderSidebarContent()}
    </Sidebar>
  );
}
