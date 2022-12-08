<template>
  <form @submit.prevent="submit" class="form-frame">
    <slot :body="body" :disabled="readOnly" />

    <vue-hcaptcha
      sitekey="ff156874-0cc8-4f8f-a8f1-790f80b035b7"
      ref="captcha"
      :theme="captchaTheme"
      @verify="verifyCaptcha"
      @expired="resetCaptcha"
      @challengeExpired="resetCaptcha"
    />

    <div class="form-frame__bottom">
      <button
        type="submit"
        :disabled="readOnly || !hasToken"
        class="form-frame__submit-button"
        :class="{
          'form-frame__submit-button--error': sendError,
          'form-frame__submit-button--success': sendSuccess
        }"
      >
        <template v-if="toSend">Send</template>
        <template v-if="sending">Sending...</template>
        <template v-if="sendError">Try again</template>
        <template v-if="sendSuccess">Success!</template>
      </button>
    </div>
  </form>
</template>


<script lang="ts" setup>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'


const props = defineProps({
  url: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: {}
  }
})
const body = reactive(props.data)
const captcha = ref()
const colorMode = useColorMode()
const captchaTheme = computed(() => colorMode.value === 'dark' ? 'dark': 'light')
const sending = ref(false)
const done = ref(false)
const success = ref(false)
const readOnly = computed(() => sending.value)
const hasToken = computed(() => body.token !== null && body.ekey !== null)
const toSend = computed(() => !sending.value && !done.value)
const sendError = computed(() => !sending.value && done.value && !success.value)
const sendSuccess = computed(() => !sending.value && done.value && success.value)


function resetCaptcha() {
  body.token = null
  body.ekey = null
}
function verifyCaptcha(token, ekey) {
  body.token = token
  body.ekey = ekey
}

function submit({target}) {
  if (done.value) {
    clear()
    focus(target)
  }
  else send()
}

async function send() {
  sending.value = true

  try {
    await fetch(props.url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })

    success.value = true
  }
  catch {
    success.value = false
  }
  finally {
    sending.value = false
    done.value = true
  }
}

function clear () {
  for (const key of Object.keys(body))
    body[key] = ''

  done.value = false

  captcha.value.reset()
}

function focus (target) {
  target.querySelector('input').focus()
}

onMounted(() => resetCaptcha())

</script>


<style lang="postcss">
.form-frame {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__bottom {
    display: flex;
    flex-direction: column;
  }

  &__submit-button {
    margin-left: auto;
    padding: .5rem 0;
    border: 1px solid #000;
    min-width: 10rem;
    background-color: var(--background-color);
    transition: background-color 128ms, color 128ms;

    &:focus {
      outline: 2px solid rgba(0, 0, 0, .4);
      outline-offset: 1px;
      border-bottom-color: #000;
    }

    &:hover, &:disabled {
      background-color: #000;
      border-color: #000;
      color: #FFF;
    }

    &:disabled {
      opacity: .5;
    }

    :root.dark & {
      border-color: #FFF;

      &:hover, &:disabled {
        background-color: #FFF;
        border-color: #FFF;
        color: #000;
      }

      &--success {
        border-color: #286;
      }
    }

    &--error {
      background-color: #922;
      border-color: #922;
      color: #FFF;
    }

    &--success {
      background-color: #286;
      border-color: #286;
      color: #FFF;
    }
  }
}
</style>
