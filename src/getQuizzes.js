const index = require('./index.js')
const app = index.app

app.get('/quizzes', module.exports = (req, res) => {
	// mock quiz object
	const quiz =  {
		title: "Fragility of Happiness Scale",
		description: "How happy are you... really?",
		questions: [
			"Something might happen at any time and we could"
			+ "easily lose our happiness",
			"Happiness is fragile",
			"it is likely that our happiness could be reduced to unhappiness"
			+ "with a simple accident",
			"There is only a thin line between happiness and unhappiness"
		],
		minPerQuestion: 1,
		maxPerQuestion: 7,
		answerLegend:  ["Strongly disagree",
						"Somewhat disagree",
						"A little disagree",
						"Neither Agree or Disagree",
						"A little agree",
						"Somewhat agree",
						"Strongly agree"]
	}
    /// set array size
	const arraysize = 0;
	
	// create array to contain quiz objects
	const quizObjects = [quiz];

	// send array of quiz objects
	res.send(quizObjects);
})

