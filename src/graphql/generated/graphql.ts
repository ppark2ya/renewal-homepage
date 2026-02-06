/* eslint-disable */
// @ts-nocheck
import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '../../lib/graphql/shim';
import * as ApolloReactHooks from '../../lib/graphql/apollo-react-shim';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthToken = {
  __typename?: 'AuthToken';
  /** JWT 액세스 토큰 */
  accessToken: Scalars['String']['output'];
  /** 액세스 토큰 만료 시간 (초) */
  expiresIn: Scalars['Int']['output'];
  /** 리프레시 토큰 */
  refreshToken: Scalars['String']['output'];
};

export type BaseRateResponse = {
  __typename?: 'BaseRateResponse';
  currencyRates: Array<ExchangeRateInfo>;
};

export type CardTrans = {
  __typename?: 'CardTrans';
  /** 거래 금액 */
  amount: Scalars['Int']['output'];
  /** 승인번호 */
  approveNo?: Maybe<Scalars['String']['output']>;
  /** 잔액 */
  balance: Scalars['Int']['output'];
  /** 카드 식별 번호 */
  cardId: Scalars['String']['output'];
  /** 통화 */
  currencyCode?: Maybe<Scalars['String']['output']>;
  /** 카드번호(마스킹) */
  maskedCardNo: Scalars['String']['output'];
  /** 가맹점명 */
  merchantName: Scalars['String']['output'];
  /** 가맹점번호 */
  merchantNo: Scalars['String']['output'];
  /** 원거래 금액 */
  orgAmount?: Maybe<Scalars['Int']['output']>;
  /** 원거래 승인번호(취소시 O) */
  orgApproveNo?: Maybe<Scalars['String']['output']>;
  /** 원거래번호(취소시 O) */
  orgTid?: Maybe<Scalars['String']['output']>;
  /** 원거래일자(취소시 O) */
  orgTransDt?: Maybe<Scalars['String']['output']>;
  /** 잔액 이관용 카드 번호 (수신) */
  receiveMaskingCardNo?: Maybe<Scalars['String']['output']>;
  /** 잔액 이관용 카드 번호 (발신) */
  senderMaskingCardNo?: Maybe<Scalars['String']['output']>;
  /** 거래 상태 */
  status: Scalars['String']['output'];
  /** 거래 상태 코드 */
  statusCd?: Maybe<Scalars['String']['output']>;
  /** 키오스크명 */
  terminalName?: Maybe<Scalars['String']['output']>;
  /** 나이스 거래 ID */
  tid: Scalars['String']['output'];
  /** 거래 일시 */
  transAt: Scalars['String']['output'];
  /** 거래 유형 */
  transType: Scalars['String']['output'];
};

export type CheckVoucherUserEmail = {
  __typename?: 'CheckVoucherUserEmail';
  /** 유저 이메일 데이터 PK */
  id?: Maybe<Scalars['Int']['output']>;
};

export enum CurrencyAmount {
  Aud_50 = 'AUD_50',
  Aud_100 = 'AUD_100',
  Cad_50 = 'CAD_50',
  Cny_100 = 'CNY_100',
  Eur_10 = 'EUR_10',
  Eur_20 = 'EUR_20',
  Eur_50 = 'EUR_50',
  Eur_100 = 'EUR_100',
  Gbp_20 = 'GBP_20',
  Hkd_100 = 'HKD_100',
  Hkd_500 = 'HKD_500',
  Hkd_1000 = 'HKD_1000',
  Idr_100000 = 'IDR_100000',
  Jpy_1000 = 'JPY_1000',
  Jpy_5000 = 'JPY_5000',
  Jpy_10000 = 'JPY_10000',
  Krw_1000 = 'KRW_1000',
  Krw_5000 = 'KRW_5000',
  Krw_10000 = 'KRW_10000',
  Krw_50000 = 'KRW_50000',
  Myr_100 = 'MYR_100',
  Php_1000 = 'PHP_1000',
  Sgd_50 = 'SGD_50',
  Sgd_100 = 'SGD_100',
  Thb_1000 = 'THB_1000',
  Twd_500 = 'TWD_500',
  Twd_1000 = 'TWD_1000',
  Usd_10 = 'USD_10',
  Usd_20 = 'USD_20',
  Usd_50 = 'USD_50',
  Usd_100 = 'USD_100',
  Vnd_500000 = 'VND_500000'
}

export enum CurrencyCode {
  Aud = 'AUD',
  Cad = 'CAD',
  Cny = 'CNY',
  Eur = 'EUR',
  Gbp = 'GBP',
  Hkd = 'HKD',
  Idr = 'IDR',
  Jpy = 'JPY',
  Krw = 'KRW',
  Myr = 'MYR',
  Php = 'PHP',
  Sgd = 'SGD',
  Thb = 'THB',
  Twd = 'TWD',
  Usd = 'USD',
  Vnd = 'VND'
}

export type ExchangeRateInfo = {
  __typename?: 'ExchangeRateInfo';
  /** 통화 */
  currencyCode: CurrencyCode;
  /** 이전 환율 */
  prevSpreadRate?: Maybe<Scalars['Float']['output']>;
  /** 현재 환율 */
  spreadRate: Scalars['Float']['output'];
  /** 키오스크 PK */
  terminalId: Scalars['Int']['output'];
};

export type Filter = {
  __typename?: 'Filter';
  /** 상세 필터 리스트 */
  filterDetailList: Array<FilterDetail>;
  /** 필터명[서울/경기/부산/...] */
  id: Scalars['Int']['output'];
  /** 필터명 */
  name: Scalars['String']['output'];
};

export type FilterDetail = {
  __typename?: 'FilterDetail';
  /** 상세 필터 코드 */
  code: Scalars['String']['output'];
  /** 상세 필터명 */
  name: Scalars['String']['output'];
};

export type ForeignWonEnableCurrency = {
  __typename?: 'ForeignWonEnableCurrency';
  /** 권종 List */
  currencyAmountList: Array<Scalars['String']['output']>;
  /** 통화 */
  currencyCode: CurrencyCode;
};

export type GetPrepaidCardTransListResponse = {
  __typename?: 'GetPrepaidCardTransListResponse';
  /** 카드 잔액 */
  cardBalance?: Maybe<Scalars['Int']['output']>;
  /** 응답 코드 */
  code?: Maybe<Scalars['String']['output']>;
  /** 추가 내역 여부 */
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  list?: Maybe<Array<CardTrans>>;
  /** 거래 유형 */
  transType?: Maybe<Scalars['String']['output']>;
};

export type KioskDetail = {
  __typename?: 'KioskDetail';
  /** 주소 */
  addr: Scalars['String']['output'];
  /** 키오스크 종료 시간 */
  closeTime?: Maybe<Scalars['String']['output']>;
  /** 원화 환전 가능 통화 목록 */
  currencyList: Array<ForeignWonEnableCurrency>;
  /** 외화 환전 가능 통화 목록 */
  foreignCurrencyList: Array<WonForeignEnableCurrency>;
  /** 이미지1 */
  image01: Scalars['String']['output'];
  /** 이미지2 */
  image02: Scalars['String']['output'];
  /** 위도 */
  lat: Scalars['String']['output'];
  /** 경도 */
  lon: Scalars['String']['output'];
  /** 메모 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 키오스크 시작 시간 */
  openTime?: Maybe<Scalars['String']['output']>;
  /** 키오스크 운영일 */
  operationDay: Scalars['String']['output'];
  /** [미사용] 지원 서비스 리스트 */
  service?: Maybe<Scalars['String']['output']>;
  /** 지원 서비스 리스트 */
  serviceList: Array<KioskService>;
  /** 기기명 */
  terminalName: Scalars['String']['output'];
};

export type KioskFilter = {
  __typename?: 'KioskFilter';
  /** 필터 상세 리스트 */
  filterList: Array<Filter>;
  /** 필터타입[LOCATION, SERVICE, CURRENCY] */
  type: Scalars['String']['output'];
};

export type KioskInfo = {
  __typename?: 'KioskInfo';
  /** 주소 */
  address: Scalars['String']['output'];
  /** 키오스크 지원 카드 서비스 */
  cardService?: Maybe<Scalars['String']['output']>;
  /** 키오스크 종료 시간 */
  closeTime?: Maybe<Scalars['String']['output']>;
  /** 외화환전 방출 권종 */
  currencyAmountType?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  /** 이미지1 */
  image01: Scalars['String']['output'];
  /** 이미지2 */
  image02: Scalars['String']['output'];
  /** 위도 */
  lat: Scalars['String']['output'];
  /** 언어[KO, EN, CNG, CNB, JP] */
  locale: Scalars['String']['output'];
  /** 경도 */
  lon: Scalars['String']['output'];
  /** 메모 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 키오스크 시작 시간 */
  openTime?: Maybe<Scalars['String']['output']>;
  /** 키오스크 운영일 */
  operationDay: Scalars['String']['output'];
  /** 홈페이지 노출 여부 */
  postingYn: Scalars['String']['output'];
  /** [미사용] 지원 서비스 리스트 */
  service: Scalars['String']['output'];
  /** 지원 서비스 리스트 */
  serviceList: Array<KioskService>;
  /** 키오스크 상태 */
  status?: Maybe<Scalars['String']['output']>;
  /** 외화환전 방출 권종 상세 */
  terminalCurrencyList: Array<ReleaseCurrency>;
  /** 키오스크 PK */
  terminalId: Scalars['Int']['output'];
  /** 기기명 */
  terminalName: Scalars['String']['output'];
  /** 기기 고유 번호 */
  terminalNo: Scalars['String']['output'];
};

export type KioskService = {
  __typename?: 'KioskService';
  /** 서비스 코드 */
  code: Scalars['String']['output'];
  /** 서비스명 */
  name: Scalars['String']['output'];
};

export type LoginInput = {
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 사용자명 */
  username: Scalars['String']['input'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  /** 2FA 인증 필요 여부 */
  requiresTwoFactor: Scalars['Boolean']['output'];
  /** 로그인 성공 시 토큰 (2FA 불필요 시) */
  tokens?: Maybe<AuthToken>;
  /** 2FA 임시 토큰 (2FA 필요 시) */
  twoFactorToken?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** [홈페이지] 상품권 이메일 등록 여부 확인 */
  checkEmail: CheckVoucherUserEmail;
  /** 로그인 */
  login: LoginResult;
  /** 로그아웃 */
  logout: Scalars['Boolean']['output'];
  /** 토큰 갱신 */
  refreshToken: AuthToken;
  /** [홈페이지] 외화 장입/보충 알림 고객 정보 등록 */
  registerNotification: SuccessResponse;
  /** [홈페이지] 상품권 이메일 등록 */
  registerVoucherEmail: SuccessResponse;
  /** [홈페이지] 렌탈/제휴 문의하기 */
  sendCompanyMail: SuccessResponse;
  /** [홈페이지] 이메일 문의하기. 고객 CS 처리용 */
  sendCustomerMail: SuccessResponse;
  /** 2FA 설정 (JWT 인증 필요) */
  setupTwoFactor: TotpSetupResult;
  /** [홈페이지] 외화 장입/보충 알림 고객 정보 업데이트 - 수신 여부 변경 */
  updateNotification: SuccessResponse;
  /** 2FA TOTP 검증 */
  verifyTwoFactor: AuthToken;
};


export type MutationCheckEmailArgs = {
  input: RegisterVoucherEmailInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRegisterNotificationArgs = {
  input: RegisterNotificationInput;
};


export type MutationRegisterVoucherEmailArgs = {
  input: RegisterVoucherEmailInput;
};


export type MutationSendCompanyMailArgs = {
  input: SendCompanyInput;
};


export type MutationSendCustomerMailArgs = {
  input: SendCustomerInput;
};


export type MutationSetupTwoFactorArgs = {
  input: TotpSetupInput;
};


export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationInput;
};


export type MutationVerifyTwoFactorArgs = {
  input: TotpVerifyInput;
};

export type PaginatedKiosk = {
  __typename?: 'PaginatedKiosk';
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  isEmpty: Scalars['Boolean']['output'];
  isFirst: Scalars['Boolean']['output'];
  isLast: Scalars['Boolean']['output'];
  list: Array<KioskInfo>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** [홈페이지] 오프라인 원화 환전 최저 환율 조회 */
  getForeignWonBestRates: BaseRateResponse;
  /** [홈페이지] 상품권 이미지 다운로드 */
  getImageBlob: Scalars['String']['output'];
  /** [홈페이지(모바일)] 키오스크 상세 조회 */
  getKioskDetail: KioskDetail;
  /** [홈페이지(모바일)] 키오스크 검색용 필터 목록 조회 */
  getKioskFilter: Array<KioskFilter>;
  /** [홈페이지(모바일)] 키오스크 목록 조회 */
  getKioskList: PaginatedKiosk;
  /** [홈페이지] 선불카드 - 더프리 거래 이용/충전 내역 및 잔액 조회 */
  getTheFreeCardTransList: GetPrepaidCardTransListResponse;
  /** [홈페이지] 상품권 데이터 조회 */
  getVoucher: GetPrepaidCardTransListResponse;
  /** [홈페이지] 오프라인 외화 환전 최저 환율 조회 */
  getWonForeignBestRates: BaseRateResponse;
  /** Health check query */
  health: Scalars['String']['output'];
};


export type QueryGetImageBlobArgs = {
  imageName: Scalars['String']['input'];
};


export type QueryGetKioskDetailArgs = {
  terminalId: Scalars['Float']['input'];
};


export type QueryGetKioskListArgs = {
  filterList?: InputMaybe<Array<Scalars['String']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryGetTheFreeCardTransListArgs = {
  cardNo: Scalars['String']['input'];
  cvcNo: Scalars['String']['input'];
  endDt: Scalars['String']['input'];
  exprDt: Scalars['String']['input'];
  lang: Scalars['String']['input'];
  password: Scalars['String']['input'];
  startDt: Scalars['String']['input'];
  transType: Scalars['String']['input'];
};


export type QueryGetVoucherArgs = {
  lang: Scalars['String']['input'];
  q: Scalars['String']['input'];
};

export type RefreshTokenInput = {
  /** 리프레시 토큰 */
  refreshToken: Scalars['String']['input'];
};

export type RegisterNotificationInput = {
  /** 통화 List */
  currencyList: Array<CurrencyCode>;
  /** 고객 연락처 */
  phoneNumber: Scalars['String']['input'];
};

export type RegisterVoucherEmailInput = {
  /** 언어코드 */
  lang: Scalars['String']['input'];
  /** querystring */
  q: Scalars['String']['input'];
  /** 확인 이메일 */
  userCheckEmail: Scalars['String']['input'];
  /** 유저 이메일 */
  userEmail: Scalars['String']['input'];
};

export type ReleaseCurrency = {
  __typename?: 'ReleaseCurrency';
  /** 방출 가능 여부 (최소 수량 감안) */
  availableRelease: Scalars['Boolean']['output'];
  /** 잔여 수량 */
  count: Scalars['Int']['output'];
  /** 권종 */
  currencyAmount: CurrencyAmount;
  /** 통화 */
  currencyCode: CurrencyCode;
  /** [미사용] 방출 가능 여부 */
  releaseYn?: Maybe<Scalars['String']['output']>;
  /** 판매 여부 */
  usedCurrency: Scalars['Boolean']['output'];
};

export type SendCompanyInput = {
  /** 회사명 */
  company?: InputMaybe<Scalars['String']['input']>;
  /** 문의 내용 */
  content?: InputMaybe<Scalars['String']['input']>;
  /** 전화번호 */
  phone: Scalars['String']['input'];
  /** 고객 이메일 */
  userEmail: Scalars['String']['input'];
  /** 고객명 */
  userName: Scalars['String']['input'];
};

export type SendCustomerInput = {
  /** 문의 내용 */
  content: Scalars['String']['input'];
  /** 고객 이메일 */
  userEmail: Scalars['String']['input'];
  /** 고객명 */
  userName: Scalars['String']['input'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type TotpSetupInput = {
  /** TOTP 코드 (6자리) */
  totpCode?: InputMaybe<Scalars['String']['input']>;
};

export type TotpSetupResult = {
  __typename?: 'TotpSetupResult';
  /** 2FA 활성화 완료 여부 */
  enabled?: Maybe<Scalars['Boolean']['output']>;
  /** TOTP Key URI (QR코드 생성용) */
  keyUri?: Maybe<Scalars['String']['output']>;
  /** TOTP Secret (QR코드 생성용) */
  secret?: Maybe<Scalars['String']['output']>;
};

export type TotpVerifyInput = {
  /** TOTP 6자리 코드 */
  totpCode: Scalars['String']['input'];
  /** 2FA 임시 토큰 */
  twoFactorToken: Scalars['String']['input'];
};

export type UpdateNotificationInput = {
  /** 고객 연락처 */
  phoneNumber: Scalars['String']['input'];
  /** 수신 가능 여부 */
  sendYn: Scalars['String']['input'];
};

export type WonForeignEnableCurrency = {
  __typename?: 'WonForeignEnableCurrency';
  /** 통화 금액 */
  amount: Scalars['Int']['output'];
  /** 방출 가능 여부 (최소 수량 감안) */
  availableRelease: Scalars['Boolean']['output'];
  /** 잔여 수량 */
  count: Scalars['Int']['output'];
  /** 권종 */
  currencyAmount: CurrencyAmount;
  /** 통화 */
  currencyCode: CurrencyCode;
  /** [미사용] 방출 가능 여부 */
  releaseYn?: Maybe<Scalars['String']['output']>;
  /** 판매 여부 */
  usedCurrency: Scalars['Boolean']['output'];
};

export type GetWonForeignBestRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWonForeignBestRatesQuery = { __typename?: 'Query', getWonForeignBestRates: { __typename?: 'BaseRateResponse', currencyRates: Array<{ __typename?: 'ExchangeRateInfo', currencyCode: CurrencyCode, spreadRate: number, prevSpreadRate?: number | null, terminalId: number }> } };

export type GetForeignWonBestRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetForeignWonBestRatesQuery = { __typename?: 'Query', getForeignWonBestRates: { __typename?: 'BaseRateResponse', currencyRates: Array<{ __typename?: 'ExchangeRateInfo', currencyCode: CurrencyCode, spreadRate: number, prevSpreadRate?: number | null, terminalId: number }> } };

export type GetKioskDetailQueryVariables = Exact<{
  terminalId: Scalars['Float']['input'];
}>;


export type GetKioskDetailQuery = { __typename?: 'Query', getKioskDetail: { __typename?: 'KioskDetail', terminalName: string, addr: string, image01: string, image02: string, lat: string, lon: string, memo?: string | null, openTime?: string | null, closeTime?: string | null, operationDay: string, service?: string | null, serviceList: Array<{ __typename?: 'KioskService', code: string, name: string }>, currencyList: Array<{ __typename?: 'ForeignWonEnableCurrency', currencyCode: CurrencyCode, currencyAmountList: Array<string> }>, foreignCurrencyList: Array<{ __typename?: 'WonForeignEnableCurrency', currencyCode: CurrencyCode, currencyAmount: CurrencyAmount, amount: number, count: number, availableRelease: boolean, usedCurrency: boolean, releaseYn?: string | null }> } };

export type GetKioskFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKioskFilterQuery = { __typename?: 'Query', getKioskFilter: Array<{ __typename?: 'KioskFilter', type: string, filterList: Array<{ __typename?: 'Filter', id: number, name: string, filterDetailList: Array<{ __typename?: 'FilterDetail', code: string, name: string }> }> }> };

export type GetKioskListQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  filterList?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetKioskListQuery = { __typename?: 'Query', getKioskList: { __typename?: 'PaginatedKiosk', pageNumber: number, pageSize: number, totalElements: number, totalPages: number, hasNext: boolean, hasPrevious: boolean, isFirst: boolean, isLast: boolean, isEmpty: boolean, list: Array<{ __typename?: 'KioskInfo', id: number, terminalId: number, terminalName: string, terminalNo: string, address: string, image01: string, image02: string, lat: string, lon: string, memo?: string | null, openTime?: string | null, closeTime?: string | null, operationDay: string, status?: string | null, locale: string, postingYn: string, service: string, serviceList: Array<{ __typename?: 'KioskService', code: string, name: string }>, terminalCurrencyList: Array<{ __typename?: 'ReleaseCurrency', currencyCode: CurrencyCode }> }> } };


export const GetWonForeignBestRatesDocument = gql`
    query GetWonForeignBestRates {
  getWonForeignBestRates {
    currencyRates {
      currencyCode
      spreadRate
      prevSpreadRate
      terminalId
    }
  }
}
    `;

/**
 * __useGetWonForeignBestRatesQuery__
 *
 * To run a query within a React component, call `useGetWonForeignBestRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWonForeignBestRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWonForeignBestRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWonForeignBestRatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>(GetWonForeignBestRatesDocument, options);
      }
export function useGetWonForeignBestRatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>(GetWonForeignBestRatesDocument, options);
        }
// @ts-ignore
export function useGetWonForeignBestRatesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>;
export function useGetWonForeignBestRatesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetWonForeignBestRatesQuery | undefined, GetWonForeignBestRatesQueryVariables>;
export function useGetWonForeignBestRatesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>(GetWonForeignBestRatesDocument, options);
        }
export type GetWonForeignBestRatesQueryHookResult = ReturnType<typeof useGetWonForeignBestRatesQuery>;
export type GetWonForeignBestRatesLazyQueryHookResult = ReturnType<typeof useGetWonForeignBestRatesLazyQuery>;
export type GetWonForeignBestRatesSuspenseQueryHookResult = ReturnType<typeof useGetWonForeignBestRatesSuspenseQuery>;
export type GetWonForeignBestRatesQueryResult = ApolloReactCommon.QueryResult<GetWonForeignBestRatesQuery, GetWonForeignBestRatesQueryVariables>;
export const GetForeignWonBestRatesDocument = gql`
    query GetForeignWonBestRates {
  getForeignWonBestRates {
    currencyRates {
      currencyCode
      spreadRate
      prevSpreadRate
      terminalId
    }
  }
}
    `;

/**
 * __useGetForeignWonBestRatesQuery__
 *
 * To run a query within a React component, call `useGetForeignWonBestRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForeignWonBestRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForeignWonBestRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetForeignWonBestRatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>(GetForeignWonBestRatesDocument, options);
      }
export function useGetForeignWonBestRatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>(GetForeignWonBestRatesDocument, options);
        }
// @ts-ignore
export function useGetForeignWonBestRatesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>;
export function useGetForeignWonBestRatesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetForeignWonBestRatesQuery | undefined, GetForeignWonBestRatesQueryVariables>;
export function useGetForeignWonBestRatesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>(GetForeignWonBestRatesDocument, options);
        }
export type GetForeignWonBestRatesQueryHookResult = ReturnType<typeof useGetForeignWonBestRatesQuery>;
export type GetForeignWonBestRatesLazyQueryHookResult = ReturnType<typeof useGetForeignWonBestRatesLazyQuery>;
export type GetForeignWonBestRatesSuspenseQueryHookResult = ReturnType<typeof useGetForeignWonBestRatesSuspenseQuery>;
export type GetForeignWonBestRatesQueryResult = ApolloReactCommon.QueryResult<GetForeignWonBestRatesQuery, GetForeignWonBestRatesQueryVariables>;
export const GetKioskDetailDocument = gql`
    query GetKioskDetail($terminalId: Float!) {
  getKioskDetail(terminalId: $terminalId) {
    terminalName
    addr
    image01
    image02
    lat
    lon
    memo
    openTime
    closeTime
    operationDay
    service
    serviceList {
      code
      name
    }
    currencyList {
      currencyCode
      currencyAmountList
    }
    foreignCurrencyList {
      currencyCode
      currencyAmount
      amount
      count
      availableRelease
      usedCurrency
      releaseYn
    }
  }
}
    `;

/**
 * __useGetKioskDetailQuery__
 *
 * To run a query within a React component, call `useGetKioskDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKioskDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKioskDetailQuery({
 *   variables: {
 *      terminalId: // value for 'terminalId'
 *   },
 * });
 */
export function useGetKioskDetailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetKioskDetailQuery, GetKioskDetailQueryVariables> & ({ variables: GetKioskDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetKioskDetailQuery, GetKioskDetailQueryVariables>(GetKioskDetailDocument, options);
      }
export function useGetKioskDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetKioskDetailQuery, GetKioskDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetKioskDetailQuery, GetKioskDetailQueryVariables>(GetKioskDetailDocument, options);
        }
// @ts-ignore
export function useGetKioskDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetKioskDetailQuery, GetKioskDetailQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetKioskDetailQuery, GetKioskDetailQueryVariables>;
export function useGetKioskDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetKioskDetailQuery, GetKioskDetailQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetKioskDetailQuery | undefined, GetKioskDetailQueryVariables>;
export function useGetKioskDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetKioskDetailQuery, GetKioskDetailQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetKioskDetailQuery, GetKioskDetailQueryVariables>(GetKioskDetailDocument, options);
        }
export type GetKioskDetailQueryHookResult = ReturnType<typeof useGetKioskDetailQuery>;
export type GetKioskDetailLazyQueryHookResult = ReturnType<typeof useGetKioskDetailLazyQuery>;
export type GetKioskDetailSuspenseQueryHookResult = ReturnType<typeof useGetKioskDetailSuspenseQuery>;
export type GetKioskDetailQueryResult = ApolloReactCommon.QueryResult<GetKioskDetailQuery, GetKioskDetailQueryVariables>;
export const GetKioskFilterDocument = gql`
    query GetKioskFilter {
  getKioskFilter {
    type
    filterList {
      id
      name
      filterDetailList {
        code
        name
      }
    }
  }
}
    `;

/**
 * __useGetKioskFilterQuery__
 *
 * To run a query within a React component, call `useGetKioskFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKioskFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKioskFilterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetKioskFilterQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetKioskFilterQuery, GetKioskFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetKioskFilterQuery, GetKioskFilterQueryVariables>(GetKioskFilterDocument, options);
      }
export function useGetKioskFilterLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetKioskFilterQuery, GetKioskFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetKioskFilterQuery, GetKioskFilterQueryVariables>(GetKioskFilterDocument, options);
        }
// @ts-ignore
export function useGetKioskFilterSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetKioskFilterQuery, GetKioskFilterQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetKioskFilterQuery, GetKioskFilterQueryVariables>;
export function useGetKioskFilterSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetKioskFilterQuery, GetKioskFilterQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetKioskFilterQuery | undefined, GetKioskFilterQueryVariables>;
export function useGetKioskFilterSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetKioskFilterQuery, GetKioskFilterQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetKioskFilterQuery, GetKioskFilterQueryVariables>(GetKioskFilterDocument, options);
        }
export type GetKioskFilterQueryHookResult = ReturnType<typeof useGetKioskFilterQuery>;
export type GetKioskFilterLazyQueryHookResult = ReturnType<typeof useGetKioskFilterLazyQuery>;
export type GetKioskFilterSuspenseQueryHookResult = ReturnType<typeof useGetKioskFilterSuspenseQuery>;
export type GetKioskFilterQueryResult = ApolloReactCommon.QueryResult<GetKioskFilterQuery, GetKioskFilterQueryVariables>;
export const GetKioskListDocument = gql`
    query GetKioskList($page: Int!, $size: Int!, $filterList: [String!], $keyword: String) {
  getKioskList(
    page: $page
    size: $size
    filterList: $filterList
    keyword: $keyword
  ) {
    list {
      id
      terminalId
      terminalName
      terminalNo
      address
      image01
      image02
      lat
      lon
      memo
      openTime
      closeTime
      operationDay
      status
      locale
      postingYn
      service
      serviceList {
        code
        name
      }
      terminalCurrencyList {
        currencyCode
      }
    }
    pageNumber
    pageSize
    totalElements
    totalPages
    hasNext
    hasPrevious
    isFirst
    isLast
    isEmpty
  }
}
    `;

/**
 * __useGetKioskListQuery__
 *
 * To run a query within a React component, call `useGetKioskListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKioskListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKioskListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filterList: // value for 'filterList'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useGetKioskListQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetKioskListQuery, GetKioskListQueryVariables> & ({ variables: GetKioskListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetKioskListQuery, GetKioskListQueryVariables>(GetKioskListDocument, options);
      }
export function useGetKioskListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetKioskListQuery, GetKioskListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetKioskListQuery, GetKioskListQueryVariables>(GetKioskListDocument, options);
        }
// @ts-ignore
export function useGetKioskListSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetKioskListQuery, GetKioskListQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetKioskListQuery, GetKioskListQueryVariables>;
export function useGetKioskListSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetKioskListQuery, GetKioskListQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetKioskListQuery | undefined, GetKioskListQueryVariables>;
export function useGetKioskListSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetKioskListQuery, GetKioskListQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetKioskListQuery, GetKioskListQueryVariables>(GetKioskListDocument, options);
        }
export type GetKioskListQueryHookResult = ReturnType<typeof useGetKioskListQuery>;
export type GetKioskListLazyQueryHookResult = ReturnType<typeof useGetKioskListLazyQuery>;
export type GetKioskListSuspenseQueryHookResult = ReturnType<typeof useGetKioskListSuspenseQuery>;
export type GetKioskListQueryResult = ApolloReactCommon.QueryResult<GetKioskListQuery, GetKioskListQueryVariables>;