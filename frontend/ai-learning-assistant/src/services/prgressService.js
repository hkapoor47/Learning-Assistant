import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/api.Paths";

const getDashboardData = async ()=>{
    try {
        const response = await axiosInstance.get(API_PATHS.PROGRESS.GET_DASHBOARD);
        return response.data;
    } catch (error) {
        throw error.message?.data || { message :' Failed to fetch dashboard data '};
    }
};

const progessService ={ 
    getDashboardData,
};

export default progessService;