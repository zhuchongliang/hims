import { defineStore } from "pinia";

import { ref } from "vue"

import { getAnalysisData } from "@/service/main/dashboard";
import type { IDrugAnalysisList } from "@/service/main/dashboard/type";

const useEchartsStore = defineStore("echartsStore", () => {
  const drugPrescriptionList = ref<IDrugAnalysisList>([]);
  const drugPurchaseList = ref<IDrugAnalysisList>([]);

  const getAnalysisDataAction = async () => {
    const result = await getAnalysisData("/prescription");
    if (result) {
      drugPrescriptionList.value = result;
    }
    const result1 = await getAnalysisData("/purchase");
    if (result1) {
      drugPurchaseList.value = result1;
    }
  }
  return {
    drugPrescriptionList,
    drugPurchaseList,
    getAnalysisDataAction
  }
})

export default useEchartsStore;
