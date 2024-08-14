import { TextField, SimpleShowLayout, Show } from 'react-admin';

export const InvestmentShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="firstname" />
                <TextField source="surname" />
                <TextField source="lumpSum" />
                <TextField source="startDate" />
                <TextField source="annualInterestRate" />
                <TextField source="interestType" />
                <TextField source="forecastedAmount" />  
            </SimpleShowLayout>
        </Show>
    );
};