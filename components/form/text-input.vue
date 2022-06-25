<template>
  <div class="form-input">

    <input
      type="text"
      :name="name"
      :id="id"
      :required="required"
      :disabled="disabled"
      class="form-input__input"
      v-model="value"
    >

    <label :for="id" class="form-input__label"><slot name="label" /></label>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core"

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'update:modelValue'
])

const id = computed(() => `form__${props.name}`)
const value = useVModel(props, 'modelValue', emits)

onMounted(() => value.value = value.value)
</script>

<style lang="postcss" scoped>
@import url(./form-input.postcss);
</style>
