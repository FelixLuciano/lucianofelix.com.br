<template>
  <page-section id="contact">
    <template #title>
      Get in touch
    </template>

    <template #header>
      Send me a message
    </template>

    <div class="grid md:grid-cols-2 gap-8">
      <div />

      <form-frame url="/api/send-message">
        <template #="{ body, disabled }">
          <form-text-input
            name="contact"
            :required="true"
            :disabled="disabled"
            v-model="body.contact"
          >
            <template #label>Contact</template>
          </form-text-input>

          <form-textarea-input
            name="message"
            :required="true"
            :disabled="disabled"
            v-model="body.message"
          >
            <template #label>Message</template>
          </form-textarea-input>
        </template>
      </form-frame>
    </div>
  </page-section>
</template>
