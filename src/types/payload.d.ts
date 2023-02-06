export interface NotePayload {
  isRead: boolean,
  date: string,
  isArchived: boolean,
  isSoftDelete : boolean,
  title: string,
  content: string,
  tags: Tag[],
  color: string,
  priority: string,
  isPinned: boolean,
}



export interface Tag {
  id: string, 
  value : string
}


export interface Color{
  id: string, 
  value: string
}

export interface Priority{
  id: string , 
  value : string
}






