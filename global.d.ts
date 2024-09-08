type Item = {
  title: string;
  description: string;
  id: string;
};

type Column = {
  title: string;
  items: Item[];
  color: string;
  id: string;
};

type Status = {
  title: string;
  id: string;
  selected: boolean;
}

type KanbanType = Column[];
