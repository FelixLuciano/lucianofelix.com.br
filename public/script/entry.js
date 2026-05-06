class ColorSchemeSelectElement extends HTMLSelectElement {
  static #LOCAL_STORAGE_KEY = 'theme'
  static #TRANSITION_CLASS = 'color-scheme-transition'

  connectedCallback() {
    let colorScheme = localStorage.getItem(ColorSchemeSelectElement.#LOCAL_STORAGE_KEY)
    this.value = colorScheme !== null ? colorScheme : this.#detectColorScheme()

    this.addEventListener('input', this.#handleSelect)
    this.#updateColorScheme()
  }

  disconnectedCallback() {
    this.removeEventListener('input', this.#handleSelect)
  }

  async #handleSelect() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || prefersReducedMotion) {
      this.#updateColorScheme()
      return
    }

    document.documentElement.classList.add(ColorSchemeSelectElement.#TRANSITION_CLASS)

    const transition = document.startViewTransition(() => this.#updateColorScheme())
    try {
      await transition.finished;
    } finally {
      document.documentElement.classList.remove(ColorSchemeSelectElement.#TRANSITION_CLASS);
    }
  }

  #updateColorScheme() {
    localStorage.setItem(ColorSchemeSelectElement.#LOCAL_STORAGE_KEY, this.value)

    for (const option of this)
      document.documentElement.classList.remove(option.value)

    document.documentElement.classList.add(this.value)
  }

  #detectColorScheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      return this.options[1].value
    else
      return this.options[0].value
  }
}

class SelfTypingElement extends HTMLSpanElement {
  static #observer = new IntersectionObserver(SelfTypingElement.#IntersectionObserverCallback, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 1.0
  })

  static async #IntersectionObserverCallback(event) {
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
    if (this.dataset.force === undefined && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    this.text_node = this.childNodes[0]
    this.queue_node = document.createElement('span')
    this.cursor_node = document.createElement('span')

    this.queue_node.textContent = this.text_node.textContent
    this.queue_node.style.color = 'transparent'
    this.cursor_node.textContent = this.dataset.cursor || '|'
    this.cursor_node.classList = 'type-async--cursor'
    this.cursor_node.ariaHidden = 'true'
    this.text_node.textContent = ''

    this.parentNode.style.setProperty('position', 'relative')
    this.parentNode.insertBefore(this.queue_node, this.nextSibling)
    SelfTypingElement.#observer.observe(this)
  }

  disconnectedCallback() {
    SelfTypingElement.#observer.unobserve(this)
  }

  async init() {
    await SelfTypingElement.sleep(SelfTypingElement.typeInterval * 10)
    this.parentNode.appendChild(this.cursor_node)
    return this.type()
  }

  async type() {
    if (this.queue_node.textContent == '') {
      await SelfTypingElement.sleep(this.typeInterval * 10)
      return this.destroy()
    }

    this.text_node.textContent += this.queue_node.textContent.substring(0, 1)
    this.queue_node.textContent = this.queue_node.textContent.substring(1)

    this.#updateCursorPosition()
    await SelfTypingElement.sleep(SelfTypingElement.typeInterval)

    return this.type()
  }

  destroy() {
    this.text_node.textContent += this.queue_node.textContent

    this.queue_node.remove()
    this.cursor_node.remove()

    if (this.dataset.remove == "false")
      return

    const text_node = document.createTextNode(this.text_node.textContent)

    this.parentNode.insertBefore(text_node, this)
    this.remove()
  }

  #updateCursorPosition() {
    const rects = this.getClientRects()
    const lastRect = rects[rects.length - 1]
    const parentRect = this.parentNode.getBoundingClientRect()

    this.cursor_node.style.left = `${lastRect.right - parentRect.left}px`
    this.cursor_node.style.top = `${lastRect.top - parentRect.top}px`
  }
}

class PrintPageElement extends HTMLAnchorElement {
  static get iframe() {
    let iframe = document.getElementById('printing-doc-iframe')

    if (iframe !== null) return iframe

    iframe = document.createElement('iframe')
    iframe.id = 'printing-doc-iframe'
    iframe.style.display = 'none'

    return iframe
  }

  connectedCallback() {
    this.addEventListener('click', this.onclick)
  }

  onclick(event) {
    event.preventDefault()
    this.classList.add('disabled')

    const iframe = PrintPageElement.iframe
    const saveContent = this.innerHTML

    this.innerText = 'Carregando...'
    iframe.src = this.href
    
    iframe.onload = () => {
      try {
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
      }
      catch (error) {
        console.error(error)
        window.open(this.href, this.target, '')
      }
      finally {
        this.innerHTML = saveContent

        this.classList.remove('disabled')
      }
    }
    iframe.onerror = () => {
      throw 'Failed to load page!'
    }

    try {
      document.body.appendChild(iframe)
    }
    catch (error) {
      console.error(error)
      this.classList.remove('disabled')
      window.open(this.href, this.target, '')

      this.innerHTML = saveContent
    }
  }
}

customElements.define('color-scheme-select', ColorSchemeSelectElement, { extends: 'select' })
customElements.define('self-typing', SelfTypingElement, { extends: 'span' })
customElements.define('print-page', PrintPageElement, { extends: 'a' })
