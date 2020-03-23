import FcTimeline from './lib/components/timeline/timeline'
import FcContainer from './lib/components/container/container'
import FcLoadmore from './lib/components/loadmore/loadmore'

// Export as individual components
export const Components = {
  FcTimeline,
  FcContainer,
  FcLoadmore,
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
  FcContainer,
  FcLoadmore
}