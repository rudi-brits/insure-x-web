import { DataProvider, fetchUtils, GetListParams, GetOneParams, QueryFunctionContext } from "react-admin";
import { stringify } from "query-string";

const apiUrl = 'https://localhost:7229/api';
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
  getList: (resource: string, params: GetListParams & QueryFunctionContext) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      filter: params.filter?.q,
      sortField: field,
      sortOrder: order,
      pageNumber: page,
      pageSize: perPage
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

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

