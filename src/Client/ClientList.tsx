import { List, Datagrid, TextField } from 'react-admin';
import { SearchInput } from '../Search/SearchInput';

export const ClientList = () => { 
    return (
        <List filters={SearchInput}>
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