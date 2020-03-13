import timeline from './lib/components/timeline/timeline'

// Export as individual components
export const Components = {
  timeline,
}

const plugin = {
  install (Vue) {
    Object.keys(Components).forEach((k) => {
      Vue.component(Components[k].name, Components[k])
    })
  }
}

// Export as a plugin
export default plugin
