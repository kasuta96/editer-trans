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
      config: {
        originalPlaceholder: 'Enter a original',
        translationPlaceholder: 'Enter a translation',
      },
    },
  },
  
  ...
});
```


## output data
```json
{
    "type" : "quote",
    "data" : {
        "text" : "The unexamined life is not worth living.",
        "caption" : "Socrates",
        "alignment" : "left"
    }
}
```
