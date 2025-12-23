import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, TrendingUp, AlertCircle, CheckCircle, Mic, Video, FileText, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface InterviewPrepMode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  prompts: string[];
}

const PREP_MODES: InterviewPrepMode[] = [
  {
    id: 'behavioral',
    title: 'Behavioral Questions',
    description: 'Practice STAR method responses',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'from-blue-500 to-blue-700',
    prompts: [
      'Tell me about a time you faced a challenging project',
      'Describe a situation where you had to work with a difficult team member',
      'Give an example of when you showed leadership',
      'Tell me about a time you failed and what you learned'
    ]
  }, {
    id: 'technical',
    title: 'Technical Interview',
    description: 'Coding, system design, algorithms',
    icon: <FileText className="w-5 h-5" />,
    color: 'from-purple-500 to-purple-700',
    prompts: [
      'Explain how you would design a scalable API',
      'What is the difference between REST and GraphQL?',
      'How would you optimize database queries?',
      'Explain your approach to testing'
    ]
  },
  {
    id: 'mock',
    title: 'Mock Interview',
    description: 'Full interview simulation',
    icon: <Video className="w-5 h-5" />,
    color: 'from-green-500 to-green-700',
    prompts: [
      'Why do you want to work here?',
      'What are your salary expectations?',
      'Where do you see yourself in 5 years?',
      'Do you have any questions for me?'
    ]
  },
  {
    id: 'feedback',
    title: 'Answer Review',
    description: 'Get AI feedback on your answers',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-700',
    prompts: [
      'Review my answer and provide feedback',
      'How can I improve this response?',
      'Rate my answer from 1-10',
      'What key points am I missing?'
    ]
  }
];

interface AIInterviewPrepProps {
  userName?: string;
  userRole?: string;
}

const AIInterviewPrep: React.FC<AIInterviewPrepProps> = ({ userName = 'User', userRole = 'Software Engineer' }) => {
  const [selectedMode, setSelectedMode] = useState<InterviewPrepMode | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const startSession = (mode: InterviewPrepMode) => {
    setSelectedMode(mode);
    setSessionStarted(true);
    const welcomeMessage: Message = {
      role: 'ai',
      content: `Hello ${userName}! I'm your AI Interview Coach. I'll help you prepare for ${mode.title.toLowerCase()}. Let's practice together!\n\nI'll ask you questions, and you can respond as if you're in a real interview. I'll provide feedback and tips to improve your answers.\n\nReady? Let me start with a question...`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    // Ask first question after a short delay
    setTimeout(() => {
      askQuestion(mode);
    }, 2000);
  };

  const askQuestion = (mode: InterviewPrepMode) => {
    const randomPrompt = mode.prompts[Math.floor(Math.random() * mode.prompts.length)];
    const question: Message = {
      role: 'ai',
      content: randomPrompt,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, question]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedMode) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (in production, call actual AI API)
    setTimeout(() => {
      const aiResponse = generateAIFeedback(userMessage.content, selectedMode);
      const aiMessage: Message = {
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Ask next question after feedback
      if (selectedMode.id !== 'feedback') {
        setTimeout(() => {
          askQuestion(selectedMode);
        }, 3000);
      }
    }, 1500);
  };

  const generateAIFeedback = (answer: string, mode: InterviewPrepMode): string => {
    // This is a placeholder. In production, integrate with Gemini AI
    const feedbacks = [
      `Great start! Here's my feedback:\n\n✅ Strengths:\n- Clear communication\n- Good structure\n\n💡 Areas to improve:\n- Add more specific metrics and examples\n- Include the impact of your actions\n\nTry to follow the STAR method:\n- Situation: Set the context\n- Task: Explain your responsibility\n- Action: Describe what you did\n- Result: Share the outcome\n\nLet's try another question!`,

      `Good answer! Here's what I noticed:\n\n✅ What worked well:\n- You provided concrete examples\n- Your answer was well-organized\n\n💡 Suggestions:\n- Elaborate more on the technical challenges\n- Mention what you learned from the experience\n\nRemember, interviewers want to see:\n1. Problem-solving skills\n2. Technical expertise\n3. Growth mindset\n\nReady for the next question?`,

      `Nice response! Let me provide some feedback:\n\n✅ Strong points:\n- Confident delivery\n- Relevant experience mentioned\n\n💡 Enhancement tips:\n- Quantify your achievements (e.g., "increased by 40%")\n- Connect your answer to the company's needs\n- Show enthusiasm for the role\n\nPro tip: Research the company beforehand and align your answers with their values.\n\nShall we continue?`
    ];

    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const resetSession = () => {
    setSelectedMode(null);
    setMessages([]);
    setSessionStarted(false);
    setInputMessage('');
  };

  if (!sessionStarted) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">AI-Powered Interview Preparation</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Practice Makes Perfect
          </h1>
          <p className="text-xl text-slate-600">
            Get personalized interview practice with instant AI feedback
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PREP_MODES.map((mode) => (
            <div
              key={mode.id}
              onClick={() => startSession(mode)}
              className="cursor-pointer group bg-white rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${mode.color} text-white p-6`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    {mode.icon}
                  </div>
                  <h3 className="text-xl font-bold">{mode.title}</h3>
                </div>
                <p className="text-sm opacity-90">{mode.description}</p>
              </div>

              <div className="p-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">Sample Questions:</p>
                <ul className="space-y-2">
                  {mode.prompts.slice(0, 3).map((prompt, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold group-hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Practice Session
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Interview Tips</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Research the company and role thoroughly</li>
                <li>• Practice your answers out loud, not just in your head</li>
                <li>• Use the STAR method for behavioral questions</li>
                <li>• Prepare thoughtful questions to ask the interviewer</li>
                <li>• Get feedback and iterate on your responses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${selectedMode?.color} text-white rounded-xl p-6 mb-6 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
              {selectedMode?.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{selectedMode?.title}</h2>
              <p className="text-sm opacity-90">Practicing as: {userRole}</p>
            </div>
          </div>
          <button
            onClick={resetSession}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg font-semibold transition-colors"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 mb-6">
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {message.role === 'ai' && <Sparkles className="w-4 h-4 text-purple-600" />}
                  <span className="text-xs font-semibold opacity-75">
                    {message.role === 'user' ? userName : 'AI Interview Coach'}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                  <span className="text-sm text-slate-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your answer here..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            💡 Tip: Speak as if you're in a real interview. The AI will provide feedback on your answer.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => selectedMode && askQuestion(selectedMode)}
          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors"
        >
          Next Question
        </button>
        <button
          onClick={() => setInputMessage("Can you give me an example answer?")}
          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors"
        >
          Example Answer
        </button>
        <button
          onClick={() => setInputMessage("Give me tips for this question")}
          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors"
        >
          Get Tips
        </button>
        <button
          onClick={() => setInputMessage("Review my last answer")}
          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors"
        >
          Review Answer
        </button>
      </div>
    </div>
  );
};

export default AIInterviewPrep;
