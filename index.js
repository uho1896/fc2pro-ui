import FcTimeline from './lib/components/timeline/timeline'
import FcContainer from './lib/components/container/container'
import FcLoadmore from './lib/components/loadmore/loadmore'
import FcFullscreen from './lib/components/fullscreen/fullscreen'

const Components = {
  FcTimeline,
  FcContainer,
  FcLoadmore,
  FcFullscreen,
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

// Export as individual components
export {
  FcTimeline,
  FcContainer,
  FcLoadmore,
  FcFullscreen
}