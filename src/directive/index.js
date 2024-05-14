import animation from './animation'

const directives = {
  animation
}

// 匯出給main.js掛載
export const customDirectives = {
  install(app) {
    Object.entries(directives).forEach(([directiveName, directiveObj]) => {
      app.directive(directiveName, directiveObj)
    })
  }
}