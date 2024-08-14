import { TextField, SimpleShowLayout, Show, useShowController } from 'react-admin';
import { InvestmentList } from '../../investment/components/investmentList';

export const ClientShow = (props: any) => {
    const { record } = useShowController(props);
    
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="firstname" />
                <TextField source="surname" />
                <TextField source="idNumber" />
                {record && <InvestmentList clientId={record.id} />}
            </SimpleShowLayout>
        </Show>
    );
};