function main() {
  const navAnchor_nodes = document.querySelectorAll('.nav-anchor-js')
  
  navAnchor_nodes.forEach((anchor) => {
    const anchorDestiny = document.querySelector(anchor.hash)

    anchor.addEventListener('click', (event) => {
      event.preventDefault()
      scrollIntoSection(anchorDestiny)
    })
  })

  if (location.hash)
    setTimeout(scrollIntoSection, 512, document.querySelector(location.hash))
}

function scrollIntoSection(section) {
  const pageNav_node = document.querySelector('.page-nav')
  const sectionTop = section.getBoundingClientRect().top
  const pageNavBottom = pageNav_node.getBoundingClientRect().bottom

  window.scrollBy({
    top: sectionTop - pageNavBottom,
    behavior: 'smooth'
  })
}

addEventListener('DOMContentLoaded', () => {
  main()
})
