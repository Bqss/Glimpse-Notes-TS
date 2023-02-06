type  Priority =  "high"|"low";

declare interface Note {
  id: string ,
  isSoftDelete : boolean,
  createdAt: string,
  updatedAt: string,
  title: string,
  content: string,
  tags: Array<Tag>,
  color: string,
  priority: Priority,
  isPinned: boolean,
  isRead: boolean,
  date: string,
  isArchived: boolean
}

declare interface Tag {
  id: string,
  value: string,
}

