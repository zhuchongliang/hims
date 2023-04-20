<template>
  <div>
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

echartsStore.getAnalysisDataAction();
</script>

<style scoped>
.card-header {
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.row {
  width: 100%;
}
</style>
