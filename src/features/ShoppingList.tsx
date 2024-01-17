import { Item, UpdateValues } from '@/app/page';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import ListItem from './ListItem';

interface Props {
  list: Array<Item>;
  onDragEnd: any;
  updateItem(id: string, values: UpdateValues): void;
  removeItem(id: string): void;
}

export default function ShoppingList({ list, onDragEnd, updateItem, removeItem }: Props) {
  return (
    <div className="space-y-4">
      <div className="px-2 py-3  border border-[#11103E] rounded-2xl">
        <div className="flex items-center mx-16 text-xl font-semibold">
          <div className="flex-grow">
            <span className="">Item Name</span>
          </div>
          <div className=" flex-grow text-center">
            <span>Quantity</span>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              className="space-y-4"
              ref={provided.innerRef}
            >
              {list.map((item, idx) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={idx}
                  updateItem={updateItem}
                  removeItem={removeItem}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
