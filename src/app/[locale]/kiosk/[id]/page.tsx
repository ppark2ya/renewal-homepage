import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KioskDetailPage from '@/features/kiosk/components/KioskDetailPage';
import { fetchGraphQL } from '@/lib/graphql/fetcher';
import {
  GetKioskDetailDocument,
  type GetKioskDetailQuery,
  type GetKioskDetailQueryVariables,
} from '@/graphql/generated/graphql';

interface KioskDetailRouteProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function KioskDetail({ params }: KioskDetailRouteProps) {
  const { id } = await params;
  const terminalId = Number(id);

  if (isNaN(terminalId)) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-[60px] flex items-center justify-center">
          <p className="text-[#717895]">Invalid kiosk ID.</p>
        </main>
        <Footer />
      </div>
    );
  }

  let kioskData: GetKioskDetailQuery['getKioskDetail'] | null = null;

  try {
    const { data } = await fetchGraphQL<GetKioskDetailQuery, GetKioskDetailQueryVariables>(
      GetKioskDetailDocument,
      { variables: { terminalId } }
    );
    kioskData = data.getKioskDetail;
  } catch {
    // SSR fetch 실패 시 클라이언트에서 재시도
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[60px]">
        <KioskDetailPage terminalId={terminalId} initialData={kioskData} />
      </main>
      <Footer />
    </div>
  );
}
