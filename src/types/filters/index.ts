export interface CountryData {
  id: string;
  name: string;
  selected: boolean;
}

export interface FilterActivator {
  name: () => void;
  temperature: () => void;
  country: () => void;
  tempRange: () => void;
}

export interface AppliedFilters {
  filterBy: 'name' | 'temperature' | 'country' | 'tempRange';
  payload: TempRange | string[] | null;
}

export interface TempRange {
  from: string;
  to: string;
}

export interface FiltersRef extends HTMLInputElement {
  reFilter: () => void;
}
