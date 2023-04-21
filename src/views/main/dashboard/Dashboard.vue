<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>门诊处方分类药物使用情况</span>
            </div>
          </template>
          <BarEchart v-bind="purchaseAnalsisData" x-name="药名" y-name="处方累计消耗"></BarEchart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>药库分类药物进货数量</span>
            </div>
          </template>
          <BarEchart v-bind="prescriptionAnalsisData" x-name="药名" y-name="药库累计采购"></BarEchart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { BarEchart } from "@/components/content/page-echarts/index";
import { StatisticalPanel } from "@/components/content/statistical-panel";
import useEchartsStore from "@/stores/main/dashboard/index"

const echartsStore = useEchartsStore();
const purchaseAnalsisData = computed(() => {
  const drugPurchase = echartsStore.drugPurchaseList;
  const labels: string[] = [];
  const values: number[] = [];
  for (let val of drugPurchase) {
    labels.push(val.name);
    values.push(val.count);
  }
  return { labels, values };
});
const prescriptionAnalsisData = computed(() => {
  const drugPrescription = echartsStore.drugPrescriptionList;
  const labels: string[] = [];
  const values: number[] = [];
  for (let val of drugPrescription) {
    labels.push(val.name);
    values.push(val.count);
  }
  return { labels, values };
});

const topPanelData = computed(() => echartsStore.topPanelData);

echartsStore.getAnalysisDataAction();
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;
  .el-row {
    width: 100%;
  }
}
.card-header {
  text-align: center;
  height: 30px;
  line-height: 30px;
}
</style>
