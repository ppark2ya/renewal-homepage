import { NextRequest, NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql/fetcher';
import {
  GetWonForeignBestRatesDocument,
  GetForeignWonBestRatesDocument,
  type GetWonForeignBestRatesQuery,
  type GetForeignWonBestRatesQuery,
} from '@/generated/graphql';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const direction = searchParams.get('direction');

  try {
    if (direction === 'buy') {
      const result = await fetchGraphQL<GetWonForeignBestRatesQuery>(GetWonForeignBestRatesDocument);
      return NextResponse.json({
        currencyRates: result.data.getWonForeignBestRates.currencyRates,
      });
    } else if (direction === 'sell') {
      const result = await fetchGraphQL<GetForeignWonBestRatesQuery>(GetForeignWonBestRatesDocument);
      return NextResponse.json({
        currencyRates: result.data.getForeignWonBestRates.currencyRates,
      });
    }

    return NextResponse.json(
      { error: 'Invalid direction parameter. Use "buy" or "sell".' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    );
  }
}
