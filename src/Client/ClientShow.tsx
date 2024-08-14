import { TextField, SimpleShowLayout, Show } from 'react-admin';

export const ClientShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="firstname" />
                <TextField source="surname" />
                <TextField source="idNumber" />
            </SimpleShowLayout>
        </Show>
    );
};