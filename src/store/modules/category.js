import { getCategory } from "@/api/category.js";
import { ALL_CATEGORY_ITEM } from "@/constants/index.js";
import { CATEGORY_NORMAL_DATA } from "../../constants/index.js";

export default {
  namespace: "category",
  state() {
    return {
      // 1. 让 categorys 具备一个初始化数据
      // 2. 从服务端获取数据，替换初始化数据
      // 3. 为了防止初始化数据太老，我们把每次获取到的新数据，都作为下一次的初始化数据
      // 第三部方案：每次从接口得到的数据，进行缓存（localStorage），在下次运行时，把缓存的数据作为初始值
      categorys: CATEGORY_NORMAL_DATA,
    };
  },
  mutations: {
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys];
    },
  },
  actions: {
    async useCategoryData(context) {
      const { categorys } = await getCategory();
      context.commit("setCategorys", categorys);
    },
  },
};
