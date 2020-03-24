# fc2pro-ui
Simple component made with Vue.js, some uncommon components.

## Install
```javascript
npm install fc2pro-ui --save

or

yarn add fc2pro-ui
```

## Import

### total import
```javascript
import Fc2ProUI from 'fc2pro-ui'
Vue.use(Fc2ProUI);
```

### per component import
```javascript
import {FcTimeline} from 'fc2pro-ui'
Vue.component(FcTimeline.name, FcTimeline);
```

## Components
|Component|platform|
|:---|:---|
|[fc-container](https://github.com/uho1896/fc2pro-ui/blob/master/doc/container.md)|PC|
|[fc-fullscreen](https://github.com/uho1896/fc2pro-ui/blob/master/doc/fullscreen.md)|All|
|[fc-loadmore](https://github.com/uho1896/fc2pro-ui/blob/master/doc/loadmore.md)|Mobile|
|[fc-timeline](https://github.com/uho1896/fc2pro-ui/blob/master/doc/timeline.md)|All|
