import jQuery from 'jquery';

(function ($) {
  var $parent;
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var options = {
    day: 1,
    currentTime: new Date(),
    days: [
      {
        label: 'Sunday',
        start: new Date(),
        end: new Date()
      },
      {
        label: 'Monday',
        start: new Date(),
        end: new Date()
      },
      {
        label: 'Tuesday',
        start: new Date(),
        end: new Date()
      },
      {
        label: 'Wednesday',
        start: new Date(),
        end: new Date()
      },
      {
        label: 'Thursday',
        start: new Date(),
        end: new Date()
      },
      {
        label: 'Friday',
        start: new Date(),
        end: new Date()
      },
      {
        label: 'Saturday',
        start: new Date(),
        end: new Date()
      }
    ],
    labels: {
      closed: 'Closed'
    }
  };

  function isValid(value) {
    return value != null && value !== undefined;
  }

  function createView() {
    const openHourParent = $('<div class="open-hour"></div>');
    const openHourText = $('<div class="open-hour-text"></div>');

    const svgCaretUp = $('<svg aria-hidden="true" data-prefix="fas" data-icon="caret-up" ' +
      'class="svg-inline--fa fa-caret-up fa-w-10" role="img" ' +
      '     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"></svg>');
    const newElementCaretUp = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    newElementCaretUp.setAttribute('d', 'M288.662 352H31.338c-17.818 ' +
      ' 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 ' +
      ' 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z');
    newElementCaretUp.setAttribute('fill', 'currentColor');
    svgCaretUp.append(newElementCaretUp);
    const svgCaretDown = $('<svg aria-hidden="true" data-prefix="fas" data-icon="caret-down" ' +
      'class="svg-inline--fa fa-caret-down fa-w-10" role="img" ' +
      '     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"></svg>');
    const newElementCaretDown = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    newElementCaretDown.setAttribute('d', 'M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 ' +
      ' 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z');
    newElementCaretDown.setAttribute('fill', 'currentColor');
    svgCaretDown.append(newElementCaretDown);

    openHourText.append($('<span class="open-hour-text-label">Open until:</span>'));
    openHourText.append($('<span class="caret-up"></span>').append(svgCaretUp));
    openHourText.append($('<span class="caret-down"></span>').append(svgCaretDown));
    openHourParent.append(openHourText);

    const openHourTable = $('<div class="open-hour-table"></div>');
    const table = $('<table></table>');

    options.days.forEach(function (day, index) {
      const active = options.day === index ? 'active' : '';
      const dayOfWeek = daysOfWeek[index].toLowerCase();
      const value = isValid(day.start) && isValid(day.end) ? day.start.getHours() + ':' + day.start.getMinutes() +
        ' - ' +
        day.end.getHours() + ':' + day.end.getMinutes() : options.labels.closed;

      const templateRow = $('<tr class="' + dayOfWeek + ' ' + active + '"></tr>');
      const templateRowColumnLabel = $('<td id="' + dayOfWeek + '-label" class="open-hour-day-label"></td>');

      templateRowColumnLabel.text(day.label);
      const templateRowColumnValue = $('<td id="' + dayOfWeek + '-value" class="open-hour-day-value"></td>');

      templateRowColumnValue.text(value);
      templateRow.append(templateRowColumnLabel);
      templateRow.append(templateRowColumnValue);
      table.append(templateRow);
    });

    openHourTable.append(table);
    openHourParent.append(openHourTable);
    return openHourParent;
  }

  function createEvents(view, $this) {
    $this.toogle = function () {
      if (view.hasClass('table-visible')) {
        view.removeClass('table-visible');
      } else {
        view.addClass('table-visible');
      }
    };
  }

  function defineCurrentTime(time) {
    options.currentTime = new Date();

    if (time != null) {
      options.currentTime.setHours(time.getHours());
      options.currentTime.setMinutes(time.getMinutes());
    }
  }

  function getCurrentTime(time) {
    const currentTime = new Date();

    if (time != null) {
      currentTime.setHours(time.getHours());
      currentTime.setMinutes(time.getMinutes());
    }
    return currentTime;
  }

  function getStart() {
    return options.days[options.day].start;
  }

  function getEnd() {
    return options.days[options.day].end;
  }

  function renderOpenText($this) {
    const businessDay = options.days[options.day];

    if ($this.isOpen()) {
      $parent.find('.open-hour-text-label').text('Open until: ' +
        businessDay.end.getHours() + ':' + businessDay.end.getMinutes()).addClass('open');
    } else if ($this.isClosed()) {
      $parent.find('.open-hour-text-label').text('Closed since: ' +
        businessDay.end.getHours() + ':' + businessDay.end.getMinutes()).addClass('closed');
    } else {
      $parent.find('.open-hour-text-label').text('Open at: ' +
        businessDay.start.getHours() + ':' + businessDay.start.getMinutes()).addClass('open-at');
    }
  }

  function setCurrentTimeAfterView(time) {
    defineCurrentTime(time);
    options.day = options.currentTime.getDay();
  }

  function createMethods(view, $this) {
    $this.setCurrentTime = function (time) {
      setCurrentTimeAfterView(time);
      const dayOfWeek = daysOfWeek[options.day].toLowerCase();

      renderOpenText($this);
      $parent.find('.active').removeClass('active');
      $parent.find('.' + dayOfWeek).addClass('active');

    };

    $this.isOpen = function (time) {
      const currentTimeNew = time == null ? options.currentTime : getCurrentTime(time);
      const start = getStart();
      const end = getEnd();

      return currentTimeNew > start && currentTimeNew < end;
    };
    $this.isNotOpenYet = function (time) {
      const currentTimeNew = time == null ? options.currentTime : getCurrentTime(time);
      const start = getStart();

      return currentTimeNew < start;
    };
    $this.isClosed = function (time) {
      const currentTimeNew = time == null ? options.currentTime : getCurrentTime(time);
      const end = getEnd();

      return currentTimeNew > end;
    };
  }

  function setValues(newOptions) {
    if (newOptions) {
      setCurrentTimeAfterView(isValid(newOptions.currenTime) ? newOptions.currenTime : new Date());
      if (isValid(newOptions.days) && Array.isArray(newOptions.days)) {
        newOptions.days.forEach(function (value, index) {
          let valueCopy = Object.assign({}, value);

          if (isValid(value.start)) {
            valueCopy.start = new Date();
            valueCopy.start.setHours(value.start.getHours());
            valueCopy.start.setMinutes(value.start.getMinutes());
          }
          if (isValid(value.end)) {
            valueCopy.end = new Date();
            valueCopy.end.setHours(value.end.getHours());
            valueCopy.end.setMinutes(value.end.getMinutes());
          }
          options.days[index] = valueCopy;
        });
      }
    }
  }

  $.fn.openhours = function (newOptions) {
    setValues(newOptions);
    const view = createView();

    createEvents(view, this);
    createMethods(view, this);
    $parent = view;
    this.append(view);
    renderOpenText(this);
    return this;
  };

}(jQuery));
