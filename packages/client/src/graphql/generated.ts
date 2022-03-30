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
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: string;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: string;
};

export type Company = {
  __typename?: 'Company';
  city?: Maybe<Scalars['String']>;
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
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyAggregateFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
};

export type CompanyAggregateGroupBy = {
  __typename?: 'CompanyAggregateGroupBy';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
};

export type CompanyAggregateResponse = {
  __typename?: 'CompanyAggregateResponse';
  count?: Maybe<CompanyCountAggregate>;
  groupBy?: Maybe<CompanyAggregateGroupBy>;
  max?: Maybe<CompanyMaxAggregate>;
  min?: Maybe<CompanyMinAggregate>;
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
  country?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  postalCode?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['Int']>;
};

export type CompanyDeleteFilter = {
  and?: InputMaybe<Array<CompanyDeleteFilter>>;
  city?: InputMaybe<StringFieldComparison>;
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyDeleteFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
};

export type CompanyDeleteResponse = {
  __typename?: 'CompanyDeleteResponse';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoices?: Maybe<Array<Invoice>>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
  taxRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyFilter = {
  and?: InputMaybe<Array<CompanyFilter>>;
  city?: InputMaybe<StringFieldComparison>;
  country?: InputMaybe<CountryCodeAdaptedScalarFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<CompanyFilter>>;
  postalCode?: InputMaybe<PostalCodeAdaptedScalarFilterComparison>;
  state?: InputMaybe<StringFieldComparison>;
};

export type CompanyInvoicesAggregateGroupBy = {
  __typename?: 'CompanyInvoicesAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatusEnum>;
};

export type CompanyInvoicesAggregateResponse = {
  __typename?: 'CompanyInvoicesAggregateResponse';
  count?: Maybe<CompanyInvoicesCountAggregate>;
  groupBy?: Maybe<CompanyInvoicesAggregateGroupBy>;
  max?: Maybe<CompanyInvoicesMaxAggregate>;
  min?: Maybe<CompanyInvoicesMinAggregate>;
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
  id?: Maybe<Scalars['Int']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
};

export type CompanyInvoicesMaxAggregate = {
  __typename?: 'CompanyInvoicesMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatusEnum>;
};

export type CompanyInvoicesMinAggregate = {
  __typename?: 'CompanyInvoicesMinAggregate';
  id?: Maybe<Scalars['ID']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatusEnum>;
};

export type CompanyMaxAggregate = {
  __typename?: 'CompanyMaxAggregate';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
};

export type CompanyMinAggregate = {
  __typename?: 'CompanyMinAggregate';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['PostalCode']>;
  state?: Maybe<Scalars['String']>;
};

export type CompanySort = {
  direction: SortDirection;
  field: CompanySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CompanySortFields {
  City = 'city',
  Country = 'country',
  Id = 'id',
  Name = 'name',
  PostalCode = 'postalCode',
  State = 'state'
}

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
  country: Scalars['CountryCode'];
  currency?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  taxName?: InputMaybe<Scalars['String']>;
  taxRate: Scalars['Int'];
  website?: InputMaybe<Scalars['String']>;
};

export type CreateInvoice = {
  companyId: Scalars['String'];
  dueDate?: InputMaybe<Scalars['DateTime']>;
  invoiceDate?: InputMaybe<Scalars['DateTime']>;
  invoiceNumber: Scalars['String'];
  paidDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<InvoiceStatusEnum>;
};

export type CreateInvoiceItem = {
  description?: InputMaybe<Scalars['String']>;
  discount?: InputMaybe<Scalars['Int']>;
  invoiceId: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  quantity: Scalars['Int'];
  unit?: InputMaybe<Scalars['String']>;
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
  phone?: InputMaybe<Scalars['PhoneNumber']>;
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
  invoiceNumber: Scalars['String'];
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
  id?: InputMaybe<IdFilterComparison>;
  invoiceNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceAggregateFilter>>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
};

export type InvoiceAggregateGroupBy = {
  __typename?: 'InvoiceAggregateGroupBy';
  id?: Maybe<Scalars['ID']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatusEnum>;
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
  id?: Maybe<Scalars['Int']>;
  invoiceNumber?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
};

export type InvoiceDeleteFilter = {
  and?: InputMaybe<Array<InvoiceDeleteFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceDeleteFilter>>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
};

export type InvoiceDeleteResponse = {
  __typename?: 'InvoiceDeleteResponse';
  company?: Maybe<Company>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  items?: Maybe<Array<InvoiceItem>>;
  paidDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<InvoiceStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type InvoiceFilter = {
  and?: InputMaybe<Array<InvoiceFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceFilter>>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
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
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceItemFilter>>;
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
  id?: Maybe<Scalars['ID']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatusEnum>;
};

export type InvoiceMinAggregate = {
  __typename?: 'InvoiceMinAggregate';
  id?: Maybe<Scalars['ID']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  status?: Maybe<InvoiceStatusEnum>;
};

export type InvoiceSort = {
  direction: SortDirection;
  field: InvoiceSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum InvoiceSortFields {
  Id = 'id',
  InvoiceNumber = 'invoiceNumber',
  Status = 'status'
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

export type InvoiceUpdateFilter = {
  and?: InputMaybe<Array<InvoiceUpdateFilter>>;
  id?: InputMaybe<IdFilterComparison>;
  invoiceNumber?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<InvoiceUpdateFilter>>;
  status?: InputMaybe<InvoiceStatusEnumFilterComparison>;
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
  country: Scalars['CountryCode'];
  currency?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  taxName?: InputMaybe<Scalars['String']>;
  taxRate: Scalars['Int'];
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateInvoice = {
  dueDate?: InputMaybe<Scalars['DateTime']>;
  invoiceDate?: InputMaybe<Scalars['DateTime']>;
  invoiceNumber: Scalars['String'];
  paidDate?: InputMaybe<Scalars['DateTime']>;
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
  phone?: InputMaybe<Scalars['PhoneNumber']>;
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
  phone?: Maybe<Scalars['PhoneNumber']>;
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
  country: Scalars['CountryCode'];
  name: Scalars['String'];
  postalCode: Scalars['PostalCode'];
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  taxName?: Maybe<Scalars['String']>;
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

export type ClientsQueryVariables = Exact<{
  filter?: InputMaybe<CompanyFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<CompanySort> | CompanySort>;
}>;


export type ClientsQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', clients?: { __typename?: 'UserClientsConnection', totalCount: number, nodes: Array<{ __typename?: 'Company', id: string, name: string, taxRate: number, taxName?: string | null, state?: string | null, city?: string | null, country: string }>, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null } } | null } | null };

export type CreateClientMutationVariables = Exact<{
  input: CreateOneCompanyInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createOneCompany: { __typename?: 'Company', id: string } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type CreateInvoiceMutationVariables = Exact<{
  input: CreateOneInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createOneInvoice: { __typename?: 'Invoice', id: string } };

export type InvoicesQueryVariables = Exact<{
  filter?: InputMaybe<InvoiceFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InvoiceSort> | InvoiceSort>;
}>;


export type InvoicesQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', invoices?: { __typename?: 'UserInvoicesConnection', totalCount: number, nodes: Array<{ __typename?: 'Invoice', id: string, invoiceNumber: string, invoiceDate: string, dueDate?: string | null, paidDate?: string | null, status: InvoiceStatusEnum, items?: Array<{ __typename?: 'InvoiceItem', id: string }> | null }>, pageInfo: { __typename?: 'OffsetPageInfo', hasNextPage?: boolean | null, hasPreviousPage?: boolean | null } } | null } | null };

export type InvoiceItemsFragment = { __typename?: 'Invoice', items?: Array<{ __typename?: 'InvoiceItem', id: string }> | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type OnboardingMutationVariables = Exact<{
  input: UpdateOneUserInput;
}>;


export type OnboardingMutation = { __typename?: 'Mutation', updateOneUser: { __typename?: 'User', id: string } };

export type RegisterMutationVariables = Exact<{
  input: CreateUser;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', accessToken: string } };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, profileImage?: string | null, company?: { __typename?: 'UserCompany', name: string, taxName?: string | null, taxRate: number, streetAddress?: string | null, city?: string | null, state?: string | null, country: string, postalCode: string, website?: string | null } | null } | null };

export const InvoiceItemsFragmentDoc = `
    fragment invoiceItems on Invoice {
  items {
    id
  }
}
    `;
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
        ...invoiceItems
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
}
    ${InvoiceItemsFragmentDoc}`;
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

export const OnboardingDocument = `
    mutation onboarding($input: UpdateOneUserInput!) {
  updateOneUser(input: $input) {
    id
  }
}
    `;
export const useOnboardingMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<OnboardingMutation, TError, OnboardingMutationVariables, TContext>) =>
    useMutation<OnboardingMutation, TError, OnboardingMutationVariables, TContext>(
      ['onboarding'],
      (variables?: OnboardingMutationVariables) => axiosFetcher<OnboardingMutation, OnboardingMutationVariables>(OnboardingDocument, variables)(),
      options
    );
useOnboardingMutation.getKey = () => ['onboarding'];

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
    profileImage
    company {
      name
      taxName
      taxRate
      streetAddress
      city
      state
      country
      postalCode
      website
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
