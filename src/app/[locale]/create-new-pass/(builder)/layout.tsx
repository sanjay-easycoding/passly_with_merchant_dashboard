import StepNav from '@/components/features/createPass/StepNav';
import Steps from '@/components/features/createPass/Steps';

import type { Locale } from '@/lib/translations';

export default function CreatePassBuilderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <section className="bg-[#ffffff] min-h-screen mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Steps />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
        {children}
      </div>
      {/* Navigation Buttons at Bottom */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <StepNav />
      </div>
    </section>
  );
}
