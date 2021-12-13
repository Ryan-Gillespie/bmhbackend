

module.exports = (req, res) => {
	// mock quiz object
	const quiz =  [
	   {
		   title: "Imposter Syndrome",
		   description: "Do you have Imposter characteristics?",
		   questions: [
			   "I have often succeeded on a test or task even though I was afraid that I would not do well before i undertook the task",
			   "I can give the impression that I'm more competent than I really am.",
			   "I avoid evaluation if possible and have dread of others evaluating me.",
			   "When people praise me for something I've accomplished, I'm afraid I won't be able live up to their expectations of me in the future",
			   "I sometimes think I obtained my present position or gained my present success because I happened to be in the right place at the right time"+
			   "or knew the right people.",
			   "I'm afraid people important to me may find out that I'm not as capable as they think I am.",
			   "I tend to remember th incidents in which I have not done my best more than those times I have done my best.",
			   "I rarely do a project or task well as I'd like to do it.",
			   "Sometimes I feel or believe that my success in my life or in my job has been the result of some kind of error.",
			   "It's hard for me to accept compliments or praise about my intelligence or accomplishments.",
			   "At times, i feel my sucess has been due to some kind of luck.",
			   "I'm disappointed at times in my present accomplishemnts and think I should have accomplished much more.",
			   "Sometimes I'm afraid others will discover how much knowledge or ability I really lack.",
			   "I'm often afraid that I may fail at a new assignment or undertaking even though I generally do well at what I attempt.",
			   "When I've succeeded at something and received recognition for my accomplishments, I have doubts that I can keep repeating that success.",
			   "If I receive a great deal of praise and recognition for something I've accomplished, I tend to discount the importance of what I've done.",
			   "I often compare my ability to those around me and think they may be more intelligent than I am.",
			   "I often worry about not succeeding with a project or examination, even though others around me have considerable confidence that I will do well.",
			   "If I'm going to receive a promotion or gain recognition of some kind, I hesitate to tell others until it is an accomplished fact.",
			   "I feel bad and discourages if I'm not 'the best' or at least 'very special' in situations that involve achievement."
		   ],
		   minPerQuestion: 1, //not at all true
		   maxPerQuestion: 5, //very true
		   answerLegend: [
				"not at all true",
				"rarely",
				"sometimes",
				"often",
				"very true"
		   ],
		   scoreKey: [
			   "40:few imposter characterisics", "60:moderate IP experiences", "80: frequently has imposter feelings",
			   "100: intense IP experiences"
		   ]
	   }
	]
    /// set array size
	const arraysize = 0;
	
	// create array to contain quiz objects
	const quizObjects = [quiz];

	// send array of quiz objects
	res.send(quizObjects);
};

