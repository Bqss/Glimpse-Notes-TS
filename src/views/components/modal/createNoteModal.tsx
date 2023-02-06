import { Select } from "../";
import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNoteModal, toggleTagModal } from "../../../features/modalSlice";
import { reset, getAppState } from "../../../features/appSlice";
import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSaveNoteMutation, useUpdateNoteMutation } from "../../../api/noteApi";
import { ClipLoader } from "react-spinners";
import TagModal from "../../components/modal/tagModal";
import { useEffect } from "react";
import { Color, Priority } from "../../../types/payload";

const colors = [
  { id: 1, value: "#ffcccc" },
  { id: 2, value: "#ccffcc" },
  { id: 3, value: "#cce0ff" },
  { id: 4, value: "#ffffcc" },
];
const priorities = [
  { id: 1, value: "low" },
  { id: 2, value: "high" },
];

const CreateModal = () => {
  const modalRef = useRef(null);
  const { displayCreateNoteModal } = useSelector((state : any) => state.modal);
  const {isUpdate, note} = useSelector(getAppState);
  const [color, setColor] = useState(colors[0].value);
  const [saveNote, { isLoading : isCreating }] = useSaveNoteMutation();
  const [updateNote , {isLoading : isUpdating}] = useUpdateNoteMutation()
  const [priority, setPriority] = useState(priorities[0].value);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Array<Tag>>([]);
  
  const dispatch = useDispatch();
  useEffect(() =>{
    isUpdate && (
      setColor(note.color),
      setContent(note.content),
      setPriority(note.priority),
      setTags(note.tags),
      setTitle(note.title)
);
  },[isUpdate])


  const closeModal = () => {
    dispatch(toggleNoteModal(false));
    setTimeout(() => { 
      dispatch(reset());
      setTags([]);
      setColor(colors[0].value);
      setPriority(priorities[0].value);
      setTitle(""),
      setContent("")
    }, 300)
    
  };
  const handleTag =  (type : string , payload: Tag) => {
    if(type ==="select"){
      setTags((old : Tag[] | []) => [ payload , ...old ]);
      return ;
    }
    setTags((e) => e.filter((item : Tag) => item.id !== payload.id));
  }

  const handleSubmit = async (ev : React.FormEvent) => {
    ev.preventDefault();
    let finalnote = { title,content,tags,color,priority};
    if(isUpdate){
      const {title, content, tags, color,priority,...patch} = note;
      await updateNote({...finalnote, ...patch })
    }else{
      await saveNote({isArchived: false, isPinned: false,isRead: false,isSoftDelete : false, date: new Date().toUTCString(),...finalnote})
    }
    closeModal();
  };

  return (
    <>
      <TagModal type="select" handler={handleTag} selectedTag={tags}/>
      <Transition show={displayCreateNoteModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[2]"></div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className=" fixed inset-0  flex items-center justify-center bg-transparent z-[2]">
            <div
              className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md"
              ref={modalRef}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-extrabold ">{!isUpdate ? "Create Note" : "Update Note"}</h2>
                <button
                  onClick={closeModal}
                  className="px-2 py-1 rounded-md hover:text-red-500 "
                  title="Close"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col">
                <input
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Title..."
                  className="w-full border border-gray-400 px-4 py-2 text-base rounded-md outline-none"
                  onChange={({ target }) => setTitle(target.value)}
                />
                <textarea
                  name="content"
                  cols={20}
                  rows={10}
                  className="border resize-none outline-none border-gray-400 w-full mt-4 px-4 py-2  rounded-md "
                  placeholder="Write your note here ...."
                  value ={content}
                  onChange={({ target }) => setContent(target.value)}
                ></textarea>
                <div className="mt-2 flex gap-2">
                    {tags.map((item :Tag) => 
                      <div className="px-2 inline-flex items-center py-[.15rem] rounded-lg text-sm bg-black/10" key={item.id}>
                        <span>{item.value}</span>
                        <button onClick={()=> handleTag("deselect",item)}>
                          <XMarkIcon className="w-4 ml-1 h-4"/>
                        </button>
                      </div> )}
                </div>
                <div className="flex justify-between mt-3 items-center">
                  <button
                    onClick={(e) => (
                      e.preventDefault(),
                      dispatch(toggleTagModal({ type: "select", value: true }))
                    )}
                    className="px-5 py-2 bg-gray-200 rounded-lg mt-4 shadow-md"
                  >
                    Add Tag
                  </button>
                  <Select
                    selected={color}
                    options={colors}
                    handleChange={setColor}
                    name="color"
                  />
                  <Select
                    selected={priority}
                    options={priorities}
                    handleChange={setPriority}
                    name="priority"
                  />
                </div>
                <div className="ml-auto mt-4  flex items-center gap-2">
                  <ClipLoader
                    loading={isCreating || isUpdating}
                    className=""
                    size={18}
                    color="#1D4ED8"
                  />
                  <button
                    className="bg-blue-500 ml-auto text-white px-5 py-2 rounded-md disabled:bg-blue-300"
                    disabled={isCreating || isUpdating}
                  >
                    {isUpdate ? "Save" :"+ Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};

export default CreateModal;
