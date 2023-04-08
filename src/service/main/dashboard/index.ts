import request from "../../index"

import type { IDrugAnalysisList } from "./type";

export async function getAnalysisData(url: string) {
  const result = await request.request<IDrugAnalysisList>({
    url: `/analysis${url}`,
    method: "get"
  })
  return result;
}
