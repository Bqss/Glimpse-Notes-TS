import { Transition } from "@headlessui/react";
import { toggleTagModal } from "../../../features/modalSlice";
import React, {useState, useEffect} from "react";
import { XMarkIcon, CheckIcon, MinusIcon , PlusIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useRef } from "react";
// import { useClickOutside } from "./../../hooks";
import { tagApi, useGetTagQuery, useSaveTagMutation, useDeleteTagMutation } from "../../../api/tagApi";


interface Props {
  type? : string,
  selectedTag? : Tag[],
  handler? : (type : string, tag: Tag) =>  void

}

const TagModal = ({type = "edit", selectedTag, handler} : Props) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const {data : tags = [] } = useGetTagQuery();
  const [tagAdded] = useSaveTagMutation();
  const { displayEditTagModal, displaySelectTagModal } = useSelector((state : any) => state.modal);
  const [TagValue, setTagValue] = useState("");
  

  const closeModal = () => {
    if(type === "edit" ) {
      dispatch(toggleTagModal({type:"edit",value:false})) ;
      return;
    }
    dispatch(toggleTagModal({type:"select",value:false}));
  };

  const isSelected = (tagId : string) => {
    return  Boolean(selectedTag?.find(({id}) => (id == tagId)));
  }

  // useClickOutside(modalRef, closeModal);
  
  const handleSubmit =  async (ev : React.FormEvent) => {
    ev.preventDefault();
    await tagAdded(TagValue);
    setTagValue("");
  }

  return (
    <Transition show={ type ==="edit" ? displayEditTagModal : displaySelectTagModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[3]"></div>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed inset-0 flex items-center justify-center z-[3]">
          <div
            className="w-full max-w-xs bg-white p-5 rounded-lg"
            ref={modalRef}
          >
            <div className="flex justify-between ">
              <h2 className="text-bold text-lg">{type == "edit" ? "Edit Tags" : "Select Tags"}</h2>
              <button onClick={closeModal}>
                <XMarkIcon className="w-5 h-5"></XMarkIcon>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-end gap-3">
                <input
                  type="text"
                  className="border-b-2 flex-1 outline-none border-gray-500 px-2 py-1"
                  placeholder="New Tag .."
                  value={TagValue}
                  onChange={({target}) => setTagValue(target.value)}
                />
                <button >
                  <CheckIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="flex flex-col mt-6 gap-3">
              {type == "edit" ? tags.map((e) => <Tag tag={e} key={e.id}/>) :
                tags.map(e => <TagOpt tag={e} key={e.id} isSelected={isSelected} handler={handler}/>)
              }
              
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
};



const Tag = ({tag }:{tag : Tag}) => {
  const [tagDeleted] = useDeleteTagMutation();
  return (
    <div className="flex justify-between items-center" >
      <span>{tag.value}</span>
      <button>
        <XMarkIcon className="w-4 h-4" onClick={() => tagDeleted(tag)} />
      </button>
    </div>
  );
}

interface TagOptProps {
    tag: Tag,
    isSelected : (id: string) => boolean,
    handler? : ( type : string , tag : Tag ) => void 
}

const TagOpt = ({tag , isSelected, handler}: TagOptProps) => {

  return (
    <div className="flex justify-between items-center" >
      <span>{tag.value}</span>
      {isSelected(tag.id) ? 
        <button onClick={() => handler && handler("deselect" ,tag)}>
          <MinusIcon className="w-4 h-4"/>
        </button>
        :
        <button onClick={() => handler && handler("select",tag)}>
          <PlusIcon className="w-4 h-4"/>
        </button>
     }
    </div>
  )
}

export default TagModal;
