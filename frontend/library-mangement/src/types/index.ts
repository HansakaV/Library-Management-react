export interface Reader {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Book {
      id: string;
    _id: string; // Added to match expected type
    title: string;
    author: string;
    isbn: string;
    available: boolean;
}

export interface LendingTransaction {
    id: string;
    _id: string; // Added to match expected type
    bookId: string;
    readerId: string;
    lendDate: string;
    dueDate: string;
    returnDate: string | null;
}
