import { defineStore } from "pinia";

import { ref } from "vue"

import { getAnalysisData, getTopPanelData } from "@/service/main/dashboard";
import type { IDrugAnalysisList, ITopPanelData } from "@/service/main/dashboard/type";

const useEchartsStore = defineStore("echartsStore", () => {
  const drugPrescriptionList = ref<IDrugAnalysisList>([]);
  const drugPurchaseList = ref<IDrugAnalysisList>([]);
  const topPanelData = ref<ITopPanelData>([]);

  const getAnalysisDataAction = async () => {
    const result = await getAnalysisData("/prescription");
    if (result) {
      drugPrescriptionList.value = result;
    }
    const result1 = await getAnalysisData("/purchase");
    if (result1) {
      drugPurchaseList.value = result1;
    }
    const result2 = await getTopPanelData();
    if (result2) {
      topPanelData.value = result2;
    }
  }
  return {
    drugPrescriptionList,
    drugPurchaseList,
    topPanelData,
    getAnalysisDataAction
  }
})

export default useEchartsStore;
