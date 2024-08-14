import { List, Datagrid, TextField } from 'react-admin';
import { SearchFilterInput } from '../../grid/components/searchFilterInput';
import { IInvestmentListProps } from '../models/investmentListProps';
import React from 'react';

export const InvestmentList: React.FC<IInvestmentListProps> = ({ clientId }) => {
    const isClientView = clientId != null;
    return (
        <List 
            filters={SearchFilterInput({ showSearchText: !isClientView, showForecastDate: true })}
            filter={{ clientId }}
        >
            <Datagrid 
                rowClick={isClientView ? "" : "show"}
                bulkActionButtons={false}>
                {!isClientView && <TextField source="firstname" />}
                {!isClientView && <TextField source="surname" />}                
                <TextField source="startDate" />
                <TextField source="lumpSum" />
                <TextField source="annualInterestRate" />
                {isClientView && <TextField source="forecastedAmount" />}  
                <TextField source="interestType" />                             
            </Datagrid>
        </List>
    );
};