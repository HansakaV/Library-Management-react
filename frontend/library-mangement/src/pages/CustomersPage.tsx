import type {Reader} from "../types";
import {Button} from "../components/Button.tsx";
import React, {useState} from "react";
import {Input} from "../components/Input.tsx"; // Fixed import path
import Table from "../components/Table.tsx";
import {Modal} from "../components/Modal.tsx";

const CustomersPage: React.FC = () => {
    const [readers, setReaders] = useState<Reader[]>([
        { id: '1', name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890' },
        { id: '2', name: 'Bob Johnson', email: 'bob@example.com', phone: '098-765-4321' },
        { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-123-4567' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReader, setCurrentReader] = useState<Reader | null>(null);

    const columns = [
        { key: 'name' as keyof Reader, header: 'Name' },
        { key: 'email' as keyof Reader, header: 'Email' },
        { key: 'phone' as keyof Reader, header: 'Phone' },
        {
            key: 'actions' as const,
            header: 'Actions',
            render: (reader: Reader) => (
                <div className="space-x-2">
                    <Button variant="secondary" onClick={() => handleEdit(reader)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(reader.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setCurrentReader(null);
        setIsModalOpen(true);
    };

    const handleEdit = (reader: Reader) => {
        setCurrentReader(reader);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this reader?')) { // Fixed confirm call
            setReaders(readers.filter((r) => r.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newReader: Reader = {
            id: currentReader?.id || String(Date.now()), // Simple ID generation
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        };

        if (currentReader) {
            setReaders(readers.map((r) => (r.id === newReader.id ? newReader : r)));
        } else {
            setReaders([...readers, newReader]);
        }
        setIsModalOpen(false);
        setCurrentReader(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentReader(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Reader Management</h2>
                <Button onClick={handleAdd}>Add New Reader</Button>
            </div>
            <Table data={readers} columns={columns} />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentReader ? 'Edit Reader' : 'Add New Reader'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name" name="name" defaultValue={currentReader?.name || ''} required />
                    <Input label="Email" name="email" type="email" defaultValue={currentReader?.email || ''} required />
                    <Input label="Phone" name="phone" defaultValue={currentReader?.phone || ''} />
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit">{currentReader ? 'Save Changes' : 'Add Reader'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CustomersPage;