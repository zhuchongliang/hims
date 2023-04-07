<template>
  <div class="hims-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="(item, index) in formItems" key="item.type">
          <el-col v-bind="colLayout">
            <el-form-item
              :rules="item.rules"
              :label="item.label"
              class="form-item"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <component
                :is="map[item.type]"
                v-bind="getFormItemConfig(item)"
                v-model="formData[item.field]"
              >
                <template v-if="item.type === `select`"
                  v-for="option in item.options"
                  :key="option.value"
                >
                  <el-option
                    :value="option.value"
                  >{{option.label}}</el-option>
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IFormItem } from "../type"

import { watch, ref } from "vue";

import useFormItemConfig from "../hook/useFormItemType"

import {
  ElInput,
  ElSelect,
  ElDatePicker,
  ElOption,
} from "element-plus/es"

type FormPropsType = {
  title?: string
  formItems?: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
  modelValue: any
}

const props = withDefaults(defineProps<FormPropsType>(), {
  title: "",
  labelWidth: "80px",
  formItems: () => [],
  itemStyle: () => {},
  colLayout: () => ({
    xl: 6, // ≥1920px
    lg: 8, // ≥1200px
    md: 12, // ≥992px
    sm: 24, // ≥768px
    xs: 24 // <768px
  })
})

const emit = defineEmits<{
  (event: "update:modelValue", formData: any): void
}>()

const formData = ref({...props.modelValue});

watch(formData, (newFormData) => {
  emit("update:modelValue", newFormData);
}, {
  deep: true
})

const [ getFormItemConfig ] = useFormItemConfig();

const map = {
  "select": ElSelect,
  "datepicker": ElDatePicker,
  "input": ElInput,
}

</script>

<style scoped lang="less">
.hims.form {
  padding: 20px 20px 0;
}
</style>
