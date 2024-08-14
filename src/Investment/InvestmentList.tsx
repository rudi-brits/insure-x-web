import { List, Datagrid, TextField } from 'react-admin';
import { SearchInput } from '../Search/SearchInput';

export const InvestmentList = () => { 
    return (
        <List filters={SearchInput}>
            <Datagrid 
                rowClick="show"
                bulkActionButtons={false}>
                <TextField source="firstname" />
                <TextField source="surname" />
                <TextField source="lumpSum" />
                <TextField source="startDate" />
                <TextField source="annualInterestRate" />
                <TextField source="interestType" />
                <TextField source="forecastedAmount" />                
            </Datagrid>
        </List>
    );
};