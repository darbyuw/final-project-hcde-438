
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
        ]
    },
    {
        id: 2,
        text: 'You decide the cold is too much for you, so you stay inside to search for fish. Where would you like to search first?',
        options: [ 
            {
                text: "The living room.",
                nextText: 4
            },
            {
                text: "The kitchen.",
                nextText: 5
            }
        ]
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
                text: "Let's go through the fence gate to the alley instead.",
                nextText: 7
            }
        ]
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
                text: "Go back into the kitchen.",
                nextText: 5
            }
        ],
        fish: 1
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
        ]
    },
    {
        id: 6,
        text: "You jump up on the fence and peer into the neighbor's window. Inside, you see a delicious fish dinner on the table! As you try to climb in, you hear a noise. It's the neighbors dog! He spots you and starts barking loudly. You quickly run home, scared. You decide today is not the day for fish after all.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
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
        fish: 1
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
        fish: 1
    },
    {
        id: 9,
        text: ""
    }


]


export default textNotes;