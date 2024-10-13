import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ username, email, password }) => ({
                url: '/register',
                method: 'POST', 
                body: { username, email, password },
            }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;
