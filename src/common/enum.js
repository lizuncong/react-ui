/*
* 简单的枚举类
* */
class RUEnum {
  constructor(options) {
    Object.keys(options).forEach((key) => {
      const op = options[key];
      this[key] = op;
      if (op.value !== undefined) {
        this[op.value] = op;
      }
    });
  }

  getLabel(value) {
    const op = this[value] || { label: '' };
    return op.label;
  }

  get(value, key) {
    if (key === 'label') {
      return this.getLabel(value);
    }
    const op = this[value] || {};
    if (key === undefined) {
      return op;
    }
    return op[key] || '';
  }
}

export default RUEnum;
