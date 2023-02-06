import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {v4} from "uuid";
type tagResponse = Tag[];

export const tagApi = createApi({
  reducerPath: "tag",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Tag"],
  endpoints: (build) => ({
    getTag: build.query<tagResponse, void>({
      query: () => "tag",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tag" as const, id })),
              { type: "Tag", id: "LIST" }
            ]
          : [{ type: "Tag", id: "LIST" }],
    }),

    saveTag : build.mutation<void, string>({
      query : (value) => ({
        url: "tag",
        method: "POST",
        body: {
          id: v4(),
          value
        }
      }),
      invalidatesTags : ["Tag"]
    }),

    deleteTag : build.mutation<void, Tag>({
      query: ({id}) =>  ({
        url : `tag/${id}`,
        method: "DELETE",
      }),
      invalidatesTags : ["Tag"]
    })
  })
});

export const {useGetTagQuery, useDeleteTagMutation, useSaveTagMutation } = tagApi;
