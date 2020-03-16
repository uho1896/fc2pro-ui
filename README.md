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

### per component import
```javascript
import {FcTimeline} from 'fc2pro-ui'
Vue.component(FcTimeline.name, FcTimeline);
```