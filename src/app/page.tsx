'use client';

import ShoppingForm from '@/features/ShoppingForm';
import ShoppingList from '@/features/ShoppingList';
import { useCallback, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import useModal from '@/hooks/useModal';

export interface Item {
  id: string;
  name: string;
  quantity: string;
  type: string;
}

export interface UpdateValues {
  name: string;
  quantity: string;
}

export default function Home() {
  const [list, setList] = useState<Array<Item>>([]);

  const { open, handleClose, handleOpen } = useModal();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(list);
    const [newOrder] = items.splice(source.index, 1);

    items.splice(destination.index, 0, newOrder);

    setList(items);
  };

  const addItem = (item: Item) => {
    setList((prev) => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const updateItem = useCallback((id: string, values: UpdateValues) => {
    setList((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.id === id) return { ...item, name: values.name, quantity: values.quantity };
        return item;
      });
      return updatedList;
    });
  }, []);

  const hasInvalidValues = () => {
    return list.some((item) => item.name === '');
  };

  return (
    <div className="flex flex-col min-h-screen text-[#11103E]">
      <main className="flex-grow bg-neutral-50 p-6">
        <div className="mx-6 mb-16">
          <h1 className="text-lg font-bold">My Shopping List</h1>
        </div>
        <div className="md:mx-48 space-y-6">
          <ShoppingForm addItem={addItem} />

          {list.length > 0 && (
            <ShoppingList
              list={list}
              onDragEnd={onDragEnd}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          )}
        </div>
      </main>

      {list.length > 0 && (
        <footer className=" bg-gray-100 py-3 px-6 text-center">
          <div className="flex items-center  justify-end space-x-4">
            <div className=" w-28">
              <Button
                disabled={hasInvalidValues()}
                onClick={handleOpen}
              >
                Save
              </Button>
            </div>
            <div className="w-28">
              <Button
                buttonType="secondary"
                onClick={() => setList([])}
              >
                Cancel
              </Button>
            </div>
          </div>
        </footer>
      )}

      <Modal
        open={open}
        handleClose={handleClose}
      >
        <div className="p-4 space-y-5">
          <h2 className="text-2xl text-center font-bold mb-2">Shopping List Saved!</h2>

          <Button onClick={handleClose}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}
