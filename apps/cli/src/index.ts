#!/usr/bin/env bun

import { confirm, intro, outro, select, text } from "@clack/prompts";
import pc from "picocolors";

async function main() {
	console.clear();

	intro(pc.bgBlue(pc.white(" wrikka cli ")));

	const action = await select({
		message: "What would you like to do?",
		options: [
			{ label: "Greet someone", value: "greet" },
			{ label: "Perform a calculation", value: "calculate" },
			{ label: "Get system information", value: "info" },
			{ label: "Quit", value: "quit" },
		],
	});

	if (typeof action === "symbol") {
		outro(pc.red("Operation cancelled"));
		process.exit(0);
	}

	switch (action) {
		case "greet":
			await handleGreeting();
			break;
		case "calculate":
			await handleCalculation();
			break;
		case "info":
			await handleInfo();
			break;
		case "quit":
			outro(pc.green("Goodbye!"));
			process.exit(0);
	}

	// Ask if user wants to continue
	const continueUsing = await confirm({
		message: "Would you like to do something else?",
	});

	if (typeof continueUsing === "symbol" || !continueUsing) {
		outro(pc.green("Goodbye!"));
		process.exit(0);
	}

	// Restart the main menu
	main();
}

async function handleGreeting() {
	const name = await text({
		message: "What is your name?",
		placeholder: "user",
		validate: (value) => {
			if (!value) return "Please enter your name";
		},
	});

	if (typeof name === "symbol") {
		outro(pc.red("Operation cancelled"));
		return;
	}

	const greetingType = await select({
		message: "What type of greeting?",
		options: [
			{ label: "Hello", value: "hello" },
			{ label: "Hi", value: "hi" },
			{ label: "Hey", value: "hey" },
		],
	});

	if (typeof greetingType === "symbol") {
		outro(pc.red("Operation cancelled"));
		return;
	}

	const greetings = {
		hello: `Hello, ${name}! Nice to meet you!`,
		hey: `Hey, ${name}! What's up?`,
		hi: `Hi there, ${name}! How are you today?`,
	};

	outro(pc.green(greetings[greetingType as keyof typeof greetings]));
}

async function handleCalculation() {
	const operation = await select({
		message: "What type of calculation?",
		options: [
			{ label: "Addition", value: "add" },
			{ label: "Subtraction", value: "subtract" },
			{ label: "Multiplication", value: "multiply" },
			{ label: "Division", value: "divide" },
		],
	});

	if (typeof operation === "symbol") {
		outro(pc.red("Operation cancelled"));
		return;
	}

	const num1Str = await text({
		message: "Enter first number:",
		validate: (value) => {
			if (!value || isNaN(Number(value))) return "Please enter a valid number";
		},
	});

	if (typeof num1Str === "symbol") {
		outro(pc.red("Operation cancelled"));
		return;
	}

	const num1 = Number(num1Str);

	const num2Str = await text({
		message: "Enter second number:",
		validate: (value) => {
			if (!value || isNaN(Number(value))) return "Please enter a valid number";
		},
	});

	if (typeof num2Str === "symbol") {
		outro(pc.red("Operation cancelled"));
		return;
	}

	const num2 = Number(num2Str);

	let result: number;
	switch (operation) {
		case "add":
			result = num1 + num2;
			break;
		case "subtract":
			result = num1 - num2;
			break;
		case "multiply":
			result = num1 * num2;
			break;
		case "divide":
			if (num2 === 0) {
				outro(pc.red("Error: Division by zero"));
				return;
			}
			result = num1 / num2;
			break;
		default:
			outro(pc.red("Invalid operation"));
			return;
	}

	outro(
		pc.green(
			`Result: ${num1} ${getOperatorSymbol(operation)} ${num2} = ${result}`,
		),
	);
}

function getOperatorSymbol(operation: string): string {
	const symbols: Record<string, string> = {
		add: "+",
		divide: "÷",
		multiply: "×",
		subtract: "-",
	};
	return symbols[operation] || "?";
}

async function handleInfo() {
	const infoType = await select({
		message: "What information would you like?",
		options: [
			{ label: "Platform Info", value: "platform" },
			{ label: "Version Info", value: "versions" },
			{ label: "Environment Variables", value: "env" },
		],
	});

	if (typeof infoType === "symbol") {
		outro(pc.red("Operation cancelled"));
		return;
	}

	switch (infoType) {
		case "platform": {
			outro(
				pc.green(
					`Platform: ${process.platform}\nArchitecture: ${process.arch}`,
				),
			);
			break;
		}
		case "versions": {
			outro(
				pc.green(
					`Node.js Version: ${process.version}\nBun Version: ${process.versions.bun || "Not available"}`,
				),
			);
			break;
		}
		case "env": {
			const envCount = Object.keys(process.env).length;
			outro(
				pc.green(
					`Environment Variables Count: ${envCount}\nCurrent Directory: ${process.cwd()}`,
				),
			);
			break;
		}
	}
}

main().catch(console.error);
