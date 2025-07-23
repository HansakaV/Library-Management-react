export interface Reader {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    available: boolean;
}

export interface LendingTransaction {
    id: string;
    bookId: string;
    readerId: string;
    lendDate: string;
    dueDate: string;
    returnDate: string | null;
}
