import axios from "@/config/axios";

const getProduct = async () => {
    try {
      let res = await axios.get('/platform/product');
      let data = res.data.response;
      return data;
    } catch (error:any) {
      alert(error.message)
    }
}

export default { getProduct }