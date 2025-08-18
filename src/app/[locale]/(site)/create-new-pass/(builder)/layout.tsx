import Steps from '@/components/createPass/Steps';

import type { Locale } from '@/lib/translations';

export default function CreatePassBuilderLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <section className="bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Steps />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
        {children}
      </div>
    </section>
  );
}


    