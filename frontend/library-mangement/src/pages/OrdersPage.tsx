import {Button} from "../components/Button.tsx";
import { Modal } from "../components/Modal.tsx"; // Fixed import extension
import {Input} from '../components/Input.tsx';
import Table from "../components/Table.tsx";
import type {LendingTransaction} from "../types";
import React, {useState} from "react";

const OrdersPage: React.FC = () => {
    const [transactions, setTransactions] = useState<LendingTransaction[]>([
        { _id:'t1',id: 't1', bookId: 'b1', readerId: '1', lendDate: '2024-07-01', dueDate: '2024-07-15', returnDate: null },
        { _id:'t2',id: 't2', bookId: 'b2', readerId: '2', lendDate: '2024-06-20', dueDate: '2024-07-04', returnDate: '2024-07-03' },
        { _id:'t3',id: 't3', bookId: 'b3', readerId: '3', lendDate: '2024-07-10', dueDate: '2024-07-24', returnDate: null },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<LendingTransaction | null>(null);

    const columns = [
        { key: 'bookId' as keyof LendingTransaction, header: 'Book ID' },
        { key: 'readerId' as keyof LendingTransaction, header: 'Reader ID' },
        { key: 'lendDate' as keyof LendingTransaction, header: 'Lend Date' },
        { key: 'dueDate' as keyof LendingTransaction, header: 'Due Date' },
        {
            key: 'returnDate' as keyof LendingTransaction,
            header: 'Return Date',
            render: (t: LendingTransaction) => (t.returnDate || 'Not Returned'),
        },
        {
            key: 'actions' as const,
            header: 'Actions',
            render: (t: LendingTransaction) => (
                <div className="space-x-2">
                    {!t.returnDate && (
                        <Button variant="primary" onClick={() => handleMarkReturned(t.id)}>Mark Returned</Button>
                    )}
                    <Button variant="secondary" onClick={() => handleEdit(t)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(t.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setCurrentTransaction(null);
        setIsModalOpen(true);
    };

    const handleEdit = (transaction: LendingTransaction) => {
        setCurrentTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this lending record?')) {
            setTransactions(transactions.filter((t) => t.id !== id));
        }
    };

    const handleMarkReturned = (id: string) => {
        setTransactions(transactions.map(t =>
            t.id === id ? { ...t, returnDate: new Date().toISOString().split('T')[0] } : t
        ));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const returnDateValue = formData.get('returnDate') as string;
        const newTransaction: LendingTransaction = {
            id: currentTransaction?.id || String(Date.now()),
            _id: currentTransaction?._id || String(Date.now()), // Ensure _id is set
            bookId: formData.get('bookId') as string,
            readerId: formData.get('readerId') as string,
            lendDate: formData.get('lendDate') as string,
            dueDate: formData.get('dueDate') as string,
            returnDate: returnDateValue && returnDateValue.trim() !== '' ? returnDateValue : null,
        };

        if (currentTransaction) {
            setTransactions(transactions.map((t) => (t.id === newTransaction.id ? newTransaction : t)));
        } else {
            setTransactions([...transactions, newTransaction]);
        }
        setIsModalOpen(false);
        setCurrentTransaction(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Lending Management</h2>
                <Button onClick={handleAdd}>Record New Lending</Button>
            </div>
            <Table data={transactions} columns={columns} />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentTransaction ? 'Edit Lending Record' : 'Add New Lending Record'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Book ID" name="bookId" defaultValue={currentTransaction?.bookId || ''} required />
                    <Input label="Reader ID" name="readerId" defaultValue={currentTransaction?.readerId || ''} required />
                    <Input label="Lend Date" name="lendDate" type="date" defaultValue={currentTransaction?.lendDate || ''} required />
                    <Input label="Due Date" name="dueDate" type="date" defaultValue={currentTransaction?.dueDate || ''} required />
                    <Input label="Return Date" name="returnDate" type="date" defaultValue={currentTransaction?.returnDate || ''} />
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit">{currentTransaction ? 'Save Changes' : 'Add Record'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default OrdersPage;