import { Item, UpdateValues } from '@/app/page';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

interface Props {
  item: Item;
  index: number;
  updateItem(id: string, values: UpdateValues): void;
  removeItem(id: string): void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  background: isDragging ? '#4CAF50' : '#2196F3',
  color: isDragging ? '#fff' : '#11103E',
  borderRadius: `1.5rem`,
  ...draggableStyle,
});

export default function ListItem({ item, index, updateItem, removeItem }: Props) {
  // State for the name and quantity of the item
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);

  // Update the item when name or quantity changes
  useEffect(() => {
    updateItem(item.id, { name, quantity });
  }, [name, quantity, updateItem, item.id]);

  return (
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          className="shadow-md"
        >
          <div className="flex items-center justify-between">
            {/* Input field for item name */}
            <div className="flex items-center flex-grow space-x-4">
              <span className="text-4xl">
                <IoIosMenu />
              </span>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Dropdown for selecting quantity */}
            <div className="flex items-center flex-grow space-x-4">
              <Select
                name="quantity"
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Button to remove the item */}
            <button
              className="rounded-full bg-red-500 h-12 w-12 text-3xl border border-[#11103E] text-[#11103E]"
              onClick={() => removeItem(item.id)}
            >
              -
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
