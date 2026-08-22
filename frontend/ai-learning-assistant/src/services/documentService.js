import axios from "axios"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/api.Paths";

const getDocument = async (id) =>{
    try{
        const response = await axiosInstance.delete(API_PATHS.DOCUMENTS.DELETE_Document(id));
        return response.data;
    }catch(error){
        throw error.response?.data || {message:'Failed to delete document'};
    }
};

const 


const getDocumentById = async (id) =>{
    try{
        const response = await axiosInstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENTS_BY_ID(id));
        return response.data;
    }catch(error){
       throw error.response?.data || {message:'Failed to fetch document details'};
    }
};

const documentService ={
    getDocuments,
    uploadDocument,
    deleteDocument,
    getDocumentById
}