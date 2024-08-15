import { useEffect, useState } from 'react';
import { TextField, SimpleShowLayout, DateInput, SimpleForm, useDataProvider } from 'react-admin';
import { useParams } from 'react-router-dom';
import { getMinForecastDate, minDateValidator } from '../../grid/utilities/dateUtilities';
import { Box } from '@mui/material';
import { ResourceNames } from '../../constants/insure.web.x.constants';

const EmptyToolbar = () => '';
const investmentShowForecastDateStorageKey = 'investmentShowForecastDate';

export const InvestmentShow = () => {    
    let isForecastDateValid = false;

    const forecastDateFromStorage = localStorage.getItem(investmentShowForecastDateStorageKey) ?? getMinForecastDate();  
    const emptyData = { id: 0 };

    const { id } = useParams();
    const [data, setData] = useState(emptyData);
    const [selectedForecastDate, setSelectedForecastDate] = useState<string>(forecastDateFromStorage);
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
        isForecastDateValid = minDateValidator(forecastDate);
        if (isForecastDateValid)
            setForecastDate(forecastDate);

        return isForecastDateValid;
    };

    const setForecastDate = (forecastDate: string) => {
        setSelectedForecastDate(forecastDate); 
        localStorage.setItem(investmentShowForecastDateStorageKey, forecastDate);
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
                            error={isForecastDateValid}
                            helperText={isForecastDateValid && `Select a date >= ${getMinForecastDate()}`}
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