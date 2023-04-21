import request from "../../index"

import type { IDrugAnalysisList, ITopPanelData } from "./type";

export async function getAnalysisData(url: string) {
  const result = await request.request<IDrugAnalysisList>({
    url: `/analysis${url}`,
    method: "get"
  })
  return result;
}

export async function getTopPanelData() {
  const result = await request.request<ITopPanelData>({
    url: "/analysis/amount",
    method: "get"
  })
  return result;
}
