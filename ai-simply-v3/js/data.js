const themes = {
    chef: {
        id: 'chef',
        name: "The Master Chef 👨‍🍳",
        icon: "👨‍🍳",
        entity: "Master Chef",
        action: "cook",
        creation: "dish",
        source: "recipe book",
        ingredients: "ingredients",
        tool: "kitchen",
        prediction: "flavors",
        training_analogy: "reading every recipe book in the world",
        prompt_analogy: "ordering a meal",
        context_analogy: "workbench",
        zeroshot_example: "Simply ask the Chef 'Make me a burger' without showing any photos.",
        oneshot_example: "Show the Chef one photo of a burger and say 'Make this'.",
        multishot_example: "Show the Chef 3 photos of different burgers to explain exactly the style you want.",
        hallucination_analogy: "inventing a fruit that doesn't exist",
        modes: {
            seed: "Home Cook 🍳",
            grower: "Sous Chef 👨‍🍳",
            forester: "Executive Chef 🧑‍🍳"
        }
    },
    gardener: {
        id: 'gardener',
        name: "The Expert Gardener 🌻",
        icon: "🌻",
        entity: "Expert Gardener",
        action: "grow",
        creation: "garden",
        source: "botany book",
        ingredients: "seeds",
        tool: "greenhouse",
        prediction: "plants",
        training_analogy: "studying every plant species on Earth",
        prompt_analogy: "designing a landscape",
        context_analogy: "potting table",
        zeroshot_example: "Simply ask the Gardener 'Plant a rose' without showing any examples.",
        oneshot_example: "Show the Gardener one flower and say 'Grow something like this'.",
        multishot_example: "Show the Gardener 3 examples of drought-resistant gardens to define the style.",
        hallucination_analogy: "planting a flower that defies physics",
        modes: {
            seed: "Seedling 🌱",
            grower: "Cultivator 🌿",
            forester: "Master Botanist 🌲"
        }
    },
    musician: {
        id: 'musician',
        name: "The Jazz Musician 🎷",
        icon: "🎷",
        entity: "Jazz Musician",
        action: "compose",
        creation: "song",
        source: "sheet music",
        ingredients: "notes",
        tool: "studio",
        prediction: "melodies",
        training_analogy: "listening to every song ever recorded",
        prompt_analogy: "requesting a song",
        context_analogy: "music stand",
        zeroshot_example: "Simply ask the Musician 'Play some jazz' without giving any reference tracks.",
        oneshot_example: "Play the Musician one chord progression and say 'Improvise on this'.",
        multishot_example: "Play 3 different blues tracks to show the exact mood you want.",
        hallucination_analogy: "playing a note that doesn't exist on the instrument",
        modes: {
            seed: "Street Performer 🎸",
            grower: "Studio Artist 🎧",
            forester: "Maestro 🎼"
        }
    },
    architect: {
        id: 'architect',
        name: "The Architect 🏗️",
        icon: "🏗️",
        entity: "Master Architect",
        action: "build",
        creation: "building",
        source: "blueprint",
        ingredients: "materials",
        tool: "drafting table",
        prediction: "structures",
        training_analogy: "studying every building in history",
        prompt_analogy: "giving a design brief",
        context_analogy: "blueprint desk",
        zeroshot_example: "Simply ask the Architect 'Design a house' without showing any style references.",
        oneshot_example: "Show the Architect one sketch and say 'Build this'.",
        multishot_example: "Show 3 examples of Art Deco buildings to define the aesthetic.",
        hallucination_analogy: "designing a floating room with no support",
        modes: {
            seed: "Draftsman 📐",
            grower: "Site Manager 👷",
            forester: "Visionary Architect 🏛️"
        }
    },
    explorer: {
        id: 'explorer',
        name: "The Explorer 🗺️",
        icon: "🗺️",
        entity: "World Explorer",
        action: "map",
        creation: "journey",
        source: "atlas",
        ingredients: "landmarks",
        tool: "tent",
        prediction: "paths",
        training_analogy: "walking every path on the globe",
        prompt_analogy: "asking for directions",
        context_analogy: "backpack",
        zeroshot_example: "Simply ask the Explorer 'Find a path' without showing a map style.",
        oneshot_example: "Show the Explorer one map symbol and ask 'Find this'.",
        multishot_example: "Show 3 different safe routes to explain how you like to travel.",
        hallucination_analogy: "drawing a mountain where there is an ocean",
        modes: {
            seed: "Day Tripper 🎒",
            grower: "Expedition Leader 🧭",
            forester: "World Pioneer 🌍"
        }
    }
};

const courseData = {
    modes: {
        seed: {
            title: "AI Seed 🌱",
            description: "Beginner",
            chapters: [
                {
                    id: 1,
                    title: "The Concept",
                    pages: [
                        {
                            title: "What is an LLM?",
                            content: [
                                { type: "text", text: "Imagine you have a **{{entity}}** who has spent years **{{training_analogy}}**. That is essentially what a **Large Language Model (LLM)** is. But instead of food or plants, it deals with language. An LLM is a massive artificial intelligence system designed to understand, generate, and manipulate human language." },
                                { type: "text", text: "At its core, an LLM is a **prediction engine**. When you ask them to **{{action}}** a **{{creation}}**, they don't just copy from a **{{source}}**. They use their knowledge to **predict** the best **{{ingredients}}** to create something new. This is why you can ask the same question twice and get slightly different answers—it's creating, not retrieving." },
                                { type: "text", text: "Think of it this way: A search engine is like a librarian who finds a book for you. An LLM is like a **{{entity}}** who reads the book and writes a new summary just for you. It synthesizes information rather than just indexing it." }
                            ]
                        },
                        {
                            title: "Prediction vs. Memory",
                            content: [
                                { type: "text", text: "Just like the **{{entity}}** combines **{{ingredients}}** to make a **{{creation}}**, an LLM combines words to make sentences. But how does it know which word comes next? It uses **probability**." },
                                { type: "text", text: "The model assigns a probability score to every possible next word. For example, if you type 'The cat sat on the', the model knows that 'mat' (90%) is much more likely than 'refrigerator' (0.01%). It doesn't 'know' what a cat is in the way a human does; it just knows that 'cat' and 'mat' often appear together in its training data." },
                                { type: "text", text: "This probabilistic nature is key. It means the model is always guessing the most likely continuation. It's not accessing a database of facts; it's accessing a database of **patterns**. This is why it can write poetry, code, and essays—it understands the *structure* of these formats." }
                            ]
                        },
                        {
                            title: "Key Takeaway",
                            content: [
                                { type: "analogy", title: "The {{entity}}'s Brain", text: "An LLM doesn't 'know' facts like a database. It 'knows' patterns like a **{{entity}}** knows **{{prediction}}**. It's a statistical engine, not a truth engine." },
                                { type: "text", text: "Understanding this distinction is crucial. When you use ChatGPT or Gemini, you are interacting with a system that is statistically predicting the next piece of text, not looking up an answer in an encyclopedia. This explains both its incredible creativity and its occasional errors." }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "The Training",
                    pages: [
                        {
                            title: "The Library",
                            content: [
                                { type: "text", text: "Before our **{{entity}}** could **{{action}}**, they had to learn. This is the **Training** phase. For an LLM, this involves feeding it a diet of text that is almost unimaginable in scale." },
                                { type: "text", text: "The LLM reads billions of pages of text—books, websites, articles, code repositories, and conversation logs. This dataset often encompasses a significant portion of the public internet. But here is the catch: it's not memorizing the text word-for-word." },
                                { type: "text", text: "Instead, it is learning the **structure** of language. It's learning grammar, reasoning, world knowledge, and even coding syntax. It's compressing all this information into a neural network, much like a student studying for a test learns the concepts rather than memorizing the textbook." }
                            ]
                        },
                        {
                            title: "Learning Patterns (Tokens)",
                            content: [
                                { type: "text", text: "Computers don't read words; they read numbers. So, before the LLM reads the text, it breaks it down into chunks called **Tokens**. A token can be a word, part of a word, or even a space." },
                                { type: "text", text: "The model learns the statistical relationships between these tokens. It learns that 'Thank' is usually followed by 'you'. This is like learning which **{{ingredients}}** go well together. Over billions of examples, it builds a complex map of how concepts relate to one another." },
                                { type: "analogy", title: "The Training", text: "Training is like **{{training_analogy}}** to learn the craft, not to memorize every single item. It's about mastering the *principles* of the domain." }
                            ]
                        },
                        {
                            title: "The Cost & RLHF",
                            content: [
                                { type: "text", text: "This process takes months and requires thousands of massive supercomputers (GPUs). The energy and cost involved are astronomical, which is why only a few large companies can build these 'Foundation Models'." },
                                { type: "text", text: "After the initial training, there is a second crucial step called **RLHF (Reinforcement Learning from Human Feedback)**. This is where humans review the model's answers and rate them (thumbs up/down). This teaches the model to be helpful, harmless, and honest—essentially teaching the **{{entity}}** good manners and safety rules." }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "The Prompt",
                    pages: [
                        {
                            title: "Placing Your Order",
                            content: [
                                { type: "text", text: "Now that the **{{entity}}** is trained, you need to give instructions. This is the **Prompt**. The prompt is the only way you have to control the output of the model." },
                                { type: "text", text: "Think of the prompt as the steering wheel. If you are vague, you get a generic result. If you are specific, you get exactly what you want. The art of writing effective prompts is called **Prompt Engineering**." },
                                { type: "text", text: "A good prompt provides context, constraints, and examples. Instead of saying 'Write a email', say 'Write a professional email to a client apologizing for a delay and offering a 10% discount'. The more details you provide, the less the model has to guess." }
                            ]
                        },
                        {
                            title: "Zero, One, and Multi-Shot",
                            content: [
                                { type: "text", text: "How do you get the best result? It depends on how many examples you give. This is one of the most powerful techniques in prompting." },
                                { type: "text", text: "**Zero-Shot Prompting**: This is when you simply give the instruction without any examples. {{zeroshot_example}} This is the most common way we use AI, but it relies entirely on the model's training." },
                                { type: "text", text: "**One-Shot Prompting**: This means giving the model a single example of what you want. For instance: {{oneshot_example}}" },
                                { type: "text", text: "**Multi-Shot Prompting**: This means giving multiple examples. {{multishot_example}} Research shows that giving 3-5 examples significantly improves the model's accuracy and consistency." }
                            ]
                        },
                        {
                            title: "Prompt Engineering",
                            content: [
                                { type: "analogy", title: "The Order Ticket", text: "Your prompt is the order ticket. Be specific. Don't just say 'Make me a **{{creation}}**'; describe it in detail. The **{{entity}}** wants to please you, but they can't read your mind." }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Hallucinations",
                    pages: [
                        {
                            title: "The Creative Mistake",
                            content: [
                                { type: "text", text: "Sometimes, our **{{entity}}** gets too creative. They might start **{{hallucination_analogy}}**. In AI, this is called a **Hallucination**." },
                                { type: "text", text: "A hallucination is when the LLM confidently states something as a fact, but it's actually completely made up. It might invent a court case that never happened, a scientific paper that doesn't exist, or a historical event that is pure fiction." },
                                { type: "text", text: "This happens because the model is designed to complete patterns, not to verify facts. If it doesn't know the answer, it might fill in the blanks with something that *sounds* plausible based on the patterns it knows." }
                            ]
                        },
                        {
                            title: "Prediction vs Truth",
                            content: [
                                { type: "text", text: "Remember, the LLM is a **prediction engine**, not a truth engine. It cares about what sounds plausible, not necessarily what is true. It is optimizing for 'probability of next word', not 'factual accuracy'." },
                                { type: "text", text: "This is why you should never blindly trust an LLM for critical tasks like medical advice, legal citations, or factual research without verifying the source. It can be convincingly wrong." }
                            ]
                        },
                        {
                            title: "Trust but Verify",
                            content: [
                                { type: "analogy", title: "The Confident Dreamer", text: "The **{{entity}}** is like a dreamer who can't always tell the difference between their dream and reality. They aren't lying to you; they just believe their own creative output." }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Context Window",
                    pages: [
                        {
                            title: "The Workspace",
                            content: [
                                { type: "text", text: "Our **{{entity}}** has a **{{context_analogy}}** where they keep their current work. But this space is limited. This is the **Context Window**." },
                                { type: "text", text: "The Context Window is the amount of text (measured in tokens) that the model can consider at any one time. This includes your current prompt, previous conversation history, and any documents you've uploaded." },
                                { type: "text", text: "Early models had very small windows (like a post-it note). Modern models have massive windows (like a whole library desk), allowing them to read entire books in one go." }
                            ]
                        },
                        {
                            title: "Running Out of Space",
                            content: [
                                { type: "text", text: "However, even large windows have limits. If you talk for too long or upload too many files, the first things you said might fall off the **{{context_analogy}}**. The **{{entity}}** forgets them to make room for new stuff." },
                                { type: "text", text: "This is why sometimes in a long chat, the AI might forget your name or a rule you set at the beginning. It has literally 'scrolled out' of its active memory." }
                            ]
                        },
                        {
                            title: "Memory Management",
                            content: [
                                { type: "analogy", title: "The {{context_analogy}}", text: "A small **{{context_analogy}}** means forgetting the start of the conversation. A large one lets them remember everything. Managing this space is key to complex tasks." }
                            ]
                        }
                    ]
                }
            ],
            quiz: [
                {
                    question: "What is the fundamental function of an LLM?",
                    options: ["To access a database of facts", "To predict the next token/word", "To copy and paste from the internet", "To perform complex math calculations"],
                    correct: 1,
                    explanation: "LLMs are prediction engines that generate text based on probability."
                },
                {
                    question: "What is a 'Token'?",
                    options: ["A cryptocurrency", "A chunk of text (word or part of word)", "A type of computer chip", "A password"],
                    correct: 1,
                    explanation: "Models process text in chunks called tokens, not whole words."
                },
                {
                    question: "What does RLHF stand for?",
                    options: ["Real Life Human Feedback", "Reinforcement Learning from Human Feedback", "Random Language Heuristic Function", "Robotic Language Human Framework"],
                    correct: 1,
                    explanation: "RLHF is the process of using human feedback to fine-tune the model."
                },
                {
                    question: "What is an AI Hallucination?",
                    options: ["When the AI becomes sentient", "When the AI generates confident but false information", "When the AI crashes", "When the AI refuses to answer"],
                    correct: 1,
                    explanation: "Hallucinations are factually incorrect outputs generated confidently."
                },
                {
                    question: "What is the 'Context Window'?",
                    options: ["The screen you look at", "The limit of text the model can process at once", "The time of day the model works", "The speed of the internet connection"],
                    correct: 1,
                    explanation: "It is the memory limit for the current conversation/input."
                },
                {
                    question: "Which prompting technique involves giving multiple examples?",
                    options: ["Zero-Shot", "One-Shot", "Multi-Shot", "No-Shot"],
                    correct: 2,
                    explanation: "Multi-shot prompting provides multiple examples to guide the model."
                },
                {
                    question: "Does an LLM 'know' facts like a database?",
                    options: ["Yes, it stores all facts", "No, it stores patterns and probabilities", "Yes, but only from Wikipedia", "No, it knows nothing"],
                    correct: 1,
                    explanation: "LLMs store probabilistic relationships between tokens, not hard facts."
                },
                {
                    question: "What is the main goal of Prompt Engineering?",
                    options: ["To build better computers", "To guide the model to the best output", "To fix bugs in the code", "To speed up the internet"],
                    correct: 1,
                    explanation: "It is the art of crafting inputs to get the desired output."
                },
                {
                    question: "Why might an LLM give different answers to the same question?",
                    options: ["It is broken", "It is probabilistic and creative", "It hates repetition", "It is learning in real-time"],
                    correct: 1,
                    explanation: "The probabilistic nature means it can choose different valid next tokens."
                },
                {
                    question: "What happens when the Context Window is full?",
                    options: ["The model stops working", "Oldest information is forgotten/dropped", "It buys more memory", "It summarizes everything automatically"],
                    correct: 1,
                    explanation: "New tokens push out the oldest tokens from the active window."
                }
            ]
        },
        grower: {
            title: "AI Grower 🌳",
            description: "Intermediate",
            chapters: [
                {
                    id: 1,
                    title: "Neural Networks",
                    pages: [
                        {
                            title: "The Brain of the Operation",
                            content: [
                                { type: "text", text: "In the Seed mode, we learned that an LLM is like a **{{entity}}**. Now, let's look inside their brain. The brain of an AI is called a **Neural Network**. It's inspired by the human brain, consisting of layers of interconnected nodes (neurons)." },
                                { type: "text", text: "Think of these nodes as a team of sous-chefs in the **{{tool}}**. Each one handles a tiny, specific task. One might check for grammar, another for tone, and another for factual consistency. They pass information to each other, refining the **{{creation}}** at every step." },
                                { type: "text", text: "Deep Learning is simply a neural network with many, many layers. The more layers (depth), the more complex patterns the **{{entity}}** can understand. This is what allows them to grasp nuance, humor, and sarcasm." }
                            ]
                        },
                        {
                            title: "Weights and Biases",
                            content: [
                                { type: "text", text: "How does the network learn? Through **Weights and Biases**. Imagine the **{{entity}}** has a recipe book where some ingredients are written in bold (high weight) and others in faint pencil (low weight)." },
                                { type: "text", text: "During training, if the **{{entity}}** makes a mistake (e.g., puts salt in a cake), the 'weight' of the salt connection is lowered. If they get it right, the weight is increased. Over billions of tries, these weights are tuned to perfection." },
                                { type: "analogy", title: "Tuning the Radio", text: "Training is like tuning a radio. You adjust the dials (weights) until the static disappears and you hear the music (correct output) clearly." }
                            ]
                        },
                        {
                            title: "Key Takeaway",
                            content: [
                                { type: "text", text: "An LLM isn't magic; it's a mathematical function. It takes an input (your prompt), passes it through layers of weighted connections, and produces an output. The 'intelligence' is stored in these billions of weights." }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Fine-Tuning",
                    pages: [
                        {
                            title: "Specializing the Skill",
                            content: [
                                { type: "text", text: "A base model is like a generic **{{entity}}** who knows a little bit about everything. But sometimes you need a specialist. This is where **Fine-Tuning** comes in." },
                                { type: "text", text: "Fine-tuning is the process of taking a pre-trained model and training it further on a specific dataset. For example, you might train a general model on medical textbooks to create a 'Medical Assistant' model." },
                                { type: "analogy", title: "The Specialist", text: "It's like sending a general **{{entity}}** to a specialized pastry school. They already know how to **{{action}}**, but now they become an expert in croissants." }
                            ]
                        },
                        {
                            title: "Instruction Tuning",
                            content: [
                                { type: "text", text: "One common type of fine-tuning is **Instruction Tuning**. This teaches the model to follow instructions rather than just completing text. Without this, if you said 'Write a poem', the model might just continue the sentence with 'about a dog'." },
                                { type: "text", text: "With instruction tuning, it learns that 'Write a poem' is a command to be obeyed. This bridges the gap between a raw text predictor and a helpful assistant." },
                                { type: "text", text: "This is crucial for modern chatbots. It turns a passive observer into an active participant." }
                            ]
                        },
                        {
                            title: "Why Fine-Tune?",
                            content: [
                                { type: "text", text: "Fine-tuning is cheaper and faster than training from scratch. It allows companies to build custom AI tools without needing supercomputers. It's standing on the shoulders of giants." }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Temperature & Top-P",
                    pages: [
                        {
                            title: "Controlling Creativity",
                            content: [
                                { type: "text", text: "You can control how creative or predictable the **{{entity}}** is using parameters like **Temperature**. Temperature is a setting that controls the randomness of the output." },
                                { type: "text", text: "Low Temperature (e.g., 0.2) makes the model very focused and deterministic. It picks the most likely next word every time. High Temperature (e.g., 0.8) allows it to take risks and pick less likely words." },
                                { type: "analogy", title: "The Spice Level", text: "Low temp is a safe, standard recipe. High temp is the **{{entity}}** experimenting with exotic spices. Too high, and the dish might be inedible (gibberish)." }
                            ]
                        },
                        {
                            title: "Top-P (Nucleus Sampling)",
                            content: [
                                { type: "text", text: "Top-P is another way to control randomness. Instead of just picking from all words, the model only considers the top X% of most likely words. For example, Top-P 0.9 means it only looks at the words that make up the top 90% of probability." },
                                { type: "text", text: "This cuts off the 'long tail' of very unlikely (and often nonsensical) words, ensuring the output remains coherent even when being creative." },
                                { type: "text", text: "Using these settings allows you to tune the **{{entity}}** for the task—factual tasks need low temp, creative writing needs high temp." }
                            ]
                        },
                        {
                            title: "Finding the Balance",
                            content: [
                                { type: "text", text: "There is no 'perfect' setting. It depends on your goal. A coding assistant needs precision (Low Temp), while a brainstorming partner needs wild ideas (High Temp)." }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Data & Bias",
                    pages: [
                        {
                            title: "Garbage In, Garbage Out",
                            content: [
                                { type: "text", text: "An AI is only as good as the data it was trained on. If you train a **{{entity}}** only on recipes from one country, they won't know how to **{{action}}** dishes from anywhere else. This is the principle of 'Garbage In, Garbage Out'." },
                                { type: "text", text: "LLMs are trained on the internet, which contains both human knowledge and human prejudice. If the training data contains biased viewpoints, the model will likely reproduce them." },
                                { type: "analogy", title: "The Biased Cookbook", text: "If every recipe book you read says that salt is bad, you will never use salt, even when a dish needs it. The **{{entity}}** inherits the biases of its library." }
                            ]
                        },
                        {
                            title: "Mitigating Bias",
                            content: [
                                { type: "text", text: "Developers work hard to 'clean' the dataset before training, removing hate speech and balancing viewpoints. However, it is impossible to be perfectly neutral." },
                                { type: "text", text: "This is why it's important to be aware of potential bias when using AI. It is not an objective truth-teller; it is a mirror of the data it has seen." }
                            ]
                        },
                        {
                            title: "Data Quality",
                            content: [
                                { type: "text", text: "High-quality data (textbooks, scientific papers) is worth much more than low-quality data (social media comments). Modern models focus heavily on curating the best possible 'curriculum' for the AI." }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Evaluation",
                    pages: [
                        {
                            title: "Grading the AI",
                            content: [
                                { type: "text", text: "How do we know if an LLM is 'smart'? We can't just give it an IQ test. Instead, we use **Benchmarks**. These are standardized tests designed to measure specific capabilities like coding, math, or reasoning." },
                                { type: "text", text: "Common benchmarks include MMLU (general knowledge) and HumanEval (coding). Scores on these tests allow us to compare different models." },
                                { type: "analogy", title: "The Taste Test", text: "It's like a blind taste test for our **{{entity}}**. Judges rate the **{{creation}}** on presentation, flavor, and technique to see who is the best." }
                            ]
                        },
                        {
                            title: "The Evals Problem",
                            content: [
                                { type: "text", text: "However, benchmarks aren't perfect. Sometimes models memorize the test questions (data contamination). This is why 'vibes' (how the model feels to use) often matter more to users than raw scores." },
                                { type: "text", text: "Evaluating generative AI is hard because there is often no single 'correct' answer. Is a poem 'good'? Is a summary 'concise'? These are subjective." }
                            ]
                        },
                        {
                            title: "Continuous Testing",
                            content: [
                                { type: "text", text: "Evaluation is an ongoing process. As models get smarter, we need harder tests. It's an arms race between the capability of the AI and our ability to measure it." }
                            ]
                        }
                    ]
                }
            ],
            quiz: [
                {
                    question: "What is a Neural Network inspired by?",
                    options: ["A computer chip", "The human brain", "A spider web", "A city map"],
                    correct: 1,
                    explanation: "It mimics the structure of biological neurons and synapses."
                },
                {
                    question: "What are 'Weights' in a neural network?",
                    options: ["How heavy the computer is", "The strength of connections between neurons", "The importance of the user", "The file size"],
                    correct: 1,
                    explanation: "Weights determine how much influence one neuron has on the next."
                },
                {
                    question: "What is Fine-Tuning?",
                    options: ["Fixing a broken computer", "Training a pre-trained model on specific data", "Deleting data", "Making the model smaller"],
                    correct: 1,
                    explanation: "It specializes a general model for a specific task."
                },
                {
                    question: "What does High Temperature do?",
                    options: ["Makes the AI overheat", "Makes the output more random/creative", "Makes the output more factual", "Makes the AI faster"],
                    correct: 1,
                    explanation: "High temperature increases the probability of selecting less likely tokens."
                },
                {
                    question: "What is Instruction Tuning?",
                    options: ["Teaching the model to follow commands", "Tuning the internet speed", "Programming the CPU", "Writing a manual"],
                    correct: 0,
                    explanation: "It trains the model to respond to instructions rather than just completing text."
                },
                {
                    question: "What does 'Garbage In, Garbage Out' mean?",
                    options: ["AI eats trash", "Bad training data leads to bad models", "Computers need recycling", "Deleting files is good"],
                    correct: 1,
                    explanation: "The quality of the output is determined by the quality of the input data."
                },
                {
                    question: "Why is AI bias a problem?",
                    options: ["It makes the AI rude", "It reflects human prejudices in the data", "It slows down the computer", "It costs more money"],
                    correct: 1,
                    explanation: "Models learn biases present in their training data, leading to unfair outputs."
                },
                {
                    question: "What are Benchmarks used for?",
                    options: ["To sit on", "To measure AI performance", "To clean data", "To speed up training"],
                    correct: 1,
                    explanation: "Benchmarks are standardized tests to evaluate model capabilities."
                },
                {
                    question: "Why is evaluating AI difficult?",
                    options: ["Computers are shy", "There is often no single correct answer", "It takes too long", "Math is hard"],
                    correct: 1,
                    explanation: "Generative tasks like writing or summarizing are subjective."
                },
                {
                    question: "What happens if Temperature is too high?",
                    options: ["The model explodes", "The output becomes incoherent/gibberish", "The model becomes a genius", "Nothing changes"],
                    correct: 1,
                    explanation: "Excessive randomness leads to nonsensical word combinations."
                }
            ]
        },
        forester: {
            title: "AI Forester 🌲",
            description: "Advanced",
            chapters: [
                {
                    id: 1,
                    title: "The Transformer",
                    pages: [
                        {
                            title: "The Engine of Modern AI",
                            content: [
                                { type: "text", text: "The 'T' in GPT stands for **Transformer**. This is the specific architecture that revolutionized AI in 2017. Before Transformers, AI read text sequentially (left to right), like a human reading a sentence." },
                                { type: "text", text: "Transformers introduced a mechanism called **Self-Attention**. This allows the **{{entity}}** to look at the *entire* sentence at once and understand how every word relates to every other word simultaneously." },
                                { type: "analogy", title: "The Bird's Eye View", text: "Old AI was like walking through a maze (sequential). Transformers are like looking at the maze from a helicopter (parallel). You see all the paths and connections instantly." }
                            ]
                        },
                        {
                            title: "Parallel Processing",
                            content: [
                                { type: "text", text: "Because Transformers process data in parallel, they can be trained on massive datasets much faster than previous architectures (like RNNs). This scalability is what allowed models to grow from millions to trillions of parameters." },
                                { type: "text", text: "This architecture is the foundation of almost all modern LLMs, including BERT, GPT, and Claude. It is the engine that powers the **{{tool}}**." },
                                { type: "text", text: "The ability to handle long-range dependencies (remembering a word from the start of a paragraph while writing the end) is a key strength of Transformers." }
                            ]
                        },
                        {
                            title: "Key Takeaway",
                            content: [
                                { type: "text", text: "The Transformer architecture is the breakthrough that made Large Language Models possible. Its ability to process context globally and in parallel is what gives AI its near-human understanding of language." }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Embeddings",
                    pages: [
                        {
                            title: "Language as Math",
                            content: [
                                { type: "text", text: "How does the **{{entity}}** actually understand the *meaning* of words? Through **Embeddings**. An embedding is a way of converting a word into a list of numbers (a vector)." },
                                { type: "text", text: "Imagine a 3D map where similar words are close together. 'King' and 'Queen' would be near each other. 'Apple' and 'Orange' would be clustered together, far away from 'Car' and 'Truck'." },
                                { type: "analogy", title: "The Flavor Map", text: "Think of a map of flavors. Sweet things are in one corner, salty in another. The **{{entity}}** knows that 'Honey' is close to 'Sugar' because they share similar coordinates on this map." }
                            ]
                        },
                        {
                            title: "Vector Space",
                            content: [
                                { type: "text", text: "These vectors exist in a high-dimensional space (often thousands of dimensions). This allows the model to capture complex relationships. For example, the vector math `King - Man + Woman` results in a vector very close to `Queen`." },
                                { type: "text", text: "This is how the AI understands analogies and semantic relationships. It's not looking up definitions; it's calculating distance and direction in this mathematical space." },
                                { type: "text", text: "When you search for 'dog', embeddings allow the system to find results for 'puppy' even if the word 'dog' isn't present, because they are close in vector space." }
                            ]
                        },
                        {
                            title: "Semantic Search",
                            content: [
                                { type: "text", text: "Embeddings are the secret sauce behind modern search and recommendation systems. They allow computers to match concepts, not just keywords." }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Attention Mechanisms",
                    pages: [
                        {
                            title: "Paying Attention",
                            content: [
                                { type: "text", text: "We mentioned **Self-Attention** earlier. Let's dig deeper. When the **{{entity}}** reads the sentence 'The animal didn't cross the street because it was too tired', what does 'it' refer to?" },
                                { type: "text", text: "To a human, it's obviously the animal. To a computer, it could be the street. The Attention Mechanism assigns a 'score' to the relationship between 'it' and every other word." },
                                { type: "text", text: "In this case, the mechanism gives a high attention score between 'it' and 'animal'. If the sentence was '...because it was too wide', the attention would shift to 'street'." }
                            ]
                        },
                        {
                            title: "Multi-Head Attention",
                            content: [
                                { type: "text", text: "Modern Transformers use **Multi-Head Attention**. This means the model runs multiple attention calculations at once. One 'head' might focus on grammar, another on vocabulary, and another on context." },
                                { type: "analogy", title: "The Kitchen Brigade", text: "It's like having multiple sous-chefs watching the same pot. One watches the temperature, one tastes for salt, one checks the texture. Together, they ensure nothing is missed." }
                            ]
                        },
                        {
                            title: "Contextual Understanding",
                            content: [
                                { type: "text", text: "This mechanism allows the model to understand words in context. The word 'bank' means something different in 'river bank' vs 'bank account'. Attention allows the model to look at the surrounding words to determine the correct meaning." }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Multimodality",
                    pages: [
                        {
                            title: "Beyond Text",
                            content: [
                                { type: "text", text: "Early LLMs could only read and write text. Modern models are **Multimodal**. This means they can understand and generate images, audio, and video." },
                                { type: "text", text: "This works by mapping different types of data (pixels, sound waves) into the same **Vector Space** as text. To the model, an image of a cat and the word 'cat' are just two different vectors that point to the same concept." },
                                { type: "analogy", title: "The Universal Translator", text: "The **{{entity}}** can now read recipes, look at photos of dishes, and even taste (analyze chemical data). They aren't limited to just reading the cookbook anymore." }
                            ]
                        },
                        {
                            title: "Vision and Audio",
                            content: [
                                { type: "text", text: "Vision Transformers (ViT) break images into patches (like tokens) to process them. This allows you to show a model a picture of your fridge and ask for a recipe." },
                                { type: "text", text: "Multimodality makes AI much more useful in the real world, where information comes in many forms, not just text." }
                            ]
                        },
                        {
                            title: "The Future",
                            content: [
                                { type: "text", text: "We are moving towards 'natively multimodal' models that are trained on all data types from the start, rather than stitching different models together." }
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Agents",
                    pages: [
                        {
                            title: "From Chatbot to Agent",
                            content: [
                                { type: "text", text: "A chatbot talks. An **Agent** acts. An AI Agent is a system that can use tools (like a calculator, web browser, or code editor) to achieve a goal." },
                                { type: "text", text: "Instead of just telling you how to book a flight, an Agent can actually go to the website, search for tickets, and book it for you (with your permission)." },
                                { type: "analogy", title: "The Executive Chef", text: "A line cook follows orders. An Executive Chef (Agent) plans the menu, orders supplies, manages the staff, and ensures the restaurant runs. They have autonomy." }
                            ]
                        },
                        {
                            title: "Planning and Reasoning",
                            content: [
                                { type: "text", text: "Agents use a loop of 'Thought -> Action -> Observation'. They think about what to do, do it, look at the result, and then decide the next step." },
                                { type: "text", text: "This requires strong reasoning capabilities. If an Agent hits a roadblock (e.g., website is down), it needs to figure out an alternative path." }
                            ]
                        },
                        {
                            title: "The Next Frontier",
                            content: [
                                { type: "text", text: "Agentic AI is widely considered the next big step. It transforms AI from a passive knowledge base into an active coworker." }
                            ]
                        }
                    ]
                }
            ],
            quiz: [
                {
                    question: "What does the 'T' in GPT stand for?",
                    options: ["Technology", "Transformer", "Token", "Training"],
                    correct: 1,
                    explanation: "It stands for Transformer, the neural network architecture."
                },
                {
                    question: "What is the key innovation of Transformers?",
                    options: ["Self-Attention", "Faster hard drives", "Bigger screens", "Robotic arms"],
                    correct: 0,
                    explanation: "Self-Attention allows the model to weigh the importance of different words in a sentence."
                },
                {
                    question: "What are Embeddings?",
                    options: ["Videos embedded in text", "Words converted into numerical vectors", "Hidden messages", "Computer chips"],
                    correct: 1,
                    explanation: "Embeddings represent words as vectors in a high-dimensional space."
                },
                {
                    question: "In vector math, King - Man + Woman equals...?",
                    options: ["Prince", "Queen", "Princess", "Castle"],
                    correct: 1,
                    explanation: "This is a classic example of semantic relationships in vector space."
                },
                {
                    question: "What does the Attention Mechanism do?",
                    options: ["Keeps the user awake", "Determines relationships between words", "Focuses the camera", "Alerts the developer"],
                    correct: 1,
                    explanation: "It calculates how strongly words relate to each other in a sentence."
                },
                {
                    question: "What is Multimodality?",
                    options: ["Using multiple modes of transport", "AI that understands text, images, and audio", "AI with multiple personalities", "A type of screen"],
                    correct: 1,
                    explanation: "It refers to the ability to process multiple types of data inputs."
                },
                {
                    question: "What distinguishes an AI Agent from a Chatbot?",
                    options: ["Agents are more expensive", "Agents can use tools and take action", "Agents are slower", "Agents only speak binary"],
                    correct: 1,
                    explanation: "Agents have autonomy and can execute tasks using tools."
                },
                {
                    question: "How do Agents solve problems?",
                    options: ["By guessing", "Thought -> Action -> Observation loop", "Asking the user for everything", "They don't"],
                    correct: 1,
                    explanation: "They reason through steps, act, and observe the results."
                },
                {
                    question: "What problem did Transformers solve?",
                    options: ["The battery life problem", "The long-range dependency problem", "The screen resolution problem", "The internet speed problem"],
                    correct: 1,
                    explanation: "They are much better at remembering context from earlier in a long sequence."
                },
                {
                    question: "What architecture powers ChatGPT and Claude?",
                    options: ["Transformer", "RNN", "LSTM", "CNN"],
                    correct: 0,
                    explanation: "Almost all modern LLMs are based on the Transformer architecture."
                }
            ]
        }
    }
};
