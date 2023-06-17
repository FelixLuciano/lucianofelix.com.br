class SelfTypingElement extends HTMLSpanElement {
  static #observer = new IntersectionObserver(SelfTypingElement.IntersectionObserverCallback, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 1.0
  })

  static async IntersectionObserverCallback(event) {
    for (const entry of event) {
      if (entry.isIntersecting) {
        this.unobserve(entry.target)
        entry.target.init()
      }
    }
  }

  static get typeInterval() {
    const randomMs = 100 * Math.random()
    return randomMs < 50 ? 10 : randomMs
  }

  static sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  connectedCallback() {
    this.text_node = this.childNodes[0]
    this.queue_node = document.createElement('span')

    this.queue_node.textContent = this.text_node.textContent
    this.queue_node.style.color = 'transparent'
    this.text_node.textContent = ''

    this.parentNode.insertBefore(this.queue_node, this.nextSibling)
    SelfTypingElement.#observer.observe(this)
  }

  disconnectedCallback() {
    SelfTypingElement.#observer.unobserve(this)
  }

  async init() {
    await SelfTypingElement.sleep(SelfTypingElement.typeInterval * 10)
    return this.type()
  }

  async type() {
    if (this.queue_node.textContent == '') {
      await SelfTypingElement.sleep(this.typeInterval * 10)
      return this.destroy()
    }

    this.text_node.textContent += this.queue_node.textContent.substring(0, 1)
    this.queue_node.textContent = this.queue_node.textContent.substring(1)

    await SelfTypingElement.sleep(SelfTypingElement.typeInterval)

    return this.type()
  }

  destroy() {
    this.text_node.textContent += this.queue_node.textContent

    this.queue_node.remove()

    if (this.dataset.remove == "false")
      return

    const text_node = document.createTextNode(this.text_node.textContent)

    this.parentNode.insertBefore(text_node, this)
    this.remove()
  }
}

class AutoResizeTextAreaElement extends HTMLTextAreaElement {
  connectedCallback() {
    this.addEventListener('input', this.handleInput)
  }

  disconnectedCallback() {
    this.removeEventListener('input', this.handleInput)
  }

  handleInput(event) {
    this.updateHeight()
  }

  updateHeight() {
    this.style.height = 'auto'
    this.style.height = this.scrollHeight + 'px'
  }
}

class AsyncFormElement extends HTMLFormElement {
  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit)
  }

  disconnectedCallback() {
    this.removeEventListener('submit', this.#handleSubmit)
  }

  async #handleSubmit(event) {
    event.preventDefault()

    const response_node = this.querySelector('.form--response')
    const submitButton_node = this.querySelector('input[type="submit"]')
    const data = Object.fromEntries(new FormData(this).entries())

    if (data['g-recaptcha-response'] == '' || data['h-captcha-response'] == '')
      data['g-recaptcha-response'] = data['h-captcha-response'] = (await hcaptcha.execute(null, { async: true })).response

    for (const element of this.elements)
      element.readOnly = true

    submitButton_node.value = "Sending..."

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      response_node.innerText = responseData.message

      if (responseData.success) {
        submitButton_node.value = "SEND"
        this.reset()
      }
      else {
        submitButton_node.value = "TRY AGAIN"
      }
    }
    catch {
      response_node.innerText = "Unable to send your message!"
      submitButton_node.value = "TRY AGAIN"
    }

    for (const element of this.elements)
      element.readOnly = false

    hcaptcha.reset()
  }
}


customElements.define('self-typing', SelfTypingElement, { extends: 'span' })
customElements.define('async-form', AsyncFormElement, { extends: 'form' })
customElements.define('auto-resize', AutoResizeTextAreaElement, { extends: 'textarea' })
