import { useState } from 'react';

import './Calc.css';
const Calc = () => {
  const [display, setDisplay] = useState('0')
  const [values, setValues] = useState<string[]>(['0'])

  const buttons = [
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '+', value: '+' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '-', value: '-' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '*', value: '*' },
    { label: '0', value: '0' },
    { label: '/', value: '/' },
    { label: '.', value: '.' },
    { label: '=', value: '=' },
  ]

  const onClickButton = (value: string) => () => {
    if (!validateValue(value)) {
      setDisplay('Error')
      setValues(['0'])
      return
    }
    if (value === '=') {
      if (values.length === 1 && isNumber(values[0])) {
        return
      }
      if (values.length < 3) {
        setDisplay('Error')
        setValues(['0'])
        return
      }
      let result = [...values];
      while (result.length >= 3) {
        result = reduceValues(result)
      }
      setDisplay(result[0])
      setValues(result)
      return
    }

    if ((display === '0' || display === 'Error') && isNumber(value)) {
      setDisplay(value)
      addValues(value)
      return
    }
    setDisplay(display + value)
    addValues(value)
  }

  const validateValue = (value: string) => {
    if (values.length === 0) {
      return true
    }
    const lastValue = values[values.length - 1]
    if (isDot(lastValue) && !isNumber(value)) {
      return false
    }
    if (isCalcOperation(lastValue) && !isNumber(value)) {
      return false
    }
    if (lastValue.includes('.') && isDot(value)) {
      return false
    }
    return true
  }

  const addValues = (value: string) => {
    const lastValue = values[values.length - 1]
    if (isNumberOrDot(lastValue) && isNumberOrDot(value)) {
      setValues([...values.slice(0, values.length - 1), lastValue + value])
      return
    }

    let newValues = [...values]
    if (isCalcOperation(value) && values.length >= 3 && (values[values.length - 2] === '*' || values[values.length - 2] === '/')) {
      newValues = reduceValues(values)
    }
    if (newValues.length >= 3 && (value === '+' || value === '-')) {
      newValues = reduceValues(newValues)
    }

    setValues([...newValues, value])
  }

  const reduceValues = (ary: string[]): string[] => {
      const result = calc(ary[ary.length - 3], ary[ary.length - 2], ary[ary.length - 1])
      return [...ary.slice(0, ary.length - 3), result]
  }

  const calc = (value1: string, operation: string, value2: string):string => {
    if (operation === '+') {
      return String(Number(value1) + Number(value2))
    }
    if (operation === '-') {
      return String(Number(value1) - Number(value2))
    }
    if (operation === '*') {
      return String(Number(value1) * Number(value2))
    }
    if (operation === '/') {
      return String(Number(value1) / Number(value2))
    }
    return '0'
  }

  const isDot = (value: string) => {
    return value === '.'
  }

  const isCalcOperation = (value: string) => {
    return ['+', '-', '*', '/'].includes(value)
  }

  const isNumberOrDot = (value: string) => {
    return isNumber(value) || value === '.'
  }

  const isNumber = (value: string) => {
    return !isNaN(Number(value))
  }

  const onClickClear = () => {
    setDisplay('0')
    setValues(['0'])
  }

  return (
    <div className="calc">
      <div className="display-area">
        {display}
      </div>
      <div className="operation-buttons-area">
        {buttons.map(({ label, value }) => (
          <button key={label} value={value} onClick={onClickButton(value)}>
            {label}
          </button>
        ))}
      </div>
      <div className="clear-button-area">
        <button onClick={onClickClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Calc;
