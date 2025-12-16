import { CompanyDetails } from "../types";

// In-memory cache store
const companyCache: Record<string, CompanyDetails> = {};

export const getCachedCompanyDetails = (companyName: string): CompanyDetails | undefined => {
  return companyCache[companyName];
};

export const setCachedCompanyDetails = (companyName: string, details: CompanyDetails): void => {
  companyCache[companyName] = details;
};

export const hasCachedDetails = (companyName: string): boolean => {
  return !!companyCache[companyName];
};