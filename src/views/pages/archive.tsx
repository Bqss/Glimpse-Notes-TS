import { MainLayout } from "../layout";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loadingIndicator";
import {PulseLoader} from "react-spinners";
import { useGetNoteQuery } from "../../api/noteApi";
import {getArchivedNotes} from "../../util/util";
import { Note } from "../components";


export default () => {
  const {data : notes = [], isLoading, error}  =  useGetNoteQuery();
  const archivedNote  = getArchivedNotes(notes);

  return (
    <MainLayout>
      <div className="px-4">
        <div className="mt-5">
          <span className="text-xl font-bold ">Archived Notes ({archivedNote.length})</span>
          <LoadingIndicator isLoading={isLoading}>
            <PulseLoader color="#1D4ED8" size={8}/>
          </LoadingIndicator>
          <div className=" grid gap-4 mt-6 auto-fit overflow-auto">
            {!isLoading &&
              archivedNote.map((e, i) =>  <Note note={e} type="archive" key={i} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

