interface IDrugAnalysis {
  drugId: number,
  name: string,
  count: number
}
export type IDrugAnalysisList = IDrugAnalysis[];

interface IPanelData {
  number: number,
  title: string,
  iconName: string
}
export type ITopPanelData = IPanelData[];
