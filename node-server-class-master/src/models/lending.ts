import mongoose from "mongoose";

type Lending = {
  lendingId: string
  readerId: mongoose.Types.ObjectId
  isbn: mongoose.Types.ObjectId
  lendDate: Date
  dueDate: Date
  returnDate?: Date
  status: 'active' | 'returned' | 'overdue'

}

const lendingSchema = new mongoose.Schema<Lending>({
  lendingId: {
    type: String,
    required: [true, "Lending ID is required"],
    unique: [true, "Lending ID already exists"],
    trim: true,
  },
  readerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reader',
    required: [true, "Reader ID is required"],
  },
  isbn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, "Book ID is required"],
  },
  lendDate: {
    type: Date,
    required: [true, "Lend date is required"],
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'returned', 'overdue'],
      message: "Status must be active, returned, or overdue"
    },
    default: 'active',
  },

})

export const LendingModel = mongoose.model("Lending", lendingSchema)
