"use client";

import { Toggle } from "@/components/ui/toggle";
import { usePathname, useRouter } from '@/i18n/routing';
import { Moon, Sun } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export default function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (lang: string) => {
    startTransition(() => {
      router.replace(
        { pathname, query: params },
        { locale: lang }
      );
    });
  };

  return (
    <div>
      <Toggle
        variant="outline"
        className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
        pressed={locale === "en"}
        onPressedChange={() => changeLanguage(locale === "en" ? "pt" : "en")}
        disabled={isPending}
      >
        <h1 className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100">
          EN
        </h1>
        <h1
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        >
          PT
        </h1>
      </Toggle>
    </div>
  );
}
