import { List, Datagrid, TextField } from 'react-admin';

export const ClientShow = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="Id" />
                <TextField source="Firstname" />
                <TextField source="Surname" />
                <TextField source="IdNumber" />
            </Datagrid>
        </List>
    );
};