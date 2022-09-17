import {service} from "@/utils/request.js";

export const getCategory = () => {
    return service({
        url: '/category'
    })
}