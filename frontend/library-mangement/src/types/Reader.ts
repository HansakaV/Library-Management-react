export type Reader =  {
    readerId: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    membershipDate: Date
    status: 'active' | 'inactive' | 'suspended'
}

