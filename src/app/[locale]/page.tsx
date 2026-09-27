import { notFound } from "next/navigation";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { Hero } from "@/features/hero/components/Hero";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { SiteFooter } from "@/features/site-shell/components/SiteFooter";
import { SiteHeader } from "@/features/site-shell/components/SiteHeader";
import { StackSection } from "@/features/stack/components/StackSection";
import { StatsSection } from "@/features/stats/components/StatsSection";
import { WorkSection } from "@/features/work/components/WorkSection";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function PortfolioPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <SiteHeader t={t} locale={locale} />
      <main>
        <Hero t={t} />
        <StatsSection t={t} />
        <StackSection t={t} />
        <ServicesSection t={t} />
        <WorkSection t={t} locale={locale} />
        <AboutSection t={t} />
        <ContactSection t={t} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
