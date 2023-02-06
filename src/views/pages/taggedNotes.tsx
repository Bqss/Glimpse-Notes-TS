import { MainLayout } from "../layout";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/loadingIndicator";
import {PulseLoader} from "react-spinners";
import { useGetNoteQuery } from "../../api/noteApi";
import {getTaggedNote} from "../../util/util";
import { Note } from "../components";
import { useParams } from "react-router-dom";


export default () => {
  const {tagname} = useParams();
  const {data : notes = [], isLoading, error}  =  useGetNoteQuery();
  const  taggedNote = getTaggedNote(notes,tagname);


  return (
    <MainLayout>
      <div className="px-4">
        <div className="mt-5">
          <LoadingIndicator isLoading={isLoading}>
            <PulseLoader color="#1D4ED8" size={8}/>
          </LoadingIndicator>
          <div className=" grid gap-4 mt-6 auto-fit overflow-auto">
            { taggedNote.map((e, i) =>  <Note note={e} key={i} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
