import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [expression, setExpression] = useState("0");

  const handleNumberClick = (num) => {
    if (expression === "0") {
      setExpression(num.toString());
    } else {
      setExpression(expression + num.toString());
    }
  };

  const handleOperatorClick = (op) => {
    setExpression(expression + op);
  };

  const handleDecimalClick = () => {
    if (
      !isNaN(expression.slice(-1)) &&
      !expression.match(/\d+(\.\d+)?$/)[0].includes(".")
    ) {
      setExpression(expression + ".");
    }
  };

  const handleClearClick = () => {
    setExpression("0");
  };

  const handleEqualsClick = () => {
    try {
      const result = Math.round(eval(expression) * 10000) / 10000;
      setExpression(result.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="calculator">
      <div id="display">{expression}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClearClick}>
          AC
        </button>
        <button id="divide" onClick={() => handleOperatorClick("/")}>
          /
        </button>
        <button id="multiply" onClick={() => handleOperatorClick("*")}>
          *
        </button>
        <button id="seven" onClick={() => handleNumberClick(7)}>
          7
        </button>
        <button id="eight" onClick={() => handleNumberClick(8)}>
          8
        </button>
        <button id="nine" onClick={() => handleNumberClick(9)}>
          9
        </button>
        <button id="subtract" onClick={() => handleOperatorClick("-")}>
          -
        </button>
        <button id="four" onClick={() => handleNumberClick(4)}>
          4
        </button>
        <button id="five" onClick={() => handleNumberClick(5)}>
          5
        </button>
        <button id="six" onClick={() => handleNumberClick(6)}>
          6
        </button>
        <button id="add" onClick={() => handleOperatorClick("+")}>
          +
        </button>
        <button id="one" onClick={() => handleNumberClick(1)}>
          1
        </button>
        <button id="two" onClick={() => handleNumberClick(2)}>
          2
        </button>
        <button id="three" onClick={() => handleNumberClick(3)}>
          3
        </button>
        <button id="equals" onClick={handleEqualsClick}>
          =
        </button>
        <button id="zero" onClick={() => handleNumberClick(0)}>
          0
        </button>
        <button id="decimal" onClick={handleDecimalClick}>
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
