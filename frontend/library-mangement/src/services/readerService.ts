import type { Reader } from "../types"
import apiClient from "./apiClient"

export const getAllReaders = async (): Promise<Reader[]> => {
  const response = await apiClient.get("/readers")
  return response.data
}

export const deleteReader = async (_id: string): Promise<void> => {
  await apiClient.delete(`/customers/${_id}`)
}

export const addReader = async (customerData: Omit<Reader, "_id">): Promise<Reader> => {
    console.log("Adding reader with data:", customerData)
  const response = await apiClient.post("/readers", customerData)
  console.log("Response from adding reader:", response.data)

  return response.data
}

export const updateReader = async (_id: string, readerData: Omit<Reader, "_id">) => {
  const response = await apiClient.put(`/readers/${_id}`, readerData)
  return response.data
}


