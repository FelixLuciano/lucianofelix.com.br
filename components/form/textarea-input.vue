<template>
  <div class="form-textarea-input">
    <label :for="id" class="form-textarea-input__label"><slot name="label" /></label>

    <textarea
      type="text"
      :value="value"
      :name="name"
      :id="id"
      :required="required"
      :disabled="disabled"
      class="form-textarea-input__input"
      @input="input"
    />
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

<style lang="postcss">
.form-textarea-input {
  display: flex;
  flex-direction: column;

  &__label {
    padding-bottom: .3rem;
    font-weight: 500;
  }

  &__input {
    padding: .5rem 1rem;
    border: 1px dotted #BBB;
    border-bottom: 2px solid #999;
    min-height: 8rem;
    resize: none;
    font-family: inherit;

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