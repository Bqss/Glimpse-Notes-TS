const getArchivedNotes = (notes : Note[]) : Note[] => {
  return notes.filter(item => item.isArchived && !item.isSoftDelete);
}

const getPinnedNote = (notes : Note[]) : Note[] => {
  return notes.filter(item => item.isPinned && !item.isSoftDelete);
}

const getOrdinaryNote = (notes : Note[]) : Note[] => {
  return notes.filter(item => !item.isPinned && !item.isArchived && !item.isSoftDelete);
}

const getTaggedNote = (notes : Note[], tagName? : string| undefined) : Note[] => {
  return notes.filter(item => item.tags.map(e => e.value).includes(tagName??"")&& !item.isSoftDelete);
}

const filltereNotes = (notes : Note[], filterKey : string) : Note[] => {
  const lowPriority = notes.filter(e => e.priority === "low" ) ?? [];
  const highPriority = notes.filter(e => e.priority === "high")?? [];
  switch(filterKey){
      case "low":
          return [...lowPriority, ...highPriority ];
      case "high":
          return [...highPriority, ...lowPriority];
      case "lastest":
          return [...notes].sort((a, b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "oldest":
          return [...notes].sort((a, b)=> new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "edited":
          return [...notes].sort((a,b)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() );
      default:
          return notes;
  }   
}

const getAllNote = (notes : Note[], filter : string, searchKey: string) => {
  console.log(notes);
  const fNotes = filltereNotes(notes,filter);
  return fNotes.filter(e => (e.content.includes(searchKey) || e.title.includes(searchKey)));
}


export default getAllNote;


export {getArchivedNotes, getPinnedNote, getOrdinaryNote, getTaggedNote}