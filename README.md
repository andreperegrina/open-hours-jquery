![header](./header.png)

# Open Hours jQuery

Open hours is an extensible jQuery-based UI control. It's useful for business hours representation in card's, list's for places.

## Installation

All build files needed to use Open Hours can be found in the ["dist"](https://github.com/selectize/selectize.js/blob/master/dist) folder.

Open Hours is available at [cdnjs]().

- **dist/**

  - [open-hours-jquery.min.js]() — Without jquery

  - [open-hours-jquery.min.css]() — The whole style of the component

## Dependencies

* [jquery](https://github.com/jquery/jquery) (1.7 and greater)

## Usage

You need to add the `style` and `javascript` files:

```html
<script type="text/javascript" src="open-hours-jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="open-hours-jquery.min.css" />
```

First, you need to defined a div where the component we will render:

```html
<div id="openHour"></div>
```

then use the `openhours` function to initialize the component:

```javascript
$('#opehour').openhours({
      days: [
        {
          label: 'Sunday',
          start: undefined,
          end: undefined
        },
        {
          label: 'Monday',
          start: new Date(2018, 11, 24, 9, 30, 0),
          end: new Date(2018, 11, 24, 20, 30, 0)
        },
        {
          label: 'Tuesday',
          start: new Date(2018, 11, 24, 9, 30, 0),
          end: new Date(2018, 11, 24, 20, 30, 0)
        },
        {
          label: 'Wednesday',
          start: new Date(2018, 11, 24, 9, 30, 0),
          end: new Date(2018, 11, 24, 20, 30, 0)
        },
        {
          label: 'Thursday',
          start: new Date(2018, 11, 24, 9, 30, 0),
          end: new Date(2018, 11, 24, 20, 30, 0)
        },
        {
          label: 'Friday',
          start: new Date(2018, 11, 24, 9, 30, 0),
          end: new Date(2018, 11, 24, 20, 30, 0)
        },
        {
          label: 'Saturday',
          start: new Date(2018, 11, 24, 9, 30, 0),
          end: new Date(2018, 11, 24, 20, 30, 0)
        }]
});
```

This example will initialize the business hours at **9:30 AM to 8:30 PM** from `monday` to `saturday`, and closed the `sunday`

## License

 OpenHours for Android is released under the Apache License 2.0. See [LICENSE](https://github.com/andreperegrina/open-hours-jquery/blob/master/LICENSE.md) for details.