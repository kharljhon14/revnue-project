import { Item } from '@/app/page';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { FormEvent, useState } from 'react';

interface Props {
  addItem(item: Item): void;
}

export default function ShoppingForm({ addItem }: Props) {
  // State for input values
  const [name, setName] = useState('');
  const [type, setType] = useState('Grocery');

  //Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Create random Id
    //Call callback function for adding item
    //Reset form inputs

    const id = crypto.randomUUID();

    addItem({ id, name, type, quantity: '1' });
    setName('');
    setType('Grocery');
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          {/* Input field for name */}
          <Input
            label="List Name*"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Select field for Type */}
          <Select
            label="Type*"
            name="type"
            options={['Grocery', 'Home Goods', 'Hardware']}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <Button disabled={!name}>+ Add an item</Button>
      </div>
    </form>
  );
}
