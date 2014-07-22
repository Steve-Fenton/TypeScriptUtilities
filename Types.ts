export class NonIntegerError implements Error {
	public name = 'NotIntegerError';
	
	constructor(public message: string) {
	}
	
	toString() {
		return this.name + ': ' + this.message;
	}
}

export class Int {
	public value: number;
	
	constructor(input: number) {
		this.checkInteger(input);
		this.value = Math.round(input);
	}
	
	public plus(additional: Int) {
		var total = this.value + additional.value;
		return new Int(total);
	}
	
	public minus(subtraction: Int) {
		var total = this.value - subtraction.value;
		return new Int(total);
	}
	
	public times(multiplier: Int) {
		var total = this.value * multiplier.value;
		return new Int(total);
	}

	public between(divisor: Int) {
		var total = Math.round(this.value / divisor.value);
		return new Int(total);
	}
	
	public isInteger(input: number) {
		return (Math.round(input) === input);
	}
	
	public checkInteger(input: number) {
		if (!this.isInteger(input)) {
			throw new NonIntegerError('The value "' + input + '" is not an integer.');
		}
	}
}

export class SilentInt extends Int {
	constructor(input: number) {
		super(input);
	}
	
	public checkInteger(input: number) {
		if (!this.isInteger(input)) {
			console.log('The value "' + input + '" is not an integer.');
		}
	}
}
