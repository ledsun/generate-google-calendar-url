# generate-google-calendar-url

Google Calendarに予定を追加するurlを生成します。

[![npm version](https://badge.fury.io/js/generate-google-calendar-url.svg)](http://badge.fury.io/js/generate-google-calendar-url)

## Usage
実行例
```js
generateUrl({
  start: new Date(2014, 10, 15, 10),
  end: new Date(2014, 10, 15, 18),
  title: '新しい予定',
  location: 'ここではないどこか',
  details: 'http://event.description.example.com/11234'
})
```
以下のurlを生成します。

http://www.google.com/calendar/event?action=TEMPLATE&text=%E6%96%B0%E3%81%97%E3%81%84%E4%BA%88%E5%AE%9A&dates=20141115T010000Z/20141115T090000Z&details=http://event.description.example.com/11234&location=%E3%81%93%E3%81%93%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A9%E3%81%93%E3%81%8B

## Setup

### For Node.js
Node.js 26以上が必要です。

インストール
```
npm install generate-google-calendar-url
```

実行例
```js
var generateUrl = require('generate-google-calendar-url')

generateUrl({
  start: new Date(2014, 11, 15, 10),
  end: new Date(2014, 11, 15, 18),
  title: '新しい予定',
  location: 'ここではないどこか',
  details: 'http://event.description.example.com/11234'
})
```

### For browser
インストール
```
npm install generate-google-calendar-url
```

htmlにscriptタグを埋め込みます。以下は `node_modules` と同じディレクトリにHTMLを置く場合の例です。公開時には必要なJavaScriptファイルを配信先にコピーし、パスを調整してください。
```html
<script src="node_modules/moment/moment.js"></script>
<script src="node_modules/generate-google-calendar-url/generate-google-calendar-url.js"></script>
<script>
console.log(generateUrl({
  start: new Date(2014, 11, 15, 10),
  end: new Date(2014, 11, 15, 18),
  title: '新しい予定',
  location: 'ここではないどこか',
  details: 'http://event.description.example.com/11234'
}));
</script>
```

## Parameters
### Supported
- text
- dates
- location
- details

### Unsupported
- trp
- sprop


## Contributing

contributeするには

1. Fork it.
1. Create a branch (git checkout -b my_function)
1. Commit your changes (git commit -am "Added My Function")
1. Push to the branch (git push origin my_function)
1. Open a Pull Request
1. Enjoy a refreshing coffe and wait

### Testing
Node.jsで実行
```
npm install
npm test
```
