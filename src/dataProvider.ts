import { DataProvider, fetchUtils, GetListParams, GetOneParams, QueryFunctionContext } from "react-admin";
import { stringify } from "query-string";
import { ResourceNames } from "./constants/insure.web.x.constants";

const apiUrl = import.meta.env.VITE_INSURE_X_API_URL;
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
  getList: (resource: string, params: GetListParams & QueryFunctionContext) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filterParams = params.filter;

    const query = {
      filter: filterParams?.searchText,
      sortField: field,
      sortOrder: order,
      pageNumber: page,
      pageSize: perPage,
      forecastDate: undefined
    };

    let url;

    if (resource === ResourceNames.clients && filterParams?.clientId) {
      url = `${apiUrl}/${ResourceNames.investments}/${resource}/${filterParams.clientId}/${ResourceNames.investments}`;
      query.forecastDate = filterParams?.forecastDate;
    } else {
      url = `${apiUrl}/${resource}`;
    }

    url += `?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.totalRecords,
    }));
  },

  getOne: (resource: string, params: GetOneParams<any> & QueryFunctionContext) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getMany: () => Promise.reject(new Error('Not implemented')),
  getManyReference: () => Promise.reject(new Error('Not implemented')),
  create: () => Promise.reject(new Error('Not implemented')),
  update: () => Promise.reject(new Error('Not implemented')),
  delete: () => Promise.reject(new Error('Not implemented')),
  updateMany: () => Promise.reject(new Error('Not implemented')),
  deleteMany: () => Promise.reject(new Error('Not implemented')),
};

