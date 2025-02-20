import { RedirectType, redirect } from 'next/navigation';

export default async function RootPage() {
  redirect('/en', RedirectType.replace);
}
