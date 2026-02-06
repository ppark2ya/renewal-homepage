import { fetchGraphQL } from '@/lib/graphql/fetcher';
import {
  GetWonForeignBestRatesDocument,
  GetForeignWonBestRatesDocument,
  type GetWonForeignBestRatesQuery,
  type GetForeignWonBestRatesQuery,
} from '@/graphql/generated/graphql';
import { ExchangeRateSectionClient } from './ExchangeRateSectionClient';

/**
 * Exchange Rate Section - Server Component
 * Fetches exchange rates on the server and passes to client for interactivity
 */
export default async function ExchangeRateSection() {
  // Parallel fetch for both buy and sell rates
  const [buyResult, sellResult] = await Promise.all([
    fetchGraphQL<GetWonForeignBestRatesQuery>(GetWonForeignBestRatesDocument),
    fetchGraphQL<GetForeignWonBestRatesQuery>(GetForeignWonBestRatesDocument),
  ]);

  const buyRates = buyResult.data.getWonForeignBestRates.currencyRates;
  const sellRates = sellResult.data.getForeignWonBestRates.currencyRates;

  return (
    <ExchangeRateSectionClient
      initialBuyRates={buyRates}
      initialSellRates={sellRates}
    />
  );
}
