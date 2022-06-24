<template>
  <div class="form-text-input">
    <label :for="id" class="form-text-input__label"><slot name="label" /></label>

    <input
      type="text"
      :name="name"
      :id="id"
      :required="required"
      :disabled="disabled"
      class="form-text-input__input"
      v-model="value"
    >
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

<style lang="postcss">
.form-text-input {
  display: flex;
  flex-direction: column;

  &__label {
    padding-bottom: .3rem;
    font-weight: 500;
  }

  &__input {
    padding: 0 1rem;
    border: 1px dotted #BBB;
    border-bottom: 2px solid #999;
    height: 2.5rem;

    &:focus {
      outline: 2px solid rgba(0, 0, 0, .4);
      outline-offset: 1px;
      border-bottom-color: #000;
    }

    &:disabled {
      opacity: .5;
    }
  }
}
</style>