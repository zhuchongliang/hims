import { ref } from "vue";

import type { Ref } from "vue"

import type { PageModal } from "@/components/content/page-modal"

const usePageModal = function (
  handleNewCallback?: (itemInfo: any) => void,
  handleEditCallback?: (itemInfo: any) => void
): [Ref<any>, Ref<InstanceType<typeof PageModal>> | Ref<undefined>, (itemInfo: any) => void, (itemInfo: any) => void] {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref<any>({});

  const handleNew = (itemInfo: any) => {
    if (!pageModalRef.value) return;
    pageModalRef.value.dialogVisable = true;
    defaultInfo.value = {};

    handleNewCallback && handleNewCallback(itemInfo);
  }

  const handleEdit = (itemInfo: any) => {
    if (!pageModalRef.value) return;
    pageModalRef.value.dialogVisable = true;
    defaultInfo.value = {...itemInfo};
    handleEditCallback && handleEditCallback(itemInfo);
  }

  return [defaultInfo, pageModalRef, handleNew, handleEdit];
}

export default usePageModal;
