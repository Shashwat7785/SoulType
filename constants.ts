
import { Question, MBTIType, PersonalityInsight, User } from './types';

export const MBTI_QUESTIONS: Question[] = [
  { id: 1, dimension: 'EI', text: 'After a long, busy week, how do you prefer to recharge?', optionA: 'Going out with friends and meeting new people', optionB: 'Spending quiet time alone or with a close friend' },
  { id: 2, dimension: 'SN', text: 'When learning something new, what do you usually focus on?', optionA: 'Concrete facts and practical applications', optionB: 'Abstract concepts and future possibilities' },
  { id: 3, dimension: 'TF', text: 'When making a difficult decision, what carries more weight?', optionA: 'Logical analysis and objective truths', optionB: 'Impact on people and personal values' },
  { id: 4, dimension: 'JP', text: 'How do you generally approach your daily schedule?', optionA: 'Planning ahead and sticking to a routine', optionB: 'Staying flexible and being spontaneous' },
  { id: 5, dimension: 'EI', text: 'In social gatherings, do you usually:', optionA: 'Initiate conversations with many different people', optionB: 'Interact more with people you already know well' },
  { id: 6, dimension: 'SN', text: 'Do you prefer information that is:', optionA: 'Clear, direct, and straightforward', optionB: 'Imaginative, metaphorical, and layered' },
  { id: 7, dimension: 'TF', text: 'Which is a bigger compliment for you?', optionA: "You're consistently fair and logical", optionB: "You're deeply empathetic and kind" },
  { id: 8, dimension: 'JP', text: 'When starting a project, do you prefer to:', optionA: 'Have a clear set of steps and deadlines', optionB: 'Dive in and figure things out as you go' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Elena', age: 26, email: 'elena@test.com', personalityType: 'ENFJ', location: 'New York', photoUrl: 'https://picsum.photos/seed/elena/400/400', bio: 'Passionate about social justice and deep conversations.' },
  { id: 'u2', name: 'Marcus', age: 29, email: 'marcus@test.com', personalityType: 'ISTP', location: 'Austin', photoUrl: 'https://picsum.photos/seed/marcus/400/400', bio: 'Engine builder, mountain biker, and coffee enthusiast.' },
  { id: 'u3', name: 'Sophie', age: 24, email: 'sophie@test.com', personalityType: 'INFP', location: 'Portland', photoUrl: 'https://picsum.photos/seed/sophie/400/400', bio: 'Dreamer, poet, and lover of rainy afternoons.' },
  { id: 'u4', name: 'David', age: 31, email: 'david@test.com', personalityType: 'ENTJ', location: 'Chicago', photoUrl: 'https://picsum.photos/seed/david/400/400', bio: 'Building the future of tech. Strategist at heart.' },
  { id: 'u5', name: 'Maya', age: 27, email: 'maya@test.com', personalityType: 'ISFP', location: 'San Francisco', photoUrl: 'https://picsum.photos/seed/maya/400/400', bio: 'Artist, traveler, and seeker of beauty in the everyday.' },
  { id: 'u6', name: 'Julian', age: 28, email: 'julian@test.com', personalityType: 'INTJ', location: 'London', photoUrl: 'https://picsum.photos/seed/julian/400/400', bio: 'Chess player, reader, and systematic thinker.' },
  { id: 'u7', name: 'Chloe', age: 25, email: 'chloe@test.com', personalityType: 'ESFP', location: 'Miami', photoUrl: 'https://picsum.photos/seed/chloe/400/400', bio: 'Life of the party! Always up for an adventure.' },
  { id: 'u8', name: 'Liam', age: 30, email: 'liam@test.com', personalityType: 'ESTJ', location: 'Seattle', photoUrl: 'https://picsum.photos/seed/liam/400/400', bio: 'Efficient, organized, and dedicated professional.' },
];

export const PERSONALITY_MAP: Record<MBTIType, PersonalityInsight> = {
  'INTJ': { type: 'INTJ', title: 'The Architect', description: 'Imaginative and strategic thinkers, with a plan for everything.', strengths: ['Strategic', 'Analytical', 'Independent'], weaknesses: ['Arrogant', 'Judgmental', 'Overly critical'], idealMatches: ['ENFP', 'ENTP'] },
  'INTP': { type: 'INTP', title: 'The Logician', description: 'Innovative inventors with an unquenchable thirst for knowledge.', strengths: ['Original', 'Open-minded', 'Objective'], weaknesses: ['Disconnected', 'Impatient', 'Insensitive'], idealMatches: ['ENTJ', 'ESTJ'] },
  'ENTJ': { type: 'ENTJ', title: 'The Commander', description: 'Bold, imaginative and strong-willed leaders, always finding a way.', strengths: ['Efficient', 'Energetic', 'Self-confident'], weaknesses: ['Stubborn', 'Intolerant', 'Impatient'], idealMatches: ['INTP', 'INFP'] },
  'ENTP': { type: 'ENTP', title: 'The Debater', description: 'Smart and curious thinkers who cannot resist an intellectual challenge.', strengths: ['Knowledgeable', 'Quick thinker', 'Original'], weaknesses: ['Argumentative', 'Insensitive', 'Intolerant'], idealMatches: ['INFJ', 'INTJ'] },
  'INFJ': { type: 'INFJ', title: 'The Advocate', description: 'Quiet and mystical, yet very inspiring and tireless idealists.', strengths: ['Creative', 'Insightful', 'Principled'], weaknesses: ['Sensitive', 'Perfectionistic', 'Private'], idealMatches: ['ENTP', 'ENFP'] },
  'INFP': { type: 'INFP', title: 'The Mediator', description: 'Poetic, kind and altruistic people, always eager to help a good cause.', strengths: ['Empathetic', 'Generous', 'Creative'], weaknesses: ['Overly idealistic', 'Self-critical', 'Impractical'], idealMatches: ['ENFJ', 'ENTJ'] },
  'ENFJ': { type: 'ENFJ', title: 'The Protagonist', description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.', strengths: ['Reliable', 'Passionate', 'Charismatic'], weaknesses: ['Overly idealistic', 'Too sensitive', 'Too selfless'], idealMatches: ['INFP', 'ISFP'] },
  'ENFP': { type: 'ENFP', title: 'The Campaigner', description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.', strengths: ['Curious', 'Observant', 'Energetic'], weaknesses: ['Poor practical skills', 'Finds it difficult to focus', 'Overthinks'], idealMatches: ['INTJ', 'INFJ'] },
  'ISTJ': { type: 'ISTJ', title: 'The Logistician', description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.', strengths: ['Honest', 'Strong-willed', 'Dutiful'], weaknesses: ['Stubborn', 'Insensitive', 'Judgmental'], idealMatches: ['ESFP', 'ESTP'] },
  'ISFJ': { type: 'ISFJ', title: 'The Defender', description: 'Very dedicated and warm protectors, always ready to defend their loved ones.', strengths: ['Supportive', 'Reliable', 'Patient'], weaknesses: ['Humble and shy', 'Takes things personally', 'Overloads themselves'], idealMatches: ['ESFP', 'ESTP'] },
  'ESTJ': { type: 'ESTJ', title: 'The Executive', description: 'Excellent administrators, unsurpassed at managing things – or people.', strengths: ['Dedicated', 'Strong-willed', 'Direct'], weaknesses: ['Inflexible', 'Judgmental', 'Focuses too much on social status'], idealMatches: ['ISFP', 'ISTP'] },
  'ESFJ': { type: 'ESFJ', title: 'The Consul', description: 'Extraordinarily caring, social and popular people, always eager to help.', strengths: ['Strong practical skills', 'Warm', 'Loyal'], weaknesses: ['Worried about their social status', 'Inflexible', 'Needy'], idealMatches: ['ISFP', 'ISTP'] },
  'ISTP': { type: 'ISTP', title: 'The Virtuoso', description: 'Bold and practical experimenters, masters of all kinds of tools.', strengths: ['Optimistic', 'Creative', 'Practical'], weaknesses: ['Stubborn', 'Insensitive', 'Easily bored'], idealMatches: ['ESFJ', 'ESTJ'] },
  'ISFP': { type: 'ISFP', title: 'The Adventurer', description: 'Flexible and charming artists, always ready to explore and experience something new.', strengths: ['Charming', 'Sensitive', 'Imaginative'], weaknesses: ['Fiercely independent', 'Unpredictable', 'Easily stressed'], idealMatches: ['ENFJ', 'ESFJ'] },
  'ESTP': { type: 'ESTP', title: 'The Entrepreneur', description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.', strengths: ['Bold', 'Rational', 'Perceptive'], weaknesses: ['Insensitive', 'Impatient', 'Risk-prone'], idealMatches: ['ISFJ', 'ISTJ'] },
  'ESFP': { type: 'ESFP', title: 'The Entertainer', description: 'Spontaneous, energetic and enthusiastic people – life is never boring around them.', strengths: ['Bold', 'Original', 'Practical'], weaknesses: ['Sensitive', 'Easily bored', 'Poor planners'], idealMatches: ['ISFJ', 'ISTJ'] },
};
