import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 } from "uuid";
import { NotePayload } from "../types/payload";

type NoteResponse = Note[];

const noteApi = createApi({
  reducerPath: "noteapi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Notes"],
  endpoints: (build) => ({
    getNote : build.query<NoteResponse, void>({
      query: () => "note",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Notes" as const, id })),
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
    }),
    saveNote : build.mutation<void, NotePayload>({
      query: (body) => {
          const note  = {
            id: v4(),
            createdAt : new Date().toUTCString(),
            updatedAt : new Date().toUTCString(),
            ...body
          }

          return {
            url: "note",
            method : "POST",
            body : note
          }
      },
      invalidatesTags : ["Notes"]
    }),
    deleteNote : build.mutation<void ,Note>({
      query : ({id}) => ({
        url : `note/${id}`,
        method : "DELETE"
      }),
      invalidatesTags : ["Notes"]
    }), 

    softDeleteNote : build.mutation<void, Note>({
      query : ({id, isSoftDelete, ...a}) => ({
        url : `note/${id}`,
        method : "PUT",
        body: {
          id,
          isSoftDelete : !isSoftDelete,
          ...a
        }
      }),
      invalidatesTags : ["Notes"]
    }),

    pinNote : build.mutation<void, Note>({
      query: ({id, isPinned, ...a}) => ({
        url : `note/${id}`,
        method : "PUT",
        body : {
          id, 
          isPinned : !isPinned,
          ...a
        }
      }),
      invalidatesTags : (result, error , {id}) => ([{type : "Notes", id }])
    }),

    archiveNote : build.mutation<void, Note>({
      query : ({id, isArchived, ...a }) => ({
        url: `note/${id}`,
        method: "PUT",
        body : {
          id,
          isArchived : !isArchived,
          ...a
        }
      }),
      invalidatesTags : (result, error, {id}) => ([{type : "Notes", id}])
    }),

    updateNote : build.mutation<void, Note>({
      query : ({id, updatedAt, ...a}) => ({
        url : `note/${id}`,
        method : "PUT",
        body: {
          id,
          updatedAt : new Date().toUTCString(),
          ...a
        }
      }),
      invalidatesTags : (result, error, {id}) => ([{type: "Notes", id}])
    }),
  }),
});


export default noteApi;
export const {useGetNoteQuery, useSaveNoteMutation, useArchiveNoteMutation, useDeleteNoteMutation, useSoftDeleteNoteMutation, useUpdateNoteMutation, usePinNoteMutation } = noteApi;
