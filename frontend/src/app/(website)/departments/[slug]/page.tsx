import DepartmentContent from './DepartmentContent';
import { DEPARTMENTS } from '@/lib/constants';

export function generateStaticParams() {
  return DEPARTMENTS.map((d: { slug: string }) => ({ slug: d.slug }));
}

export default function Page() {
  return <DepartmentContent />;
}
