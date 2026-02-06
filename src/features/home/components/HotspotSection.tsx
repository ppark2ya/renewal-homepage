import { fetchGraphQL } from '@/lib/graphql/fetcher';
import {
  GetKioskListDocument,
  type GetKioskListQuery,
  GetKioskFilterDocument,
  type GetKioskFilterQuery,
} from '@/graphql/generated/graphql';
import { HotspotSectionClient } from './HotspotSectionClient';

/**
 * Hotspot Section - Server Component
 * Fetches kiosk list and filters on the server and passes to client for interactivity
 */
export default async function HotspotSection() {
  const [kioskResult, filterResult] = await Promise.all([
    fetchGraphQL<GetKioskListQuery>(GetKioskListDocument, {
      variables: {
        page: 1,
        size: 15,
      },
    }),
    fetchGraphQL<GetKioskFilterQuery>(GetKioskFilterDocument),
  ]);

  const kiosks = kioskResult.data.getKioskList.list;

  // LOCATION 타입 필터에서 { code, name } 목록 추출, All을 앞에 추가하고 최대 10개까지
  const locationFilter = filterResult.data.getKioskFilter.find(
    (f) => f.type === 'LOCATION'
  );
  const locationFilterItems = locationFilter
    ? locationFilter.filterList.flatMap((f) =>
        f.filterDetailList.map((d) => ({ code: d.code, name: d.name }))
      )
    : [];
  const locationFilters = [
    { code: '', name: 'All' },
    ...locationFilterItems,
  ].slice(0, 10);

  return (
    <HotspotSectionClient
      initialKiosks={kiosks}
      locationFilters={locationFilters}
    />
  );
}
