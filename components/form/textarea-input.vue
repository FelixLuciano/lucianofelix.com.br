<template>
  <div class="form-input">
    <textarea
      type="text"
      :value="value"
      :name="name"
      :id="id"
      :required="required"
      :disabled="disabled"
      class="form-input__input form-input__input--textarea"
      @input="input"
    />

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

function input({target}) {
  value.value = target.value

  updateSize(target)
}

function updateSize (target) {
  target.style.height = 'auto'
  target.style.height = target.scrollHeight + 'px'
}

onMounted(() => value.value = value.value)
</script>

<style lang="postcss" scoped>
@import url(./form-input.postcss);

.form-input__input--textarea {
  padding: .5rem 1rem;
  min-height: 8rem;
  overflow: hidden;
  resize: none;
}
</style>
