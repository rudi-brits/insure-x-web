import { DateInput, minValue, TextInput } from 'react-admin';
import { getMinForecastDate } from '../utilities/dateUtilities';
import { ISearchFilterInputProps } from '../models/searchFilterInputProps';

export const SearchFilterInput = (props: ISearchFilterInputProps) => {
    const filters = [];
    if (props?.showSearchText)
        filters.push(
            <TextInput label="Search" source="searchText" alwaysOn key="searchInput" />
        );

    if (props?.showForecastDate) {
        filters.push(
            <DateInput 
                label="Forecast Date" 
                source="forecastDate" 
                key="forecastDate" 
                validate={minValue(getMinForecastDate())} 
                parse={(date: Date) => (date ? date.toISOString() : null)}
            />
        );
    }
    return filters;
}

