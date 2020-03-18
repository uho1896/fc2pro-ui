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

## Components


### fc-timeline
Simple timeline component, support vertical and horizontal layout.

- per component import
```javascript
import {FcTimeline} from 'fc2pro-ui'
Vue.component(FcTimeline.name, FcTimeline);
```
- doc
[fc-timeline](https://github.com/uho1896/fc2pro-ui/blob/master/doc/timeline.md)


### fc-container
Resizable container component made with Vue.js, support vertical and horizontal layout, with dragable line to resize alpha and beta part.

- per component import
```javascript
import {FcContainer} from 'fc2pro-ui'
Vue.component(FcContainer.name, FcContainer);
```
- doc
[fc-container](https://github.com/uho1896/fc2pro-ui/blob/master/doc/container.md)
