import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, UseMutationOptions, QueryFunctionContext } from 'react-query';
import { axiosFetcher } from '../axios/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Cursor for paging through collections */
  ConnectionCursor: string;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: string;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: string;
  /** A field whose value conforms to strong password */
  Password: string;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: string;
};

export type Company = {
  __typename?: 'Company';
  city?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  country: Scalars['CountryCode'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  invoices?: Maybe<CompanyInvoicesConnection>;
  invoicesAggregate: Array<CompanyInvoicesAggregateResponse>;
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxNumber: Scalars['String'];
  taxRate: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  website?: Maybe<Scalars['String']>;
};


export type CompanyInvoicesArgs = {
  filter?: InputMaybe<InvoiceFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InvoiceSort>>;
};


export type CompanyInvoicesAggregateArgs = {
  filter?: InputMaybe<InvoiceAggregateFilter>;
};

export type CompanyAggregateFilter = {
  and?: InputMaybe<Array<CompanyAggregateFilter>>;
  city?: InputMaybe<StringFieldComparison>;
  contactEmail?: InputMaybe<StringFieldComparison>;
  contactName?: InputMaybe<StringFieldComparison>;
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyAggregateFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
  streetAddress?: InputMaybe<StringFieldComparison>;
  taxName?: InputMaybe<StringFieldComparison>;
  taxNumber?: InputMaybe<StringFieldComparison>;
  taxRate?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  website?: InputMaybe<StringFieldComparison>;
};

export type CompanyAggregateGroupBy = {
  __typename?: 'CompanyAggregateGroupBy';
  city?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  taxRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyAggregateResponse = {
  __typename?: 'CompanyAggregateResponse';
  avg?: Maybe<CompanyAvgAggregate>;
  count?: Maybe<CompanyCountAggregate>;
  groupBy?: Maybe<CompanyAggregateGroupBy>;
  max?: Maybe<CompanyMaxAggregate>;
  min?: Maybe<CompanyMinAggregate>;
  sum?: Maybe<CompanySumAggregate>;
};

export type CompanyAvgAggregate = {
  __typename?: 'CompanyAvgAggregate';
  taxRate?: Maybe<Scalars['Float']>;
};

export type CompanyConnection = {
  __typename?: 'CompanyConnection';
  /** Array of nodes. */
  nodes: Array<Company>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type CompanyCountAggregate = {
  __typename?: 'CompanyCountAggregate';
  city?: Maybe<Scalars['Int']>;
  contactEmail?: Maybe<Scalars['Int']>;
  contactName?: Maybe<Scalars['Int']>;
  country?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  postalCode?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['Int']>;
  streetAddress?: Maybe<Scalars['Int']>;
  taxName?: Maybe<Scalars['Int']>;
  taxNumber?: Maybe<Scalars['Int']>;
  taxRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['Int']>;
};

export type CompanyDeleteFilter = {
  and?: InputMaybe<Array<CompanyDeleteFilter>>;
  city?: InputMaybe<StringFieldComparison>;
  contactEmail?: InputMaybe<StringFieldComparison>;
  contactName?: InputMaybe<StringFieldComparison>;
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyDeleteFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
  streetAddress?: InputMaybe<StringFieldComparison>;
  taxName?: InputMaybe<StringFieldComparison>;
  taxNumber?: InputMaybe<StringFieldComparison>;
  taxRate?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  website?: InputMaybe<StringFieldComparison>;
};

export type CompanyDeleteResponse = {
  __typename?: 'CompanyDeleteResponse';
  city?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoices?: Maybe<Array<Invoice>>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  taxRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyFilter = {
  and?: InputMaybe<Array<CompanyFilter>>;
  city?: InputMaybe<StringFieldComparison>;
  contactEmail?: InputMaybe<StringFieldComparison>;
  contactName?: InputMaybe<StringFieldComparison>;
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoices?: InputMaybe<CompanyFilterInvoiceFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
  streetAddress?: InputMaybe<StringFieldComparison>;
  taxName?: InputMaybe<StringFieldComparison>;
  taxNumber?: InputMaybe<StringFieldComparison>;
  taxRate?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<CompanyFilterUserFilter>;
  website?: InputMaybe<StringFieldComparison>;
};

export type CompanyFilterInvoiceFilter = {
  and?: InputMaybe<Array<CompanyFilterInvoiceFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dueDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceDate?: InputMaybe<DateFieldComparison>;
  invoiceNumber?: InputMaybe<NumberFieldComparison>;
  or?: InputMaybe<Array<CompanyFilterInvoiceFilter>>;
  paidDate?: InputMaybe<DateFieldComparison>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CompanyFilterUserFilter = {
  and?: InputMaybe<Array<CompanyFilterUserFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<CompanyFilterUserFilter>>;
};

export type CompanyInvoicesAggregateGroupBy = {
  __typename?: 'CompanyInvoicesAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CompanyInvoicesAggregateResponse = {
  __typename?: 'CompanyInvoicesAggregateResponse';
  avg?: Maybe<CompanyInvoicesAvgAggregate>;
  count?: Maybe<CompanyInvoicesCountAggregate>;
  groupBy?: Maybe<CompanyInvoicesAggregateGroupBy>;
  max?: Maybe<CompanyInvoicesMaxAggregate>;
  min?: Maybe<CompanyInvoicesMinAggregate>;
  sum?: Maybe<CompanyInvoicesSumAggregate>;
};

export type CompanyInvoicesAvgAggregate = {
  __typename?: 'CompanyInvoicesAvgAggregate';
  invoiceNumber?: Maybe<Scalars['Float']>;
};

export type CompanyInvoicesConnection = {
  __typename?: 'CompanyInvoicesConnection';
  /** Array of nodes. */
  nodes: Array<Invoice>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type CompanyInvoicesCountAggregate = {
  __typename?: 'CompanyInvoicesCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  dueDate?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  invoiceDate?: Maybe<Scalars['Int']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type CompanyInvoicesMaxAggregate = {
  __typename?: 'CompanyInvoicesMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CompanyInvoicesMinAggregate = {
  __typename?: 'CompanyInvoicesMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CompanyInvoicesSumAggregate = {
  __typename?: 'CompanyInvoicesSumAggregate';
  invoiceNumber?: Maybe<Scalars['Float']>;
};

export type CompanyMaxAggregate = {
  __typename?: 'CompanyMaxAggregate';
  city?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  taxRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyMinAggregate = {
  __typename?: 'CompanyMinAggregate';
  city?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  taxRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanySort = {
  direction: SortDirection;
  field: CompanySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CompanySortFields {
  City = 'city',
  ContactEmail = 'contactEmail',
  ContactName = 'contactName',
  Country = 'country',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  PostalCode = 'postalCode',
  State = 'state',
  StreetAddress = 'streetAddress',
  TaxName = 'taxName',
  TaxNumber = 'taxNumber',
  TaxRate = 'taxRate',
  UpdatedAt = 'updatedAt',
  Website = 'website'
}

export type CompanySumAggregate = {
  __typename?: 'CompanySumAggregate';
  taxRate?: Maybe<Scalars['Float']>;
};

export type CountryCodeAdaptedScalarFilterComparison = {
  eq?: InputMaybe<Scalars['CountryCode']>;
  gt?: InputMaybe<Scalars['CountryCode']>;
  gte?: InputMaybe<Scalars['CountryCode']>;
  iLike?: InputMaybe<Scalars['CountryCode']>;
  in?: InputMaybe<Array<Scalars['CountryCode']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['CountryCode']>;
  lt?: InputMaybe<Scalars['CountryCode']>;
  lte?: InputMaybe<Scalars['CountryCode']>;
  neq?: InputMaybe<Scalars['CountryCode']>;
  notILike?: InputMaybe<Scalars['CountryCode']>;
  notIn?: InputMaybe<Array<Scalars['CountryCode']>>;
  notLike?: InputMaybe<Scalars['CountryCode']>;
};

export type CreateCompany = {
  city?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  country: Scalars['CountryCode'];
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  taxName?: InputMaybe<Scalars['String']>;
  taxNumber: Scalars['String'];
  taxRate: Scalars['Int'];
  website?: InputMaybe<Scalars['String']>;
};

export type CreateInvoice = {
  company: CreateInvoiceCompany;
  dueDate?: InputMaybe<Scalars['String']>;
  invoiceDate?: InputMaybe<Scalars['String']>;
  paidDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<InvoiceStatusEnum>;
};

export type CreateInvoiceCompany = {
  id: Scalars['String'];
};

export type CreateInvoiceItem = {
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  invoice: CreateInvoiceItemInvoice;
  name: Scalars['String'];
  price: Scalars['Int'];
  quantity: Scalars['Int'];
  unit?: InputMaybe<Scalars['String']>;
};

export type CreateInvoiceItemInvoice = {
  id: Scalars['String'];
};

export type CreateManyInvoiceItemsInput = {
  /** Array of records to create */
  invoiceItems: Array<CreateInvoiceItem>;
};

export type CreateOneCompanyInput = {
  /** The record to create */
  company: CreateCompany;
};

export type CreateOneInvoiceInput = {
  /** The record to create */
  invoice: CreateInvoice;
};

export type CreateOneInvoiceItemInput = {
  /** The record to create */
  invoiceItem: CreateInvoiceItem;
};

export type CreateUser = {
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['Password'];
  profileImage?: InputMaybe<Scalars['String']>;
};

export type DataCode = {
  __typename?: 'DataCode';
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['JSON']>;
  expireAt?: Maybe<Scalars['DateTime']>;
  expired: Scalars['Boolean'];
  id: Scalars['ID'];
  parent: Scalars['String'];
  type: DataCodeEnum;
  updatedAt: Scalars['DateTime'];
  used: Scalars['Boolean'];
};

export type DataCodeAggregateGroupBy = {
  __typename?: 'DataCodeAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['String']>;
};

export type DataCodeCountAggregate = {
  __typename?: 'DataCodeCountAggregate';
  id?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['Int']>;
};

export type DataCodeEdge = {
  __typename?: 'DataCodeEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the DataCode */
  node: DataCode;
};

export enum DataCodeEnum {
  ForgotPassword = 'ForgotPassword',
  Welcome = 'Welcome'
}

export type DataCodeMaxAggregate = {
  __typename?: 'DataCodeMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['String']>;
};

export type DataCodeMinAggregate = {
  __typename?: 'DataCodeMinAggregate';
  id?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['String']>;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};

export type DeleteManyCompaniesInput = {
  /** Filter to find records to delete */
  filter: CompanyDeleteFilter;
};

export type DeleteManyInvoiceItemsInput = {
  /** Filter to find records to delete */
  filter: InvoiceItemDeleteFilter;
};

export type DeleteManyInvoicesInput = {
  /** Filter to find records to delete */
  filter: InvoiceDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int'];
};

export type DeleteOneCompanyInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneInvoiceInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type DeleteOneInvoiceItemInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type ForgotPasswordInput = {
  email: Scalars['EmailAddress'];
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  iLike?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  neq?: InputMaybe<Scalars['ID']>;
  notILike?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
  notLike?: InputMaybe<Scalars['ID']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  company: Company;
  createdAt: Scalars['DateTime'];
  dueDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  invoiceDate: Scalars['DateTime'];
  invoiceNumber: Scalars['Int'];
  items?: Maybe<Array<InvoiceItem>>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status: InvoiceStatusEnum;
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type InvoiceItemsArgs = {
  filter?: InputMaybe<InvoiceItemFilter>;
  sorting?: InputMaybe<Array<InvoiceItemSort>>;
};

export type InvoiceAggregateFilter = {
  and?: InputMaybe<Array<InvoiceAggregateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dueDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceDate?: InputMaybe<DateFieldComparison>;
  invoiceNumber?: InputMaybe<NumberFieldComparison>;
  or?: InputMaybe<Array<InvoiceAggregateFilter>>;
  paidDate?: InputMaybe<DateFieldComparison>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type InvoiceAggregateGroupBy = {
  __typename?: 'InvoiceAggregateGroupBy';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type InvoiceAvgAggregate = {
  __typename?: 'InvoiceAvgAggregate';
  invoiceNumber?: Maybe<Scalars['Float']>;
};

export type InvoiceConnection = {
  __typename?: 'InvoiceConnection';
  /** Array of nodes. */
  nodes: Array<Invoice>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type InvoiceCountAggregate = {
  __typename?: 'InvoiceCountAggregate';
  createdAt?: Maybe<Scalars['Int']>;
  dueDate?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  invoiceDate?: Maybe<Scalars['Int']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type InvoiceDeleteFilter = {
  and?: InputMaybe<Array<InvoiceDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dueDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceDate?: InputMaybe<DateFieldComparison>;
  invoiceNumber?: InputMaybe<NumberFieldComparison>;
  or?: InputMaybe<Array<InvoiceDeleteFilter>>;
  paidDate?: InputMaybe<DateFieldComparison>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type InvoiceDeleteResponse = {
  __typename?: 'InvoiceDeleteResponse';
  company?: Maybe<Company>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<InvoiceItem>>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type InvoiceFilter = {
  and?: InputMaybe<Array<InvoiceFilter>>;
  company?: InputMaybe<InvoiceFilterCompanyFilter>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dueDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceDate?: InputMaybe<DateFieldComparison>;
  invoiceNumber?: InputMaybe<NumberFieldComparison>;
  items?: InputMaybe<InvoiceFilterInvoiceItemFilter>;
  or?: InputMaybe<Array<InvoiceFilter>>;
  paidDate?: InputMaybe<DateFieldComparison>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<InvoiceFilterUserFilter>;
};

export type InvoiceFilterCompanyFilter = {
  and?: InputMaybe<Array<InvoiceFilterCompanyFilter>>;
  city?: InputMaybe<StringFieldComparison>;
  contactEmail?: InputMaybe<StringFieldComparison>;
  contactName?: InputMaybe<StringFieldComparison>;
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceFilterCompanyFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
  streetAddress?: InputMaybe<StringFieldComparison>;
  taxName?: InputMaybe<StringFieldComparison>;
  taxNumber?: InputMaybe<StringFieldComparison>;
  taxRate?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  website?: InputMaybe<StringFieldComparison>;
};

export type InvoiceFilterInvoiceItemFilter = {
  and?: InputMaybe<Array<InvoiceFilterInvoiceItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceFilterInvoiceItemFilter>>;
};

export type InvoiceFilterUserFilter = {
  and?: InputMaybe<Array<InvoiceFilterUserFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<InvoiceFilterUserFilter>>;
};

export type InvoiceItem = {
  __typename?: 'InvoiceItem';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  invoice: Invoice;
  name: Scalars['String'];
  price: Scalars['Int'];
  quantity: Scalars['Int'];
  unit?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type InvoiceItemAggregateGroupBy = {
  __typename?: 'InvoiceItemAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type InvoiceItemCountAggregate = {
  __typename?: 'InvoiceItemCountAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
};

export type InvoiceItemDeleteFilter = {
  and?: InputMaybe<Array<InvoiceItemDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceItemDeleteFilter>>;
};

export type InvoiceItemDeleteResponse = {
  __typename?: 'InvoiceItemDeleteResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  invoice?: Maybe<Invoice>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  unit?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type InvoiceItemFilter = {
  and?: InputMaybe<Array<InvoiceItemFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  invoice?: InputMaybe<InvoiceItemFilterInvoiceFilter>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceItemFilter>>;
  user?: InputMaybe<InvoiceItemFilterUserFilter>;
};

export type InvoiceItemFilterInvoiceFilter = {
  and?: InputMaybe<Array<InvoiceItemFilterInvoiceFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dueDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceDate?: InputMaybe<DateFieldComparison>;
  invoiceNumber?: InputMaybe<NumberFieldComparison>;
  or?: InputMaybe<Array<InvoiceItemFilterInvoiceFilter>>;
  paidDate?: InputMaybe<DateFieldComparison>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type InvoiceItemFilterUserFilter = {
  and?: InputMaybe<Array<InvoiceItemFilterUserFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<InvoiceItemFilterUserFilter>>;
};

export type InvoiceItemMaxAggregate = {
  __typename?: 'InvoiceItemMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type InvoiceItemMinAggregate = {
  __typename?: 'InvoiceItemMinAggregate';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type InvoiceItemSort = {
  direction: SortDirection;
  field: InvoiceItemSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum InvoiceItemSortFields {
  Id = 'id',
  Name = 'name'
}

export type InvoiceItemUpdateFilter = {
  and?: InputMaybe<Array<InvoiceItemUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceItemUpdateFilter>>;
};

export type InvoiceMaxAggregate = {
  __typename?: 'InvoiceMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type InvoiceMinAggregate = {
  __typename?: 'InvoiceMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type InvoiceSort = {
  direction: SortDirection;
  field: InvoiceSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum InvoiceSortFields {
  CreatedAt = 'createdAt',
  DueDate = 'dueDate',
  Id = 'id',
  InvoiceDate = 'invoiceDate',
  InvoiceNumber = 'invoiceNumber',
  PaidDate = 'paidDate',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

export enum InvoiceStatusEnum {
  Draft = 'Draft',
  Paid = 'Paid',
  Sent = 'Sent'
}

export type InvoiceStatusEnumFilterComparison = {
  eq?: InputMaybe<InvoiceStatusEnum>;
  gt?: InputMaybe<InvoiceStatusEnum>;
  gte?: InputMaybe<InvoiceStatusEnum>;
  iLike?: InputMaybe<InvoiceStatusEnum>;
  in?: InputMaybe<Array<InvoiceStatusEnum>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<InvoiceStatusEnum>;
  lt?: InputMaybe<InvoiceStatusEnum>;
  lte?: InputMaybe<InvoiceStatusEnum>;
  neq?: InputMaybe<InvoiceStatusEnum>;
  notILike?: InputMaybe<InvoiceStatusEnum>;
  notIn?: InputMaybe<Array<InvoiceStatusEnum>>;
  notLike?: InputMaybe<InvoiceStatusEnum>;
};

export type InvoiceSumAggregate = {
  __typename?: 'InvoiceSumAggregate';
  invoiceNumber?: Maybe<Scalars['Float']>;
};

export type InvoiceUpdateFilter = {
  and?: InputMaybe<Array<InvoiceUpdateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  dueDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceDate?: InputMaybe<DateFieldComparison>;
  invoiceNumber?: InputMaybe<NumberFieldComparison>;
  or?: InputMaybe<Array<InvoiceUpdateFilter>>;
  paidDate?: InputMaybe<DateFieldComparison>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type LoginInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['Password'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  expiry: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyInvoiceItems: Array<InvoiceItem>;
  createOneCompany: Company;
  createOneInvoice: Invoice;
  createOneInvoiceItem: InvoiceItem;
  deleteManyCompanies: DeleteManyResponse;
  deleteManyInvoiceItems: DeleteManyResponse;
  deleteManyInvoices: DeleteManyResponse;
  deleteOneCompany: CompanyDeleteResponse;
  deleteOneInvoice: InvoiceDeleteResponse;
  deleteOneInvoiceItem: InvoiceItemDeleteResponse;
  forgotPassword: Scalars['Boolean'];
  login: LoginResponse;
  register: LoginResponse;
  resetPassword: Scalars['Boolean'];
  seedClients?: Maybe<Array<Company>>;
  seedInvoices?: Maybe<Array<Invoice>>;
  setCompanyOnInvoice: Invoice;
  setUserOnInvoice: Invoice;
  updateManyInvoiceItems: UpdateManyResponse;
  updateManyInvoices: UpdateManyResponse;
  updateOneCompany: Company;
  updateOneInvoice: Invoice;
  updateOneInvoiceItem: InvoiceItem;
  updateOneUser: User;
};


export type MutationCreateManyInvoiceItemsArgs = {
  input: CreateManyInvoiceItemsInput;
};


export type MutationCreateOneCompanyArgs = {
  input: CreateOneCompanyInput;
};


export type MutationCreateOneInvoiceArgs = {
  input: CreateOneInvoiceInput;
};


export type MutationCreateOneInvoiceItemArgs = {
  input: CreateOneInvoiceItemInput;
};


export type MutationDeleteManyCompaniesArgs = {
  input: DeleteManyCompaniesInput;
};


export type MutationDeleteManyInvoiceItemsArgs = {
  input: DeleteManyInvoiceItemsInput;
};


export type MutationDeleteManyInvoicesArgs = {
  input: DeleteManyInvoicesInput;
};


export type MutationDeleteOneCompanyArgs = {
  input: DeleteOneCompanyInput;
};


export type MutationDeleteOneInvoiceArgs = {
  input: DeleteOneInvoiceInput;
};


export type MutationDeleteOneInvoiceItemArgs = {
  input: DeleteOneInvoiceItemInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: CreateUser;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSetCompanyOnInvoiceArgs = {
  input: SetCompanyOnInvoiceInput;
};


export type MutationSetUserOnInvoiceArgs = {
  input: SetUserOnInvoiceInput;
};


export type MutationUpdateManyInvoiceItemsArgs = {
  input: UpdateManyInvoiceItemsInput;
};


export type MutationUpdateManyInvoicesArgs = {
  input: UpdateManyInvoicesInput;
};


export type MutationUpdateOneCompanyArgs = {
  input: UpdateOneCompanyInput;
};


export type MutationUpdateOneInvoiceArgs = {
  input: UpdateOneInvoiceInput;
};


export type MutationUpdateOneInvoiceItemArgs = {
  input: UpdateOneInvoiceItemInput;
};


export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Int'];
  upper: Scalars['Int'];
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']>;
};

export type PostalCodeAdaptedScalarFilterComparison = {
  eq?: InputMaybe<Scalars['PostalCode']>;
  gt?: InputMaybe<Scalars['PostalCode']>;
  gte?: InputMaybe<Scalars['PostalCode']>;
  iLike?: InputMaybe<Scalars['PostalCode']>;
  in?: InputMaybe<Array<Scalars['PostalCode']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['PostalCode']>;
  lt?: InputMaybe<Scalars['PostalCode']>;
  lte?: InputMaybe<Scalars['PostalCode']>;
  neq?: InputMaybe<Scalars['PostalCode']>;
  notILike?: InputMaybe<Scalars['PostalCode']>;
  notIn?: InputMaybe<Array<Scalars['PostalCode']>>;
  notLike?: InputMaybe<Scalars['PostalCode']>;
};

export type Query = {
  __typename?: 'Query';
  companies: CompanyConnection;
  company?: Maybe<Company>;
  companyAggregate: Array<CompanyAggregateResponse>;
  dataCode?: Maybe<DataCode>;
  invoice?: Maybe<Invoice>;
  invoices: InvoiceConnection;
  viewer?: Maybe<User>;
};


export type QueryCompaniesArgs = {
  filter?: InputMaybe<CompanyFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<CompanySort>>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryCompanyAggregateArgs = {
  filter?: InputMaybe<CompanyAggregateFilter>;
};


export type QueryDataCodeArgs = {
  id: Scalars['ID'];
};


export type QueryInvoiceArgs = {
  id: Scalars['ID'];
};


export type QueryInvoicesArgs = {
  filter?: InputMaybe<InvoiceFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InvoiceSort>>;
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  password: Scalars['Password'];
};

export type SetCompanyOnInvoiceInput = {
  /** The id of the record. */
  id: Scalars['ID'];
  /** The id of relation. */
  relationId: Scalars['ID'];
};

export type SetUserOnInvoiceInput = {
  /** The id of the record. */
  id: Scalars['ID'];
  /** The id of relation. */
  relationId: Scalars['ID'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  notILike?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  notLike?: InputMaybe<Scalars['String']>;
};

export type UpdateCompany = {
  city?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  country: Scalars['CountryCode'];
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  taxName?: InputMaybe<Scalars['String']>;
  taxNumber: Scalars['String'];
  taxRate: Scalars['Int'];
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateInvoice = {
  dueDate?: InputMaybe<Scalars['String']>;
  invoiceDate?: InputMaybe<Scalars['String']>;
  paidDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<InvoiceStatusEnum>;
};

export type UpdateInvoiceItem = {
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  quantity: Scalars['Int'];
  unit?: InputMaybe<Scalars['String']>;
};

export type UpdateManyInvoiceItemsInput = {
  /** Filter used to find fields to update */
  filter: InvoiceItemUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateInvoiceItem;
};

export type UpdateManyInvoicesInput = {
  /** Filter used to find fields to update */
  filter: InvoiceUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateInvoice;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int'];
};

export type UpdateOneCompanyInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateCompany;
};

export type UpdateOneInvoiceInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateInvoice;
};

export type UpdateOneInvoiceItemInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateInvoiceItem;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateUser;
};

export type UpdateUser = {
  company?: InputMaybe<UpdateCompany>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  clients?: Maybe<UserClientsConnection>;
  company?: Maybe<UserCompany>;
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  invoiceItems?: Maybe<UserInvoiceItemsConnection>;
  invoices?: Maybe<UserInvoicesConnection>;
  lastName?: Maybe<Scalars['String']>;
  nextInvoiceNumber: Scalars['Int'];
  profileImage?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


export type UserClientsArgs = {
  filter?: InputMaybe<CompanyFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<CompanySort>>;
};


export type UserInvoiceItemsArgs = {
  filter?: InputMaybe<InvoiceItemFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InvoiceItemSort>>;
};


export type UserInvoicesArgs = {
  filter?: InputMaybe<InvoiceFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InvoiceSort>>;
};

export type UserAggregateGroupBy = {
  __typename?: 'UserAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
};

export type UserClientsConnection = {
  __typename?: 'UserClientsConnection';
  /** Array of nodes. */
  nodes: Array<Company>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type UserCompany = {
  __typename?: 'UserCompany';
  city?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  country: Scalars['CountryCode'];
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxNumber: Scalars['String'];
  taxRate: Scalars['Int'];
  website?: Maybe<Scalars['String']>;
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  id?: Maybe<Scalars['Int']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the User */
  node: User;
};

export type UserInvoiceItemsConnection = {
  __typename?: 'UserInvoiceItemsConnection';
  /** Array of nodes. */
  nodes: Array<InvoiceItem>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type UserInvoicesConnection = {
  __typename?: 'UserInvoicesConnection';
  /** Array of nodes. */
  nodes: Array<Invoice>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int'];
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  id?: Maybe<Scalars['ID']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  id?: Maybe<Scalars['ID']>;
};

export type ClientDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClientDetailsQuery = { __typename?: 'Query', company?: { __typename?: 'Company', id: string, name: string, taxRate: number, taxName?: string | null, taxNumber: string, state?: string | null, city?: string | null, country: string, streetAddress?: string | null, postalCode: string, website?: string | null, contactName: string, contactEmail: string } | null };

export type ClientsQueryVariables = Exact<{
  filter?: InputMaybe<CompanyFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<CompanySort> | CompanySort>;
}>;


export type ClientsQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', clients?: { __typename?: 'UserClientsConnection', totalCount: number, nodes: Array<{ __typename?: 'Company', id: string, name: string, taxRate: number, taxName?: string | null, state?: string | null, city?: string | null, country: string, invoicesAggregate: Array<{ __typename?: 'CompanyInvoicesAggregateResponse', count?: { __typename?: 'CompanyInvoicesCountAggregate', id?: number | null } | null }> }>, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null } } | null } | null };

export type CreateClientMutationVariables = Exact<{
  input: CreateOneCompanyInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createOneCompany: { __typename?: 'Company', id: string } };

export type DeleteClientMutationVariables = Exact<{
  input: DeleteOneCompanyInput;
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteOneCompany: { __typename?: 'CompanyDeleteResponse', id?: string | null } };

export type UpdateClientMutationVariables = Exact<{
  input: UpdateOneCompanyInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateOneCompany: { __typename?: 'Company', id: string } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type CreateInvoiceMutationVariables = Exact<{
  input: CreateOneInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createOneInvoice: { __typename?: 'Invoice', id: string } };

export type CreateInvoiceItemsMutationVariables = Exact<{
  input: CreateManyInvoiceItemsInput;
}>;


export type CreateInvoiceItemsMutation = { __typename?: 'Mutation', createManyInvoiceItems: Array<{ __typename?: 'InvoiceItem', id: string }> };

export type DeleteInvoiceMutationVariables = Exact<{
  input: DeleteOneInvoiceInput;
}>;


export type DeleteInvoiceMutation = { __typename?: 'Mutation', deleteOneInvoice: { __typename?: 'InvoiceDeleteResponse', id?: string | null } };

export type DeleteInvoiceItemsMutationVariables = Exact<{
  input: DeleteManyInvoiceItemsInput;
}>;


export type DeleteInvoiceItemsMutation = { __typename?: 'Mutation', deleteManyInvoiceItems: { __typename?: 'DeleteManyResponse', deletedCount: number } };

export type InvoiceDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type InvoiceDetailsQuery = { __typename?: 'Query', invoice?: { __typename?: 'Invoice', id: string, invoiceNumber: number, invoiceDate: string, dueDate?: string | null, paidDate?: string | null, status: InvoiceStatusEnum, company: { __typename?: 'Company', name: string, streetAddress?: string | null, city?: string | null, state?: string | null, country: string, postalCode: string, contactName: string, contactEmail: string }, items?: Array<{ __typename?: 'InvoiceItem', id: string, name: string, description?: string | null, discount?: number | null, price: number, quantity: number, unit?: string | null }> | null } | null };

export type InvoicesQueryVariables = Exact<{
  filter?: InputMaybe<InvoiceFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InvoiceSort> | InvoiceSort>;
}>;


export type InvoicesQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', invoices?: { __typename?: 'UserInvoicesConnection', totalCount: number, nodes: Array<{ __typename?: 'Invoice', id: string, invoiceNumber: number, invoiceDate: string, dueDate?: string | null, paidDate?: string | null, status: InvoiceStatusEnum, company: { __typename?: 'Company', name: string } }>, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null } } | null } | null };

export type SearchClientsQueryVariables = Exact<{
  filter?: InputMaybe<CompanyFilter>;
}>;


export type SearchClientsQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', clients?: { __typename?: 'UserClientsConnection', nodes: Array<{ __typename?: 'Company', id: string, name: string }> } | null } | null };

export type UpdateInvoiceMutationVariables = Exact<{
  input: UpdateOneInvoiceInput;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateOneInvoice: { __typename?: 'Invoice', id: string } };

export type UpdateInvoiceItemMutationVariables = Exact<{
  input: UpdateOneInvoiceItemInput;
}>;


export type UpdateInvoiceItemMutation = { __typename?: 'Mutation', updateOneInvoiceItem: { __typename?: 'InvoiceItem', id: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateOneUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateOneUser: { __typename?: 'User', id: string } };

export type RegisterMutationVariables = Exact<{
  input: CreateUser;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', accessToken: string } };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, profileImage?: string | null, company?: { __typename?: 'UserCompany', name: string, taxName?: string | null, taxRate: number, taxNumber: string, streetAddress?: string | null, city?: string | null, state?: string | null, country: string, postalCode: string, website?: string | null, contactName: string, contactEmail: string } | null } | null };


export const ClientDetailsDocument = `
    query clientDetails($id: ID!) {
  company(id: $id) {
    id
    name
    taxRate
    taxName
    taxNumber
    state
    city
    country
    streetAddress
    postalCode
    website
    contactName
    contactEmail
  }
}
    `;
export const useClientDetailsQuery = <
      TData = ClientDetailsQuery,
      TError = Error
    >(
      variables: ClientDetailsQueryVariables,
      options?: UseQueryOptions<ClientDetailsQuery, TError, TData>
    ) =>
    useQuery<ClientDetailsQuery, TError, TData>(
      ['clientDetails', variables],
      axiosFetcher<ClientDetailsQuery, ClientDetailsQueryVariables>(ClientDetailsDocument, variables),
      options
    );

useClientDetailsQuery.getKey = (variables: ClientDetailsQueryVariables) => ['clientDetails', variables];
;

export const useInfiniteClientDetailsQuery = <
      TData = ClientDetailsQuery,
      TError = Error
    >(
      variables: ClientDetailsQueryVariables,
      options?: UseInfiniteQueryOptions<ClientDetailsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ClientDetailsQuery, TError, TData>(
      ['clientDetails.infinite', variables],
      (metaData) => axiosFetcher<ClientDetailsQuery, ClientDetailsQueryVariables>(ClientDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteClientDetailsQuery.getKey = (variables: ClientDetailsQueryVariables) => ['clientDetails.infinite', variables];
;

export const ClientsDocument = `
    query clients($filter: CompanyFilter, $paging: OffsetPaging, $sorting: [CompanySort!]) {
  viewer {
    clients(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
        taxRate
        taxName
        state
        city
        country
        invoicesAggregate {
          count {
            id
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
}
    `;
export const useClientsQuery = <
      TData = ClientsQuery,
      TError = Error
    >(
      variables?: ClientsQueryVariables,
      options?: UseQueryOptions<ClientsQuery, TError, TData>
    ) =>
    useQuery<ClientsQuery, TError, TData>(
      variables === undefined ? ['clients'] : ['clients', variables],
      axiosFetcher<ClientsQuery, ClientsQueryVariables>(ClientsDocument, variables),
      options
    );

useClientsQuery.getKey = (variables?: ClientsQueryVariables) => variables === undefined ? ['clients'] : ['clients', variables];
;

export const useInfiniteClientsQuery = <
      TData = ClientsQuery,
      TError = Error
    >(
      variables?: ClientsQueryVariables,
      options?: UseInfiniteQueryOptions<ClientsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ClientsQuery, TError, TData>(
      variables === undefined ? ['clients.infinite'] : ['clients.infinite', variables],
      (metaData) => axiosFetcher<ClientsQuery, ClientsQueryVariables>(ClientsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteClientsQuery.getKey = (variables?: ClientsQueryVariables) => variables === undefined ? ['clients.infinite'] : ['clients.infinite', variables];
;

export const CreateClientDocument = `
    mutation createClient($input: CreateOneCompanyInput!) {
  createOneCompany(input: $input) {
    id
  }
}
    `;
export const useCreateClientMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<CreateClientMutation, TError, CreateClientMutationVariables, TContext>) =>
    useMutation<CreateClientMutation, TError, CreateClientMutationVariables, TContext>(
      ['createClient'],
      (variables?: CreateClientMutationVariables) => axiosFetcher<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, variables)(),
      options
    );
useCreateClientMutation.getKey = () => ['createClient'];

export const DeleteClientDocument = `
    mutation deleteClient($input: DeleteOneCompanyInput!) {
  deleteOneCompany(input: $input) {
    id
  }
}
    `;
export const useDeleteClientMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteClientMutation, TError, DeleteClientMutationVariables, TContext>) =>
    useMutation<DeleteClientMutation, TError, DeleteClientMutationVariables, TContext>(
      ['deleteClient'],
      (variables?: DeleteClientMutationVariables) => axiosFetcher<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, variables)(),
      options
    );
useDeleteClientMutation.getKey = () => ['deleteClient'];

export const UpdateClientDocument = `
    mutation updateClient($input: UpdateOneCompanyInput!) {
  updateOneCompany(input: $input) {
    id
  }
}
    `;
export const useUpdateClientMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateClientMutation, TError, UpdateClientMutationVariables, TContext>) =>
    useMutation<UpdateClientMutation, TError, UpdateClientMutationVariables, TContext>(
      ['updateClient'],
      (variables?: UpdateClientMutationVariables) => axiosFetcher<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, variables)(),
      options
    );
useUpdateClientMutation.getKey = () => ['updateClient'];

export const ForgotPasswordDocument = `
    mutation forgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input)
}
    `;
export const useForgotPasswordMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>) =>
    useMutation<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>(
      ['forgotPassword'],
      (variables?: ForgotPasswordMutationVariables) => axiosFetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, variables)(),
      options
    );
useForgotPasswordMutation.getKey = () => ['forgotPassword'];

export const CreateInvoiceDocument = `
    mutation createInvoice($input: CreateOneInvoiceInput!) {
  createOneInvoice(input: $input) {
    id
  }
}
    `;
export const useCreateInvoiceMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<CreateInvoiceMutation, TError, CreateInvoiceMutationVariables, TContext>) =>
    useMutation<CreateInvoiceMutation, TError, CreateInvoiceMutationVariables, TContext>(
      ['createInvoice'],
      (variables?: CreateInvoiceMutationVariables) => axiosFetcher<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CreateInvoiceDocument, variables)(),
      options
    );
useCreateInvoiceMutation.getKey = () => ['createInvoice'];

export const CreateInvoiceItemsDocument = `
    mutation createInvoiceItems($input: CreateManyInvoiceItemsInput!) {
  createManyInvoiceItems(input: $input) {
    id
  }
}
    `;
export const useCreateInvoiceItemsMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<CreateInvoiceItemsMutation, TError, CreateInvoiceItemsMutationVariables, TContext>) =>
    useMutation<CreateInvoiceItemsMutation, TError, CreateInvoiceItemsMutationVariables, TContext>(
      ['createInvoiceItems'],
      (variables?: CreateInvoiceItemsMutationVariables) => axiosFetcher<CreateInvoiceItemsMutation, CreateInvoiceItemsMutationVariables>(CreateInvoiceItemsDocument, variables)(),
      options
    );
useCreateInvoiceItemsMutation.getKey = () => ['createInvoiceItems'];

export const DeleteInvoiceDocument = `
    mutation deleteInvoice($input: DeleteOneInvoiceInput!) {
  deleteOneInvoice(input: $input) {
    id
  }
}
    `;
export const useDeleteInvoiceMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteInvoiceMutation, TError, DeleteInvoiceMutationVariables, TContext>) =>
    useMutation<DeleteInvoiceMutation, TError, DeleteInvoiceMutationVariables, TContext>(
      ['deleteInvoice'],
      (variables?: DeleteInvoiceMutationVariables) => axiosFetcher<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(DeleteInvoiceDocument, variables)(),
      options
    );
useDeleteInvoiceMutation.getKey = () => ['deleteInvoice'];

export const DeleteInvoiceItemsDocument = `
    mutation deleteInvoiceItems($input: DeleteManyInvoiceItemsInput!) {
  deleteManyInvoiceItems(input: $input) {
    deletedCount
  }
}
    `;
export const useDeleteInvoiceItemsMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteInvoiceItemsMutation, TError, DeleteInvoiceItemsMutationVariables, TContext>) =>
    useMutation<DeleteInvoiceItemsMutation, TError, DeleteInvoiceItemsMutationVariables, TContext>(
      ['deleteInvoiceItems'],
      (variables?: DeleteInvoiceItemsMutationVariables) => axiosFetcher<DeleteInvoiceItemsMutation, DeleteInvoiceItemsMutationVariables>(DeleteInvoiceItemsDocument, variables)(),
      options
    );
useDeleteInvoiceItemsMutation.getKey = () => ['deleteInvoiceItems'];

export const InvoiceDetailsDocument = `
    query invoiceDetails($id: ID!) {
  invoice(id: $id) {
    id
    invoiceNumber
    invoiceDate
    dueDate
    paidDate
    status
    company {
      name
      streetAddress
      city
      state
      country
      postalCode
      contactName
      contactEmail
    }
    items {
      id
      name
      description
      discount
      price
      quantity
      unit
    }
  }
}
    `;
export const useInvoiceDetailsQuery = <
      TData = InvoiceDetailsQuery,
      TError = Error
    >(
      variables: InvoiceDetailsQueryVariables,
      options?: UseQueryOptions<InvoiceDetailsQuery, TError, TData>
    ) =>
    useQuery<InvoiceDetailsQuery, TError, TData>(
      ['invoiceDetails', variables],
      axiosFetcher<InvoiceDetailsQuery, InvoiceDetailsQueryVariables>(InvoiceDetailsDocument, variables),
      options
    );

useInvoiceDetailsQuery.getKey = (variables: InvoiceDetailsQueryVariables) => ['invoiceDetails', variables];
;

export const useInfiniteInvoiceDetailsQuery = <
      TData = InvoiceDetailsQuery,
      TError = Error
    >(
      variables: InvoiceDetailsQueryVariables,
      options?: UseInfiniteQueryOptions<InvoiceDetailsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<InvoiceDetailsQuery, TError, TData>(
      ['invoiceDetails.infinite', variables],
      (metaData) => axiosFetcher<InvoiceDetailsQuery, InvoiceDetailsQueryVariables>(InvoiceDetailsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteInvoiceDetailsQuery.getKey = (variables: InvoiceDetailsQueryVariables) => ['invoiceDetails.infinite', variables];
;

export const InvoicesDocument = `
    query invoices($filter: InvoiceFilter, $paging: OffsetPaging, $sorting: [InvoiceSort!]) {
  viewer {
    invoices(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        invoiceNumber
        invoiceDate
        dueDate
        paidDate
        status
        company {
          name
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
}
    `;
export const useInvoicesQuery = <
      TData = InvoicesQuery,
      TError = Error
    >(
      variables?: InvoicesQueryVariables,
      options?: UseQueryOptions<InvoicesQuery, TError, TData>
    ) =>
    useQuery<InvoicesQuery, TError, TData>(
      variables === undefined ? ['invoices'] : ['invoices', variables],
      axiosFetcher<InvoicesQuery, InvoicesQueryVariables>(InvoicesDocument, variables),
      options
    );

useInvoicesQuery.getKey = (variables?: InvoicesQueryVariables) => variables === undefined ? ['invoices'] : ['invoices', variables];
;

export const useInfiniteInvoicesQuery = <
      TData = InvoicesQuery,
      TError = Error
    >(
      variables?: InvoicesQueryVariables,
      options?: UseInfiniteQueryOptions<InvoicesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<InvoicesQuery, TError, TData>(
      variables === undefined ? ['invoices.infinite'] : ['invoices.infinite', variables],
      (metaData) => axiosFetcher<InvoicesQuery, InvoicesQueryVariables>(InvoicesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteInvoicesQuery.getKey = (variables?: InvoicesQueryVariables) => variables === undefined ? ['invoices.infinite'] : ['invoices.infinite', variables];
;

export const SearchClientsDocument = `
    query searchClients($filter: CompanyFilter) {
  viewer {
    clients(filter: $filter, sorting: {direction: ASC, field: name}) {
      nodes {
        id
        name
      }
    }
  }
}
    `;
export const useSearchClientsQuery = <
      TData = SearchClientsQuery,
      TError = Error
    >(
      variables?: SearchClientsQueryVariables,
      options?: UseQueryOptions<SearchClientsQuery, TError, TData>
    ) =>
    useQuery<SearchClientsQuery, TError, TData>(
      variables === undefined ? ['searchClients'] : ['searchClients', variables],
      axiosFetcher<SearchClientsQuery, SearchClientsQueryVariables>(SearchClientsDocument, variables),
      options
    );

useSearchClientsQuery.getKey = (variables?: SearchClientsQueryVariables) => variables === undefined ? ['searchClients'] : ['searchClients', variables];
;

export const useInfiniteSearchClientsQuery = <
      TData = SearchClientsQuery,
      TError = Error
    >(
      variables?: SearchClientsQueryVariables,
      options?: UseInfiniteQueryOptions<SearchClientsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<SearchClientsQuery, TError, TData>(
      variables === undefined ? ['searchClients.infinite'] : ['searchClients.infinite', variables],
      (metaData) => axiosFetcher<SearchClientsQuery, SearchClientsQueryVariables>(SearchClientsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteSearchClientsQuery.getKey = (variables?: SearchClientsQueryVariables) => variables === undefined ? ['searchClients.infinite'] : ['searchClients.infinite', variables];
;

export const UpdateInvoiceDocument = `
    mutation updateInvoice($input: UpdateOneInvoiceInput!) {
  updateOneInvoice(input: $input) {
    id
  }
}
    `;
export const useUpdateInvoiceMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateInvoiceMutation, TError, UpdateInvoiceMutationVariables, TContext>) =>
    useMutation<UpdateInvoiceMutation, TError, UpdateInvoiceMutationVariables, TContext>(
      ['updateInvoice'],
      (variables?: UpdateInvoiceMutationVariables) => axiosFetcher<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(UpdateInvoiceDocument, variables)(),
      options
    );
useUpdateInvoiceMutation.getKey = () => ['updateInvoice'];

export const UpdateInvoiceItemDocument = `
    mutation updateInvoiceItem($input: UpdateOneInvoiceItemInput!) {
  updateOneInvoiceItem(input: $input) {
    id
  }
}
    `;
export const useUpdateInvoiceItemMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateInvoiceItemMutation, TError, UpdateInvoiceItemMutationVariables, TContext>) =>
    useMutation<UpdateInvoiceItemMutation, TError, UpdateInvoiceItemMutationVariables, TContext>(
      ['updateInvoiceItem'],
      (variables?: UpdateInvoiceItemMutationVariables) => axiosFetcher<UpdateInvoiceItemMutation, UpdateInvoiceItemMutationVariables>(UpdateInvoiceItemDocument, variables)(),
      options
    );
useUpdateInvoiceItemMutation.getKey = () => ['updateInvoiceItem'];

export const LoginDocument = `
    mutation login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;
export const useLoginMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => axiosFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
useLoginMutation.getKey = () => ['login'];

export const UpdateUserDocument = `
    mutation updateUser($input: UpdateOneUserInput!) {
  updateOneUser(input: $input) {
    id
  }
}
    `;
export const useUpdateUserMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['updateUser'],
      (variables?: UpdateUserMutationVariables) => axiosFetcher<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
      options
    );
useUpdateUserMutation.getKey = () => ['updateUser'];

export const RegisterDocument = `
    mutation register($input: CreateUser!) {
  register(input: $input) {
    accessToken
  }
}
    `;
export const useRegisterMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['register'],
      (variables?: RegisterMutationVariables) => axiosFetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
      options
    );
useRegisterMutation.getKey = () => ['register'];

export const ViewerDocument = `
    query viewer {
  viewer {
    id
    firstName
    lastName
    email
    profileImage
    company {
      name
      taxName
      taxRate
      taxNumber
      streetAddress
      city
      state
      country
      postalCode
      website
      contactName
      contactEmail
    }
  }
}
    `;
export const useViewerQuery = <
      TData = ViewerQuery,
      TError = Error
    >(
      variables?: ViewerQueryVariables,
      options?: UseQueryOptions<ViewerQuery, TError, TData>
    ) =>
    useQuery<ViewerQuery, TError, TData>(
      variables === undefined ? ['viewer'] : ['viewer', variables],
      axiosFetcher<ViewerQuery, ViewerQueryVariables>(ViewerDocument, variables),
      options
    );

useViewerQuery.getKey = (variables?: ViewerQueryVariables) => variables === undefined ? ['viewer'] : ['viewer', variables];
;

export const useInfiniteViewerQuery = <
      TData = ViewerQuery,
      TError = Error
    >(
      variables?: ViewerQueryVariables,
      options?: UseInfiniteQueryOptions<ViewerQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ViewerQuery, TError, TData>(
      variables === undefined ? ['viewer.infinite'] : ['viewer.infinite', variables],
      (metaData) => axiosFetcher<ViewerQuery, ViewerQueryVariables>(ViewerDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteViewerQuery.getKey = (variables?: ViewerQueryVariables) => variables === undefined ? ['viewer.infinite'] : ['viewer.infinite', variables];
;
