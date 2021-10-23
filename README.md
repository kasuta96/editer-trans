# Translation tool for EditerJs

[Editer.js](https://editorjs.io/)

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    trans: Trans,
  },

  ...
});
```

Or

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    trans: {
      class: Trans,
      inlineToolbar: true,
    },
  },

  ...
});
```

## output data

```json
{
  "type": "quote",
  "data": {
    "original": "The unexamined life is not worth living.",
    "translation": "Cuộc sống không bị thử thách không đáng sống.",
    "option": "paragraph"
  }
}
```
