class SmoothAnchorElement extends HTMLAnchorElement {
  static scrollIntoSection(selector) {
    const section_node = document.querySelector(selector)
    const sectionTop = section_node.getBoundingClientRect().top
    const pageNav_node = document.querySelector('.page-nav')
    const pageNavBottom = pageNav_node.getBoundingClientRect().bottom

    window.scrollBy({
      top: sectionTop - pageNavBottom,
      behavior: 'smooth'
    })
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick)
  }

  handleClick(event) {
    event.preventDefault()
    SmoothAnchorElement.scrollIntoSection(this.hash)
  }
}

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
    this.cursor_node = document.createElement('span')
    this.span_node = document.createElement('span')

    this.cursor_node.classList.add('self-typing--cursor')
    this.cursor_node.textContent = '|'
    this.cursor_node.style.display = 'none'
    this.span_node.textContent = this.text_node.textContent
    this.span_node.style.opacity = 0
    this.text_node.textContent = ''

    this.parentNode.insertBefore(this.span_node, this.nextSibling)
    this.appendChild(this.cursor_node)
    SelfTypingElement.#observer.observe(this)
  }

  disconnectedCallback() {
    SelfTypingElement.#observer.unobserve(this)
  }

  async init() {
    await SelfTypingElement.sleep(SelfTypingElement.typeInterval * 5)
    this.cursor_node.style.display = 'inline'
    await SelfTypingElement.sleep(SelfTypingElement.typeInterval * 5)

    return this.type()
  }

  async type() {
    if (this.span_node.textContent == '') {
      await SelfTypingElement.sleep(this.typeInterval * 10)
      return this.destroy()
    }

    this.text_node.textContent += this.span_node.textContent.substring(0, 1)
    this.span_node.textContent = this.span_node.textContent.substring(1)

    await SelfTypingElement.sleep(SelfTypingElement.typeInterval)

    return this.type()
  }

  destroy() {
    this.text_node.textContent += this.span_node.textContent

    if (this.dataset.remove) {
      const text_node = document.createTextNode(this.text_node.textContent)

      try {
        this.parentNode.insertBefore(text_node, this)
      }
      catch (e) {
        console.log(e)
        console.log(this, this.parentNode)
      }
      this.remove()
    }

    this.cursor_node.remove()
    this.span_node.remove()
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
    const data = Object.fromEntries(new FormData(this).entries())

    if (data['g-recaptcha-response'] == '' || data['h-captcha-response'] == '')
      data['g-recaptcha-response'] = data['h-captcha-response'] = (await hcaptcha.execute(null, { async: true })).response

    for (const element of this.elements)
      element.readOnly = true

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

      if (responseData.success)
        this.reset()
    }
    catch {
      response_node.innerText = "Unable to send your message!"
    }

    for (const element of this.elements)
      element.readOnly = false

    hcaptcha.reset()
  }
}


customElements.define('smooth-anchor', SmoothAnchorElement, { extends: 'a' })
customElements.define('self-typing', SelfTypingElement, { extends: 'span' })
customElements.define('async-form', AsyncFormElement, { extends: 'form' })
customElements.define('auto-resize', AutoResizeTextAreaElement, { extends: 'textarea' })

addEventListener('DOMContentLoaded', () => {
  if (location.hash)
    setTimeout(SmoothAnchorElement.scrollIntoSection, 512, location.hash)
})
