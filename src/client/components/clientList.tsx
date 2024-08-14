import { List, Datagrid, TextField } from 'react-admin';
import { SearchFilterInput } from '../../grid/components/searchFilterInput';

export const ClientList = () => { 
    return (
        <List filters={SearchFilterInput}>
            <Datagrid 
                rowClick="show"
                bulkActionButtons={false}>
                <TextField source="firstname" />
                <TextField source="surname" />
                <TextField source="idNumber" />
            </Datagrid>
        </List>
    );
};