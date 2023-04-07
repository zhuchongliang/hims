import useSystemStore from "@/stores/main/system"

import { ref } from "vue";
import type { Ref } from "vue"

const usePageSearch = (
  pageName: string,
  deleteCallBack?: () => void,
  searchCallBack?: (searchInfo: string) => void): [
  Ref<any[]>,
  () => Promise<void>,
  (queryInfo: string) => void,
] => {
  const systemStore = useSystemStore();
  const selections = ref<any[]>([]);

  const handleDelete = async () => {
    await systemStore.deleteListItemsAction(pageName, selections.value);
    deleteCallBack && deleteCallBack();
  }

  const handleSearch =  (searchInfo: string) => {
    searchCallBack && searchCallBack(searchInfo);
  }

  return [selections, handleDelete, handleSearch];
}

export default usePageSearch;
