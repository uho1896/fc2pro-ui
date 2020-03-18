# fc-container
Resizable container component made with Vue.js, support vertical and horizontal layout, with dragable line to resize alpha and beta part.

## Options
A set of custom options can be set to control the container.

```javascript
props: {
  direction: {type: String, default: 'vertical'}, // direction, vertical/horizontal
  minAlpha: {type: Number, default: 10}, // min size of alpha part, 10 for 10%
  minBeta: {type: Number, default: 10}, // min size of beta part, 10 for 10%
  line: {type: Object, default: () => ({
    weight: '3px', // line weight
    color: '#F7941D', // line color
    position: 50, // line init position
  })},
}
```

## Usage

```javascript
<fc-container direction="horizontal" class="horizontal">
  <template v-slot:alpha><div>alpha</div></template>
  <template v-slot:beta>
    <fc-container direction="vertical" class="inner-vertical">
      <template v-slot:alpha><div>alpha</div></template>
      <template v-slot:beta><div>beta</div></template>
    </fc-container>
  </template>
</fc-container>
```
