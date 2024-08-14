import { useEffect, useState } from 'react';
import { TextField, SimpleShowLayout, Show, DateInput, minValue, SimpleForm, useDataProvider, Toolbar } from 'react-admin';
import { useParams } from 'react-router-dom';
import { getMinForecastDate, minDateValidator } from '../../grid/utilities/dateUtilities';
import { Box } from '@mui/material';

export const InvestmentShow = () => {
    let storedDate = localStorage.getItem('selectedDate') ?? getMinForecastDate();

    const { id } = useParams();
    const [data, setData] = useState({ id: 0 });
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>(storedDate);
    const dataProvider = useDataProvider();

    useEffect(() => {
        if (storedDate) {
            fetchData(storedDate);
        }
    }, []);

    const fetchData = async (date: string) => {
        setLoading(true);
        try {
            const response = await dataProvider.create('investments', {
                data: {
                    id,
                    forecastDate: date,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData({
                id: 50,
                clientId: 11,
                lumpSum: "34 000.00",
                startDate: "2016-08-18",
                annualInterestRate: " 6.30",
                forecastedAmount: " 0.00",
                interestType: "Compounded Annually",
                firstname: "Daniel",
                surname: "Rodriguez"
            })
        } finally {
            setLoading(false);
        }
    };

    let isValid = true;

    const handleDateChange = (e) => {
        const newDate = e.target.value; 
        isValid = minDateValidator(newDate); 
        if (!isValid)
            return;
        debugger;
        setSelectedDate(newDate); 
        localStorage.setItem('selectedDate', newDate);
        fetchData(newDate); 
    };  

    console.log(data);

    const EmptyToolbar = () => '';

    return (
        <Box sx={{ backgroundColor: '#1E1E1E', marginTop: 2,  borderRadius: 2 }}>
            <SimpleForm toolbar={<EmptyToolbar />}>
                <DateInput 
                    label="Forecast Date" 
                    source="forecastDate" 
                    defaultValue={selectedDate || ''}               
                    onChange={handleDateChange}
                    parse={(date: Date) => (date ? date.toISOString() : null)}
                    sx={{ width: 'auto' }}
                    helperText={`Select a date >= ${getMinForecastDate()}`}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <SimpleShowLayout record={data}>
                        <TextField source="firstname" />
                        <TextField source="surname" />
                        <TextField source="lumpSum" />
                        <TextField source="startDate" />
                        <TextField source="annualInterestRate" />
                        <TextField source="interestType" />
                        <TextField source="forecastedAmount" />
                    </SimpleShowLayout>
                ) : (
                    <p>No data available</p>
                )}
            </SimpleForm>
        </Box>
    );
};