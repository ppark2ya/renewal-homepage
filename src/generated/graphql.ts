/* eslint-disable */
// @ts-nocheck
import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '../lib/graphql/shim';
import * as ApolloReactHooks from '../lib/graphql/apollo-react-shim';
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
  /** 로그인 */
  login: LoginResult;
  /** 로그아웃 */
  logout: Scalars['Boolean']['output'];
  /** 토큰 갱신 */
  refreshToken: AuthToken;
  /** [홈페이지] 외화 장입/보충 알림 고객 정보 등록 */
  registerNotification: SuccessResponse;
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

export type Query = {
  __typename?: 'Query';
  /** 오프라인 원화 환전 최저 환율 조회 */
  getForeignWonBestRates: BaseRateResponse;
  /** [홈페이지] 선불카드 - 더프리 거래 이용/충전 내역 및 잔액 조회 */
  getTheFreeCardTransList: GetPrepaidCardTransListResponse;
  /** 오프라인 외화 환전 최저 환율 조회 */
  getWonForeignBestRates: BaseRateResponse;
  /** Health check query */
  health: Scalars['String']['output'];
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

export type GetWonForeignBestRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWonForeignBestRatesQuery = { __typename?: 'Query', getWonForeignBestRates: { __typename?: 'BaseRateResponse', currencyRates: Array<{ __typename?: 'ExchangeRateInfo', currencyCode: CurrencyCode, spreadRate: number, prevSpreadRate?: number | null, terminalId: number }> } };

export type GetForeignWonBestRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetForeignWonBestRatesQuery = { __typename?: 'Query', getForeignWonBestRates: { __typename?: 'BaseRateResponse', currencyRates: Array<{ __typename?: 'ExchangeRateInfo', currencyCode: CurrencyCode, spreadRate: number, prevSpreadRate?: number | null, terminalId: number }> } };


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