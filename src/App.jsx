import { useState } from 'react';

const App = () => {
	const [previousOperand, setPreviousOperand] = useState('');
	const [currentOperand, setCurrentOperand] = useState('0');

	const handleButtonClick = value => {
		if (value === 'AC') {
			setPreviousOperand('');
			setCurrentOperand('0');
		} else if (value === 'DEL') {
			setCurrentOperand(prev => (prev.length > 1 ? prev.slice(0, -1) : '0')); // Asegurarse de que siempre haya al menos un '0'
		} else if (value === '=') {
			try {
				const result = eval(previousOperand + currentOperand).toString();
				setPreviousOperand('');
				setCurrentOperand(result);
			} catch (error) {
				setPreviousOperand('');
				setCurrentOperand('Error');
			}
		} else if (['+', '-', '*', '÷'].includes(value)) {
			// Si hay un resultado anterior, comienza una nueva operación con el resultado como el primer valor
			if (previousOperand) {
				setPreviousOperand(currentOperand + value);
			} else {
				setPreviousOperand(currentOperand + value);
				setCurrentOperand('0'); // Iniciar con '0' si no hay resultado anterior
			}
		} else {
			setCurrentOperand(prev => (prev === '0' ? value : prev + value)); // Reemplazar '0' con el valor pulsado
		}
	};

	const renderButtons = () => {
		const buttons = [
			'AC',
			'DEL',
			'÷',
			'7',
			'8',
			'9',
			'*',
			'4',
			'5',
			'6',
			'+',
			'1',
			'2',
			'3',
			'-',
			'.',
			'0',
			'='
		];
		return buttons.map(buttonValue => (
			<button
				key={buttonValue}
				className={
					buttonValue === 'AC' || buttonValue === '=' ? 'span-two' : ''
				}
				onClick={() => handleButtonClick(buttonValue)}
			>
				{buttonValue}
			</button>
		));
	};

	return (
		<div className='calculator-grid'>
			<div className='output'>
				<div className='previous-operand'>{previousOperand}</div>
				<div className='current-operand'>{currentOperand}</div>
			</div>

			{renderButtons()}
		</div>
	);
};

export default App;
