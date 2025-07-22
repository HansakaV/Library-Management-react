import React, {useState} from 'react';
import {Button} from "../components/Button.tsx";
import { Modal } from '../components/Modal.tsx';
import {Input} from '../components/Input.tsx';
import Table from "../components/Table.tsx";
import type {Book} from "../types";

const ItemsPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([
        { id: 'b1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', available: true },
        { id: 'b2', title: '1984', author: 'George Orwell', isbn: '978-0451524935', available: false },
        { id: 'b3', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', available: true },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);

    const columns = [
        { key: 'title' as keyof Book, header: 'Title' },
        { key: 'author' as keyof Book, header: 'Author' },
        { key: 'isbn' as keyof Book, header: 'ISBN' },
        {
            key: 'available' as keyof Book,
            header: 'Available',
            render: (book: Book) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {book.available ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'actions' as const,
            header: 'Actions',
            render: (book: Book) => (
                <div className="space-x-2">
                    <Button variant="secondary" onClick={() => handleEdit(book)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        setCurrentBook(null);
        setIsModalOpen(true);
    };

    const handleEdit = (book: Book) => {
        setCurrentBook(book);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setBooks(books.filter((b) => b.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newBook: Book = {
            id: currentBook?.id || String(Date.now()),
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            isbn: formData.get('isbn') as string,
            available: formData.get('available') === 'on', // Checkbox value
        };

        if (currentBook) {
            setBooks(books.map((b) => (b.id === newBook.id ? newBook : b)));
        } else {
            setBooks([...books, newBook]);
        }
        setIsModalOpen(false);
        setCurrentBook(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentBook(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Book Management</h2>
                <Button onClick={handleAdd}>Add New Book</Button>
            </div>
            <Table data={books} columns={columns} />

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentBook ? 'Edit Book' : 'Add New Book'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Title" name="title" defaultValue={currentBook?.title || ''} required />
                    <Input label="Author" name="author" defaultValue={currentBook?.author || ''} required />
                    <Input label="ISBN" name="isbn" defaultValue={currentBook?.isbn || ''} />
                    <div className="flex items-center">
                        <input
                            id="available"
                            name="available"
                            type="checkbox"
                            defaultChecked={currentBook?.available || false}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="available" className="ml-2 block text-sm text-gray-900">Available</label>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit">{currentBook ? 'Save Changes' : 'Add Book'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ItemsPage;