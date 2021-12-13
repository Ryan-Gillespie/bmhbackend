

module.exports = (req, res) => {
	// mock quiz object
	const quiz =  [
	   {
		   title: "Imposter Syndrome",
		   description: "Do you have Imposter characteristics? Take this assessment and let find out.",
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
			   "40: Few Imposter characterisics", "60: Moderate IP experiences", "80: Frequently has Imposter feelings",
			   "100: Intense IP experiences"
		   ]
	   },
	   {
	    title: "Abandonment Core Belief",
		description: "Abandonment core belief is a perceived instability or unreliability of those on whom you relied for support and connection." + 
		"It involves the belief that the significant person or people in your life will not be able to provide emotional support, connection, or" + 
		"because they are emotionally unstable and unpredictable, unreliable, or erratically present, and/or will die or abandon you for someone else.",
		questions: [
			"I worry a lot that the people I love will die or leave me.",
			"I cling to people because I am afraid they will leave me.",
			"I do not have a stable base of support.",
			"I keep falling in love with people who cannot be there for me in a committed way.",
			"Poople have always come and gone in my life.",
			"I get desperate when someone I love pulls away.",
			"I get so obsessed with the idea that my lovers will leave me that I drive them away.",
			"The people closest to me are unpredictable. One minute they are there for me and the next minute they are gone.",
			"I need other people too much.",
			"In the end I will be alone."
		],
		minPerQuestion: 1,
		maxPerQuestion: 6,
		answerLegend: [
			"Completely untrue of me", 
			"mostly untrue of me",
			"slightly more true that untrue of me",
			"moderately true of me",
			"mostly true of me",
			"describes me perfectly"
		],
		scoreKey: [
			"19: You probably don't have this core belief", "29: This core belief may apply to you only occassionally",
			"39: This core belief is an issue in your life.", "49: This is definitely an important core belief for you.",
			"60: This is a pwrful core belief for you."
		]
    },
	{
		title: "Test Anxiety",
		description: "Is test taking painful? Use this assessment to figure out if you experiencem mild or severe case of test anxiety.",
		questions: [
			"I have visible signs of nervousness such as sweaty palms, shaky hands, and so on right before a test.",
			"I have 'butterflies' in my stomach before a test.",
			"I feel nauseated before a test.",
			"I read through the test and feel that I do no know any of the answers.",
			"I panic before and during a test.",
			"My mind goes blank during a test.",
			"I remember th information that I blanked once I get out of the testing situtation.",
			"I have trouble sleeping the night before a test.",
			"I make mistakes on easy questions or put answers int he wrong places.",
			"I have trouble choosing answers."
		],
		minPerQuestion: 1,
		maxPerQuestion: 5,
		scoreKey: [
			"19: You suffer from test anxiety. In fact if your score was close to 10, a little more anxiety may be healthy to" + 
			"keep you focused and to get your blood flowing during exams.",
			"35: Although you exhibit some of the characteristics of test anxiety, the level of stress and tension is probably healthy.",
			"50: You are experiencing an unhealthy level of anxiety. You should evaluate the reasons for the stress and identify strategies" + 
			"for compensating."
		]
	}
	   
	]
    /// set array size
	const arraysize = 0;

	// send array of quiz objects
	res.send(quiz);
};

