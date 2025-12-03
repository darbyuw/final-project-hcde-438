/**
 * This is the array strucutre that includes all the the descriptions, options, and indicies of the game. 
 * Each object in the array holds an id (number), text (String), options (array of text and index of the next location 
 * to be used for each button in the game), and a cateogry indicating the type of quote that should be fetched at that locaiton. 
 */
const textNotes = [
    {
        id: 1,
        text: 'You wake from your nap and are hungry. A nice fish would be the perfect snack! Would you like to leave the house or stay inside to look for food?',
        options: [
            {
                text: "I'll go outside.",
                nextText: 3
            },
            {
                text: "I'll stay inside.",
                nextText: 2
            }
        ],
        category: "life"
    },
    {
        id: 2,
        text: 'You decide the cold is too much for you, so you stay inside to search for fish. Where would you like to search?',
        options: [ 
            {
                text: "The living room.",
                nextText: 4
            },
            {
                text: "The kitchen.",
                nextText: 5
            },
            {
                text: "I changed my mind, I'll go outside.",
                nextText: 3
            }
        ],
        category: "inspirational"
    },
    {
        id: 3,
        text: "You decide you're better off finding fish outside, so you leave through the cat door to the backyard. Entering the yard, you see light coming from the neighbors house. Their window is level with the fence. Should you check out the neighbors house for food?",
        options: [
            {
                text: "I'll hop on the fence and go in the window!",
                nextText: 6
            },
            {
                text: "I'll go through the fence gate to the alley instead.",
                nextText: 7
            },
            {
                text: "I changed my mind, I'll go back inside.",
                nextText: 2
            }
        ],
        category: "freedom"
    },
    {
        id: 4,
        text: "You enter the living room and catch sight of the fish tank sitting on a shelf. Jumping on the nearby couch, you reach a paw inside and grab a fish. Yum! Turning around you see the door to the basement cracked open. Where would you like to go next?",
        options: [
            {
                text: "Go down the basement stairs.",
                nextText: 8
            },
            {
                text: "Go into the kitchen.",
                nextText: 5
            }
        ],
        fish: 1,
        category: "success"
    },
    {
        id: 5,
        text: "You enter the kitchen and smell something cooking on the stovetop. You glance at the cabinet where you know the canned fish is kept. Would you like to investigate the stove or the cabinet?",
        options: [
            {
                text: "Check out the stove.",
                nextText: 9
            },
            {
                text: "Look in the cabinet.",
                nextText: 10
            }
        ],
        category: "leadership"
    },
    {
        id: 6,
        text: "You jump up on the fence and peer into the neighbor's window. Inside, you see a delicious fish dinner on the table! As you try to climb in, you hear a noise. It's the neighbors dog! He spots you and starts barking loudly. You quickly run home, scared. You decide today is not the day for fish after all.",
        options: [
            {
                text: "You got scared: Restart",
                nextText: -1
            }
        ],
        category: "time"
    },
    {
        id: 7,
        text: "Outside the fence is a creek running down the street. There's a fish swimming in the creek! You scoop it up and enjoy it. Yum! What is your next move?",
        options: [
            {
                text: "Go back inside and search the house",
                nextText: 2
            },
            {
                text: "Walk down the street towards the pond",
                nextText: 11,
            },
        ],
        fish: 1,
        category: "success"
    },
    {
        id: 8,
        text: "You jump down the stairs into the basement. Walking among the shelves of stored food, you follow your nose towards the smell of fish. You find a can of tuna! You open it and enjoy a tasty snack. Yum! What would you like to do next?",
        options: [
            {
                text: "Go back upstairs to the kitchen.",
                nextText: 5
            }
        ],
        fish: 1,
        category: "success"
    },
    {
        id: 9,
        text: "Jumping up onto the stovetop, you see a fish simmering in a pan. You snag it with a paw and eat it. Yum! After your snack, you notice the back door is open. Where would you like to go next?",
        options: [
            {
                text: "Go outside to the backyard.",
                nextText: 3
            },
            {
                text: "Look in the kitchen cabinet.",
                nextText: 10
            }
        ],
        fish: 1,
        category: "success"
    },
    {
        id: 10,
        text: "You hop onto the counter and paw at the cabinet until it opens. Inside your senses immedietly alert you to an amazing smell. You bat a small bag out of the cabinet and it bursts open on the floor. Catnip! You roll around in it happily for a while. Wait, what were you looking for again? Oh well, time for a nap.",
        options: [
            {
                text: "You got distracted: Restart",
                nextText: -1
            }
        ], 
        category: "time"
    },
    {
        id: 11,
        text: "You walk down the alley towards the small neighborhood pond. Sundenlly, another cat rounds the corner! It looks like they are headed for the pond too. Do you want to fight them or run towards the pond?",
        options: [
            {
                text: "Fight the other cat.",
                nextText: 12
            },
            {
                text: "Run to the pond.",
                nextText: 13
            }
        ], 
        category: "courage"
    },
    {
        id: 12,
        text: "Facing the unknown cat you stand to your fullest height and arch your back. The other cat hisses and takes a swipe at you. You lunch for their ear and suddenly you're both tumbling down the alley. After a few moments of scratching, you both stop and stare at each other before running off in opposite directions. Back at your house, you feel like you forgot something. Maybe you'll remember after a nap.",
        options: [
            {
                text: "You got distracted: Restart",
                nextText: -1
            }
        ], 
        category: "freedom"
    },
    {
        id: 13,
        text: "Ignoring the other cat, you dash to the pond. The rain drizzles on your fur as you pad out onto the small wodden dock. Peering over the edge, you notice the rain brought all the fish to the top of the water! Waiting until the timing is right, you quickly swipe a paw into the water. Repeating this tactic you manage to grab three fish! Yum! Finally satisfied, you head home for a long nap.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ],
        fish: 3, 
        category: "success"
    }
];
        
export default textNotes;