# generate-google-calendar-url

Google Calendarに予定を追加するurlを生成します。

## Usage
実行例
```js
generateUrl({
  start: new Date(2014, 11, 15, 10),
  end: new Date(2014, 11, 15, 18),
  title: '新しい予定',
  location: 'ここではないどこか',
  details: 'http://event.description.example.com/11234'
})
```
以下のurlを生成します。

http://www.google.com/calendar/event?action=TEMPLATE&text=%E6%96%B0%E3%81%97%E3%81%84%E4%BA%88%E5%AE%9A&dates=20141115T010000Z/20141115T090000Z&details=http://event.description.example.com/11234&location=%E3%81%93%E3%81%93%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A9%E3%81%93%E3%81%8B

## Setup

### For Node.js
インストール
```
npm install git://github.com/ledsun/generate-google-calendar-url.git
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
bower install git://github.com/ledsun/generate-google-calendar-url.git
```

htmlにscriptタグを埋め込みます。
```html
<script src="bower_components/generate-google-calendar-url"></script>
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

ブラウザで実行
```
npm install
bower install
open test/index.html
```
