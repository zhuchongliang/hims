<template>
  <div class="statistical">
    <div class="header">
      <span>{{ panelData.title }}</span>
    </div>
    <div class="content">
      <el-icon>
        <component
          font-size="26px"
          :is="map[panelData.iconName].icon"
          :color="map[panelData.iconName].color"
        />
      </el-icon>
      <CounterUp
        :number="panelData.number"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CounterUp } from '@/components/common/count-up'

import { UserFilled, OfficeBuilding, Coin, TrendCharts } from '@element-plus/icons-vue';

interface IPropsType {
  panelData?: any
}
withDefaults(defineProps<IPropsType>(), {
  panelData() {
    return {}
  }
})

const map = {
  "drug": {
    icon: Coin,
    color: "#8595f4"
  },
  "office": {
    icon: OfficeBuilding,
    color: "#ad85f4"
  },
  "reserve": {
    icon: TrendCharts,
    color: "#74a8b5"
  },
  "user": {
    icon: UserFilled,
    color: "#f48d9b"
  }
}
</script>

<style scoped lang="less">
@h: 38px;

.statistical {
  display: flex;
  padding: 0 20px;
  background: #e9edf2;
  flex-direction: column;
  justify-content: flex-start;
  height: 130px;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: left;
  border-radius: 4px;
  transition: all .3s ease;
  &:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, .2);
    transform: translate(0, -10px);
  }
  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    // border: 1px solid red;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 32px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    .el-icon {
      margin: 10px 8px 0 0;
    }
  }
}
</style>
