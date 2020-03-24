# fc-fullscreen
Fullscreen component made with Vue.js, customizable fullscreen content.

## Options
A set of custom options can be set to control the fullscreen.

```javascript
props: {
  background: {type: String, default: '#333333'}, // background of fullscreen window
}
```

## Usage

```javascript
<fc-fullscreen>
  <img src="/favicon.ico" />
</fc-fullscreen>

<fc-fullscreen>
  <img src="/favicon.ico" />
  <div slot="fullscreen" class="fullscreen">fullscreen</div>
</fc-fullscreen>
```
