import WebsiteLayout from '@/components/layout/WebsiteLayout';

export default function WebsiteRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebsiteLayout>{children}</WebsiteLayout>;
}
