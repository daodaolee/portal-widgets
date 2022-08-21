<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>
 
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useDark } from '@vueuse/core'

let isDark = useDark()
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: ''
  }
})
let color = computed(() => {
  return isDark.value ? '#c6ccd5' : '#374151'
})
const iconName = computed(() => {
  return props.class ? `#icon-${props.class}` : '#icon';
});

const svgClass = computed(() => {
  return props.name ? 'svg-icon ' + props.name : 'svg-icon';
});


</script>
 
<style lang="less">
svg {
  color: var(--svg-color);
}

.svg-icon {
  width: 1.7em;
  height: 1.7em;
  fill: currentColor;
  vertical-align: middle;
  cursor: pointer;


}
</style>