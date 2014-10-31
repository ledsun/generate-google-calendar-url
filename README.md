# generate-google-calendar-url

Google Calendarに予定を追加するurlを生成します。

## Usage

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
以下のurlを生成します。

http://www.google.com/calendar/event?action=TEMPLATE&text=%E6%96%B0%E3%81%97%E3%81%84%E4%BA%88%E5%AE%9A&dates=20141115T010000Z/20141115T090000Z&details=http://event.description.example.com/11234&location=%E3%81%93%E3%81%93%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A9%E3%81%93%E3%81%8B


## Setup

```
npm install git@github.com:ledsun/generate-google-calendar-url.git
```

## Contributing

contributeしたいっすか？まじやべっすー！

1. Fork it.
1. Create a branch (git checkout -b my_function)
1. Commit your changes (git commit -am "Added My Function")
1. Push to the branch (git push origin my_function)
1. Open a Pull Request
1. Enjoy a refreshing Redbull and wait

### Testing
```
npm install
npm test
```
