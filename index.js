import FcTimeline from './lib/components/timeline/timeline'
import FcContainer from './lib/components/container/container'

// Export as individual components
export const Components = {
  FcTimeline,
  FcContainer,
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

export {
  FcTimeline,
  FcContainer
}