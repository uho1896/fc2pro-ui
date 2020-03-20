# fc-loadmore
Loadmore component made with Vue.js, drag up or down to load more content.

## Options
A set of custom options can be set to control the loadmore.

```javascript
props: {
  topMethod: {type: Function}, // async/promise top load method
  topHeight: {type: Number, default: 50}, // drag distance to trig top load method, default 50px
  bottomMethod: {type: Function}, // async/promise bottom load method
  bottomHeight: {type: Number, default: 50}, // drag distance to trig bottom load method, default 50px
  allLoaded: {type: Boolean, default: false}, // indicate if all content loaded
  autoFill: {type: Boolean, default: true}, // auto fill content when init
  distanceIndex: {type: Number, default: 2}, // distance calculation factor
  maxDistance: {type: Number, default: 0}, // max drag distance
  bottomOffset: {type: Number, default: 10}, // bottom offset to check if bottom is reached
}
```

## Usage

```javascript
<fc-loadmore
  :topMethod="topMethod"
  :bottomMethod="bottomMethod"
  :allLoaded="data.length > 20"
>
  <div v-for="d in data" :key="d" style="height: 100px;">{{d}}</div>
</fc-loadmore>
```
