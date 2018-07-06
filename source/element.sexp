mixin('element', ['selector', 'conditions', 'stylesheet'],
  prelude('  const features = {\n\
   minWidth: (el, number) => number <= el.offsetWidth,\n\
   maxWidth: (el, number) => number >= el.offsetWidth,\n\
   minHeight: (el, number) => number <= el.offsetHeight,\n\
   maxHeight: (el, number) => number >= el.offsetHeight,\n\
   minChildren: (el, number) => number <= el.children.length,\n\
   children: (el, number) => number === el.children.length,\n\
   maxChildren: (el, number) => number >= el.children.length,\n\
   minCharacters: (el, number) => number <= ((el.value && el.value.length) || el.textContent.length),\n\
   characters: (el, number) => number === ((el.value && el.value.length) || el.textContent.length),\n\
   maxCharacters: (el, number) => number >= ((el.value && el.value.length) || el.textContent.length),\n\
   minScrollX: (el, number) => number <= el.scrollLeft,\n\
   maxScrollX: (el, number) => number >= el.scrollLeft,\n\
   minScrollY: (el, number) => number <= el.scrollTop,\n\
   maxScrollY: (el, number) => number >= el.scrollTop,\n\
   minAspectRatio: (el, number) => number <= el.offsetWidth / el.offsetHeight,\n\
   maxAspectRatio: (el, number) => number >= el.offsetWidth / el.offsetHeight,\n\
   orientation: (el, string) => {\n\
     switch (string) {\n\
       case \'portrait\': return el.offsetWidth < el.offsetHeight\n\
       case \'square\': return el.offsetWidth === el.offsetHeight\n\
       case \'landscape\': return el.offsetWidth > el.offsetHeight\n\
     }\n\
   }\n\
 }\n\n',
    returnValue('Array.from(document.querySelectorAll(selector))',
      plainReduce(
        createAttribute(['selector', 'Object.keys(conditions)', 'Object.values(conditions)'],
          ifElseReset('\n\
       Object.entries(conditions).every(test =>\n\
         features[test[0]](tag, test[1])\n\
       )\n\
     ',
            'tag',
            'element'))))))