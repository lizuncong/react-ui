import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

class CRangePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstSelectedDate: '', // 第一个选中的日期
    };
  }

  render() {
    // showTime={{ format: 'HH:mm' }}
    // format="YYYY-MM-DD HH:mm"
    const {
      className, ranges, onChange, start, end,
      showTime,
      format,
      disabledClear,
    } = this.props;
    const { firstSelectedDate } = this.state;
    const dateRange = ranges - 1;
    const value = start ? [moment(start), moment(end)] : [];
    return (
      <RangePicker
        allowClear={!disabledClear}
        showTime={showTime}
        format={format}
        className={className}
        value={value}
        placeholder={['开始日期', '结束日期']}
        disabledDate={(currentDate) => {
          if (!ranges || !firstSelectedDate || !currentDate) return false;
          return currentDate.diff(firstSelectedDate, 'days') > dateRange
                  || firstSelectedDate.diff(currentDate, 'days') > dateRange;
        }}
        onCalendarChange={(dates) => {
          if (dates && dates.length === 1) {
            this.setState({
              firstSelectedDate: dates[0],
            });
          }
        }}
        onChange={(dates, dateStrings) => {
          onChange && onChange(dateStrings);
        }}
        onOpenChange={(status) => {
          if (!status && firstSelectedDate) {
            this.setState({
              firstSelectedDate: '',
            });
          }
        }}
      />
    );
  }
}

export default CRangePicker;
