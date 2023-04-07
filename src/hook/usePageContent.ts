import type { PageContent } from "@/components/content/page-content";

import { ref } from "vue"
import type { Ref } from "vue"

const usePageContent = (selectionChangeCallBack?: (selections: any[]) => void): [
  (selections: any[]) => void,
  () => void,
  Ref<InstanceType<typeof PageContent>> | Ref<undefined>
] => {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  const handleSelectionChange = (selections: any[]) => {
    selectionChangeCallBack && selectionChangeCallBack(selections);
  }

  const handlePageChange = (page: number = 1) => {
    if (!pageContentRef.value) return;
    const pageInfo = pageContentRef.value.pageInfo;
    pageContentRef.value.pageInfo = {
      pageSize: pageInfo.pageSize,
      currentPage: page ? page : pageInfo.currentPage
    }
  }

  return [ handleSelectionChange, handlePageChange, pageContentRef ];
}

export default usePageContent;
