import { useEffect, useState } from 'react';
import { TextField, SimpleShowLayout, DateInput, SimpleForm, useDataProvider } from 'react-admin';
import { useParams } from 'react-router-dom';
import { getMinForecastDateFormatted, minDateValidator } from '../../grid/utilities/dateUtilities';
import { Box } from '@mui/material';
import { ResourceNames } from '../../constants/insure.web.x.constants';

const EmptyToolbar = () => '';
const investmentShowForecastDateStorageKey = 'investmentShowForecastDate';

export const InvestmentShow = () => { 
    const formattedMinForecastDate = getMinForecastDateFormatted();
    const invalidDateMessage = `Date must be at least ${formattedMinForecastDate}`;
    const emptyData = { id: 0 };    
    let forecastDateFromStorage = sessionStorage.getItem(investmentShowForecastDateStorageKey) ?? '';  

    if (!minDateValidator(forecastDateFromStorage)) 
        forecastDateFromStorage = formattedMinForecastDate;

    const { id } = useParams();
    const [data, setData] = useState(emptyData);
    const [selectedForecastDate, setSelectedForecastDate] = useState(forecastDateFromStorage);
    const [isForecastDateValid, setIsForecastDateValid] = useState(false);
    const dataProvider = useDataProvider();

    useEffect(() => {        
        fetchData(forecastDateFromStorage);
    }, []);

    const fetchData = async (forecastDateValue: string) => {        
        if (!validateForecastDate(forecastDateValue))
            return;

        try {
            const url = `${ResourceNames.investments}/${id}/forecasts?ForecastDate=${forecastDateValue}`;
            const response = await dataProvider.getOneByUrl(url);
            setData(response.data);
        } catch (error) {
            setData(emptyData);
            console.error('Error fetching data:', error);
        } 
    };

    const validateForecastDate = (forecastDate: string) => {
        const isValid = minDateValidator(forecastDate);
        if (isValid)
            setForecastDate(forecastDate);

        setIsForecastDateValid(isValid);
        return isValid;
    };

    const setForecastDate = (forecastDate: string) => {
        setSelectedForecastDate(forecastDate); 
        sessionStorage.setItem(investmentShowForecastDateStorageKey, forecastDate);
    }

    const handleForecastDateChange = (e: any) => {
        const forecastDate = e.target.value; 
        fetchData(forecastDate); 
    };      

    return (
        <Box sx={{ backgroundColor: '#1E1E1E', marginTop: 2,  borderRadius: 2 }}>
            <SimpleForm toolbar={<EmptyToolbar />}>
                {data?.id > 0 ? (
                    <>
                        <DateInput 
                            label="Forecast Date"
                            source="forecastDate"
                            defaultValue={selectedForecastDate || ''}
                            onInput={handleForecastDateChange}
                            parse={(date: Date) => (date ? date.toISOString() : null)}
                            sx={{ width: 'auto' }}
                            error={!isForecastDateValid}
                            helperText={!isForecastDateValid && invalidDateMessage}
                            FormHelperTextProps={{ error: true }}
                        />
                        <SimpleShowLayout record={data}>
                            <TextField source="firstname" />
                            <TextField source="surname" />
                            <TextField source="lumpSum" />
                            <TextField source="startDate" />
                            <TextField source="annualInterestRate" />
                            <TextField source="interestType" />
                            <TextField source="forecastedAmount" />
                        </SimpleShowLayout>
                    </>
                ) : (
                    <p>No data available</p>
                )}
            </SimpleForm>
        </Box>
    );
};