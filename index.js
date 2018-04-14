export default (selector, conditions, stylesheet) => {

  const features = {
    minWidth: (el, number) => number <= el.offsetWidth,
    maxWidth: (el, number) => number >= el.offsetWidth,
    minHeight: (el, number) => number <= el.offsetHeight,
    maxHeight: (el, number) => number >= el.offsetHeight,
    minChildren: (el, number) => number <= el.children.length,
    children: (el, number) => number === el.children.length,
    maxChildren: (el, number) => number >= el.children.length,
    minCharacters: (el, number) => number <= ((el.value && el.value.length) || el.textContent.length),
    characters: (el, number) => number === ((el.value && el.value.length) || el.textContent.length),
    maxCharacters: (el, number) => number >= ((el.value && el.value.length) || el.textContent.length),
    minScrollX: (el, number) => number <= el.scrollLeft,
    maxScrollX: (el, number) => number >= el.scrollLeft,
    minScrollY: (el, number) => number <= el.scrollTop,
    maxScrollY: (el, number) => number >= el.scrollTop,
    minAspectRatio: (el, number) => number <= el.offsetWidth / el.offsetHeight,
    maxAspectRatio: (el, number) => number >= el.offsetWidth / el.offsetHeight,
    orientation: (el, string) => {
      switch (string) {
        case 'portrait': return el.offsetWidth < el.offsetHeight
        case 'square': return el.offsetWidth === el.offsetHeight
        case 'landscape': return el.offsetWidth > el.offsetHeight
      }
    }
  }

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

      const identifier = (
        selector
        + Object.keys(conditions)
        + Object.values(conditions)
      ).replace(/\W/g, '')

      if (
        Object.entries(conditions).every(test =>
          features[test[0]](tag, test[1])
        )
      ) {

        tag.setAttribute(`data-${identifier}`, count)
        styles += stylesheet.replace(
          /:self|\$this/g,
          `[data-${identifier}="${count}"]`
        )
        count++

      } else {

        tag.setAttribute(`data-${identifier}`, '')

      }

      return styles

    }, '')

}