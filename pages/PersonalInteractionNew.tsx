import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { MessageSquare, Send, Sparkles, User, Bot, Briefcase, Building, Award, CheckCircle, Lightbulb, TrendingUp, Target, BookOpen, ArrowRight, Loader2, Plus, X, Star, Mic, MicOff, Video, VideoOff, Play, Pause, StopCircle, Volume2, VolumeX, Camera, Download, RotateCcw, Settings } from 'lucide-react';

interface PersonalInteractionProps {
  userName?: string;
  userEmail?: string;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
  suggestions?: string[];
  actions?: { label: string; value: string }[];
}

interface UserProfile {
  skills: string[];
  targetCompanies: string[];
  targetRoles: string[];  experience: string;
  location: string;
  salary: string;
}

const PersonalInteractionNew = ({ 
  userName = 'User',
  userEmail = '',
  onNavigate = (_page: string) => {}, 
  onLogout = () => {} 
}: PersonalInteractionProps) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [userProfile, setUserProfile] = useState({
    skills: [],
    targetCompanies: [],
    targetRoles: [],
    experience: '',
    location: '',
    salary: ''
  });
  const [currentStep, setCurrentStep] = useState('intro');
  const messagesEndRef = useRef(null);
  
  // Voice Practice State
  const [voicePracticeActive, setVoicePracticeActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [aiVoiceFeedback, setAiVoiceFeedback] = useState('');
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(null);
  
  // Video Mock Interview State
  const [videoInterviewActive, setVideoInterviewActive] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [interviewQuestion, setInterviewQuestion] = useState('');
  const [videoFeedback, setVideoFeedback] = useState('');
  
  // Practice Mode State
  const [practiceMode, setPracticeMode] = useState('chat');
  const [practiceTimer, setPracticeTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'user' | 'ai', content: string, type: 'text' | 'suggestion' | 'action' = 'text', suggestions?: string[], actions?: { label: string; value: string }[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      type,
      suggestions,
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const startConversation = () => {
    setConversationStarted(true);
    addMessage('ai', `Hi ${userName}! 👋 I'm your AI Career Advisor. I'm here to help you find the perfect job match based on your skills, target companies, and career goals.\n\nLet's get started! I'll ask you a few questions to understand your career aspirations better.`);
    
    setTimeout(() => {
      setCurrentStep('skills');
      addMessage('ai', "First, let's talk about your skills. What are your core technical or professional skills?", 'suggestion', [
        'JavaScript, React, Node.js',
        'Python, Machine Learning, Data Science',
        'Project Management, Agile, Leadership',
        'Java, Spring Boot, Microservices',
        'AWS, DevOps, Docker, Kubernetes'
      ]);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addMessage('user', suggestion);
    processUserResponse(suggestion);
  };
  const processUserResponse = (message: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
        // Check for general questions first
      if (lowerMsg.includes('help') || lowerMsg.includes('what can you do') || lowerMsg.includes('capabilities')) {
        addMessage('ai', `I'm your AI Career Advisor! I can help you with virtually anything career-related:

🎯 **Career Guidance:**
- Job search strategies & platforms
- Career path recommendations
- Industry-specific advice (fintech, gaming, healthcare, etc.)
- Career transitions & changes
- Promotion & career growth strategies

📝 **Resume & Applications:**
- Resume optimization & ATS tips
- Cover letter writing
- Portfolio & GitHub best practices
- Application strategies & tracking

💼 **Interview Preparation:**
- Technical interview prep (coding, system design)
- Behavioral interview tips (STAR method)
- Mock interview practice
- Company-specific interview strategies

💰 **Compensation:**
- Salary negotiation tactics
- Understanding benefits & perks
- Equity, RSUs, and stock options
- Total compensation evaluation

🏢 **Company & Culture:**
- Company culture assessment
- Work-life balance evaluation
- Relocation considerations
- Remote work opportunities

💡 **Skills & Learning:**
- Skill gap analysis
- Learning resources & certifications
- Bootcamps vs. self-study
- Degree programs & ROI

🤝 **Networking & Growth:**
- LinkedIn optimization
- Professional networking strategies
- Building your personal brand
- Side projects & freelancing

⚖️ **Work-Life Topics:**
- Avoiding burnout
- Handling rejection
- Employment gaps
- Career breaks

**Just ask me anything!** Examples:
- "How do I negotiate salary?"
- "Should I get a bootcamp or self-study?"
- "How do I explain my employment gap?"
- "What's the best way to network?"
- "How can I transition to a senior role?"

What would you like to know?`);
        setIsTyping(false);
        return;
      }

      // If in guided flow
      if (currentStep === 'skills') {
        // Extract skills from message
        const skills = message.split(',').map(s => s.trim());
        setUserProfile(prev => ({ ...prev, skills }));
        
        addMessage('ai', `Great! I've noted these skills: ${skills.join(', ')}.\n\nNow, which companies are you interested in working for? (You can name specific companies or types of companies)`);
        
        setTimeout(() => {
          setCurrentStep('companies');
          addMessage('ai', 'Here are some popular choices:', 'suggestion', [
            'Google, Microsoft, Amazon',
            'Startups (Early Stage)',
            'Fortune 500 Companies',
            'Tech Unicorns (Stripe, Databricks)',
            'Remote-First Companies'
          ]);
        }, 1000);
      } 
      else if (currentStep === 'companies') {
        const companies = message.split(',').map(c => c.trim());
        setUserProfile(prev => ({ ...prev, targetCompanies: companies }));
        
        addMessage('ai', `Perfect! You're targeting: ${companies.join(', ')}.\n\nWhat job roles are you looking for?`);
        
        setTimeout(() => {
          setCurrentStep('roles');
          addMessage('ai', 'Select or type your target roles:', 'suggestion', [
            'Software Engineer',
            'Senior Frontend Developer',
            'Full Stack Developer',
            'Engineering Manager',
            'Product Manager',
            'Data Scientist'
          ]);
        }, 1000);
      }
      else if (currentStep === 'roles') {
        const roles = message.split(',').map(r => r.trim());
        setUserProfile(prev => ({ ...prev, targetRoles: roles }));
        
        addMessage('ai', `Excellent! You're targeting these roles: ${roles.join(', ')}.\n\nLet me analyze your profile and provide personalized recommendations...`);
        
        setTimeout(() => {
          setCurrentStep('advice');
          generatePersonalizedAdvice({ ...userProfile, targetRoles: roles });
        }, 2000);
      }
      else if (currentStep === 'advice' || currentStep === 'intro') {
        // Handle all types of questions in free-form mode
        handleOpenEndedQuestion(message);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const handleOpenEndedQuestion = (question: string) => {
    const lowerQ = question.toLowerCase();
    
    // Job search related
    if (lowerQ.includes('job') && (lowerQ.includes('find') || lowerQ.includes('search') || lowerQ.includes('looking'))) {
      const response = `🔍 **Job Search Strategy:**

**Where to Look:**
- LinkedIn (Set job alerts for your keywords)
- Company career pages directly
- AngelList (for startups)
- Built In (for tech companies)
- Industry-specific job boards

**Optimize Your Profile:**
- Update LinkedIn with keywords
- Build a portfolio/GitHub presence
- Network actively (reach out to 5 people/week)
- Join relevant Slack/Discord communities

**Application Tips:**
- Apply within 24 hours of posting
- Customize each application
- Follow up after 1 week
- Track applications in a spreadsheet

${userProfile.targetRoles.length > 0 ? `\nFor ${userProfile.targetRoles[0]} roles, focus on companies that match your skills: ${userProfile.skills.join(', ')}` : ''}

Would you like me to help you find matching jobs now?`;
      
      addMessage('ai', response, 'action', undefined, [
        { label: '🔍 Find Matching Jobs', value: 'jobs' },
        { label: '💡 More Tips', value: 'tips' }
      ]);
      return;
    }

    // Resume questions
    if (lowerQ.includes('resume') || lowerQ.includes('cv')) {
      provideFollowUpAdvice(question);
      return;
    }

    // Interview questions
    if (lowerQ.includes('interview')) {
      provideFollowUpAdvice(question);
      return;
    }

    // Salary questions
    if (lowerQ.includes('salary') || lowerQ.includes('compensation') || lowerQ.includes('pay') || lowerQ.includes('money')) {
      provideFollowUpAdvice(question);
      return;
    }

    // Skills questions
    if (lowerQ.includes('skill') || lowerQ.includes('learn') || lowerQ.includes('improve')) {
      const response = `📚 **Skills Development Strategy:**

**Identify Priority Skills:**
${userProfile.targetRoles.length > 0 ? 
`For ${userProfile.targetRoles[0]}, focus on:
- Technical depth in ${userProfile.skills[0] || 'your core technology'}
- System design and architecture
- Problem-solving abilities
- Communication skills` :
`- Research job descriptions for your target role
- Identify 3-5 must-have technical skills
- Find 2-3 soft skills that appear frequently`}

**Learning Resources:**
- **Free:** FreeCodeCamp, Coursera Audit, YouTube
- **Paid:** Udemy ($10-20), Pluralsight, Frontend Masters
- **Practice:** LeetCode, HackerRank, Build projects
- **Community:** Join tech communities, find mentors

**Learning Plan:**
- Dedicate 1-2 hours daily
- Build 2-3 portfolio projects
- Contribute to open source
- Write blog posts about what you learn

What specific skill would you like to focus on?`;
      
      addMessage('ai', response);
      return;
    }

    // Career change questions
    if (lowerQ.includes('career change') || lowerQ.includes('switch career') || lowerQ.includes('transition')) {
      const response = `🔄 **Career Transition Guide:**

**Step 1: Assess Transferable Skills**
- Project management experience
- Communication & leadership
- Problem-solving abilities
- Technical skills you can leverage

**Step 2: Bridge the Gap**
- Take online courses (3-6 months intensive)
- Build portfolio projects (2-3 substantial ones)
- Network with people in target field
- Consider bootcamps if needed

**Step 3: Position Yourself**
- Write a compelling career change story
- Highlight transferable skills on resume
- Focus on projects over past job titles
- Target companies open to career changers

**Step 4: Start Applying**
- Apply to 10-15 roles per week
- Network your way in (70% of jobs are hidden)
- Consider contract/freelance to build experience
- Be patient (transitions take 6-12 months)

What field are you transitioning to?`;
      
      addMessage('ai', response);
      return;
    }

    // Remote work questions
    if (lowerQ.includes('remote') || lowerQ.includes('work from home') || lowerQ.includes('wfh')) {
      const response = `🏠 **Remote Job Search Tips:**

**Best Platforms for Remote Jobs:**
- We Work Remotely
- Remote.co
- FlexJobs (paid but vetted)
- AngelList (filter for remote)
- LinkedIn (use remote filter)

**Remote-First Companies:**
- GitLab, Automattic, Buffer, Zapier
- GitHub, Elastic, InVision
- Many startups are fully remote now

**Stand Out for Remote Roles:**
- Highlight previous remote experience
- Show self-management skills
- Demonstrate async communication ability
- Set up professional home office

**Application Strategy:**
- Mention timezone flexibility
- Showcase collaboration tools experience
- Emphasize results/outcomes
- Prepare for video interview etiquette

${userProfile.skills.length > 0 ? `\nWith skills in ${userProfile.skills.join(', ')}, you're well-positioned for remote work!` : ''}

Would you like help finding remote opportunities?`;
      
      addMessage('ai', response, 'action', undefined, [
        { label: '🔍 Find Remote Jobs', value: 'jobs' }
      ]);
      return;
    }

    // Networking questions
    if (lowerQ.includes('network') || lowerQ.includes('linkedin') || lowerQ.includes('connect')) {
      const response = `🤝 **Networking Strategy:**

**LinkedIn Optimization:**
- Professional headshot
- Compelling headline (not just job title)
- Detailed "About" section with keywords
- Showcase projects and achievements
- Get recommendations from colleagues

**How to Connect:**
1. Send personalized connection requests
2. Mention mutual interests/groups
3. Don't immediately ask for favors
4. Engage with their content first
5. Offer value before asking

**Coffee Chat Template:**
"Hi [Name], I admire your work in [field]. I'm exploring opportunities in [area] and would love to learn from your experience. Would you have 15 minutes for a quick chat?"

**Events & Communities:**
- Attend meetups (Meetup.com)
- Join Discord/Slack communities
- Contribute to open source
- Write/share content in your field

**Goal:** Connect with 5-10 new people per week

Want me to help you optimize your LinkedIn profile?`;
      
      addMessage('ai', response);
      return;
    }

    // Company culture questions
    if (lowerQ.includes('culture') || lowerQ.includes('company fit') || lowerQ.includes('work environment')) {
      const response = `🏢 **Assessing Company Culture:**

**Research Before Applying:**
- Glassdoor reviews (read the details, not just ratings)
- LinkedIn employee posts
- Company blog and social media
- Tech talks and open source contributions

**Questions to Ask in Interviews:**
- "How would you describe the team culture?"
- "What does work-life balance look like here?"
- "How do you support professional development?"
- "What's the process for promotions/raises?"
- "How does the team handle disagreements?"

**Red Flags:**
- High turnover (check LinkedIn)
- Vague answers about culture
- Aggressive "hustle culture" messaging
- No clear growth path
- Poor Glassdoor reviews about management

**Green Flags:**
- Transparent communication
- Clear values and mission
- Investment in employee growth
- Flexible work arrangements
- Diverse and inclusive team

${userProfile.targetCompanies.length > 0 ? `\nFor companies like ${userProfile.targetCompanies[0]}, research their engineering blogs and employee testimonials!` : ''}

What type of work environment are you looking for?`;
      
      addMessage('ai', response);
      return;
    }    // Portfolio/GitHub questions
    if (lowerQ.includes('portfolio') || lowerQ.includes('github') || lowerQ.includes('projects')) {
      const response = `💼 **Building Your Portfolio:**

**Essential Projects (Pick 2-3):**
1. **Full-Stack Application**
   - E-commerce site, social app, etc.
   - Shows end-to-end development skills
   - Deploy it live (Vercel, Netlify, Heroku)

2. **Technical Showcase**
   - Algorithm visualizer, data dashboard
   - Demonstrates problem-solving
   - Clean, documented code

3. **Personal Project**
   - Solve a real problem you care about
   - Shows passion and initiative
   - Tells your story

**GitHub Best Practices:**
- ✅ Clean README with project description
- ✅ Screenshots/demo GIF
- ✅ Live demo link
- ✅ Installation instructions
- ✅ Tech stack clearly listed
- ✅ Commit history shows your process

**Portfolio Website:**
- About section (your story)
- Projects with descriptions
- Skills/technologies
- Contact information
- Blog (optional but impressive)

**Pro Tips:**
- Quality over quantity (3 great projects > 10 mediocre ones)
- Show your code review/PR skills
- Contribute to open source
- Write good commit messages

Need help deciding what to build?`;
      
      addMessage('ai', response);
      return;
    }

    // Cover letter questions
    if (lowerQ.includes('cover letter') || lowerQ.includes('application letter')) {
      const response = `✉️ **Cover Letter Writing Guide:**

**Structure (3-4 paragraphs):**

**1. Opening Hook:**
"I'm excited to apply for [Role] at [Company]. With ${userProfile.skills.length > 0 ? userProfile.skills.slice(0, 2).join(' and ') : 'my technical'} expertise and passion for [company mission], I believe I'd be a great fit."

**2. Why You're Qualified:**
- Highlight 2-3 key achievements
- Connect your skills to job requirements
- Quantify impact (metrics, results)

**3. Why This Company:**
- Show genuine interest (specific product/value)
- Reference recent news or initiatives
- Align with company culture

**4. Closing:**
- Express enthusiasm
- Call to action (looking forward to discussing)
- Thank them for consideration

**Pro Tips:**
- Keep it under 300 words
- Match tone to company culture (formal vs. casual)
- Customize each letter (no templates!)
- Address hiring manager by name if possible
- Proofread multiple times

${userProfile.targetCompanies.length > 0 ? `\nFor ${userProfile.targetCompanies[0]}, research their mission and recent projects to personalize your letter!` : ''}

Need help writing one?`;
      
      addMessage('ai', response);
      return;
    }

    // Work-life balance questions
    if (lowerQ.includes('work life balance') || lowerQ.includes('burnout') || lowerQ.includes('hours')) {
      const response = `⚖️ **Work-Life Balance Assessment:**

**Red Flags to Watch For:**
- "We work hard, play hard" (often means long hours)
- Unlimited PTO (people often take less)
- Expected to respond to messages after hours
- No mention of boundaries in interview
- Employees look stressed/tired

**Green Flags:**
- Clear PTO policy (and people actually use it)
- Flexible work arrangements
- "No meeting" days or focus time blocks
- Emphasis on sustainable pace
- Management respects boundaries

**Questions to Ask:**
- "What does a typical day/week look like?"
- "How does the team handle on-call/urgent issues?"
- "What's your PTO policy and usage rate?"
- "How do you prevent burnout?"
- "What are the expectations for availability?"

**Industries Known for Better Balance:**
- Enterprise companies (vs. startups)
- Government/non-profit tech roles
- Companies with mature products
- European companies (better labor laws)

**During Job Search:**
- Prioritize companies with good Glassdoor work-life ratings
- Look for "family-friendly" or "sustainable pace" mentions
- Consider remote roles for flexibility

Remember: No job is worth sacrificing your health!`;
      
      addMessage('ai', response);
      return;
    }

    // Benefits and perks questions
    if (lowerQ.includes('benefit') || lowerQ.includes('perks') || lowerQ.includes('401k') || lowerQ.includes('insurance')) {
      const response = `💎 **Understanding Benefits & Compensation:**

**Standard Benefits (Must-Have):**
- Health/dental/vision insurance
- 401(k) with company match (aim for 4-6%)
- Paid time off (15-20 days minimum)
- Sick leave and family leave
- Life and disability insurance

**Tech Industry Perks:**
- Stock options/RSUs (can be significant!)
- Learning & development budget ($1000-5000/year)
- Home office stipend (remote roles)
- Commuter benefits or parking
- Gym membership or wellness programs
- Catered meals (for office roles)

**Questions to Ask:**
- "What does the total compensation package include?"
- "How does the equity/stock plan work?"
- "What's the vesting schedule?"
- "Do you offer professional development funds?"
- "What's included in health insurance?"

**Evaluating Offers:**
- Base salary is just one piece
- Equity can be worth a lot (or nothing)
- Good health insurance saves thousands
- 401(k) match is free money
- Calculate total compensation package

**For Startups:**
- Higher risk, potentially higher equity reward
- Benefits may be more basic
- Ask about burn rate and runway

${userProfile.targetCompanies.length > 0 ? `\nLarge companies like ${userProfile.targetCompanies[0]} typically have comprehensive benefits packages!` : ''}

Want help evaluating a job offer?`;
      
      addMessage('ai', response);
      return;
    }

    // Industry-specific advice
    if (lowerQ.includes('fintech') || lowerQ.includes('finance') || lowerQ.includes('banking') || 
        lowerQ.includes('healthcare') || lowerQ.includes('biotech') || 
        lowerQ.includes('gaming') || lowerQ.includes('game dev') ||
        lowerQ.includes('crypto') || lowerQ.includes('blockchain')) {
      const response = `🏭 **Industry-Specific Career Advice:**

${lowerQ.includes('fintech') || lowerQ.includes('finance') || lowerQ.includes('banking') ? `
**FinTech/Finance:**
- High compensation, competitive
- Need to understand financial concepts
- Security and compliance crucial
- Companies: Stripe, Square, Plaid, traditional banks
- Skills: Python, Java, security, distributed systems` : ''}

${lowerQ.includes('healthcare') || lowerQ.includes('biotech') ? `
**HealthTech/BioTech:**
- Meaningful impact on lives
- Heavy regulation (HIPAA, FDA)
- Growing field with good job security
- Companies: Epic Systems, Cerner, health startups
- Skills: Data privacy, interoperability standards` : ''}

${lowerQ.includes('gaming') || lowerQ.includes('game dev') ? `
**Gaming Industry:**
- Passion-driven, creative work
- Can be demanding (crunch time)
- Portfolio projects are essential
- Companies: Unity, Epic Games, indie studios
- Skills: C++, game engines, 3D graphics, gameplay design` : ''}

${lowerQ.includes('crypto') || lowerQ.includes('blockchain') ? `
**Crypto/Blockchain:**
- Cutting-edge, fast-moving
- High volatility in job market
- Can be very lucrative
- Companies: Coinbase, Consensys, crypto startups
- Skills: Solidity, cryptography, distributed systems` : ''}

**General Industry Tips:**
- Network within the specific industry
- Attend industry conferences/meetups
- Follow industry thought leaders
- Build projects relevant to the domain
- Learn industry-specific regulations

What specific aspect of this industry interests you?`;
      
      addMessage('ai', response);
      return;
    }

    // Relocation questions
    if (lowerQ.includes('relocat') || lowerQ.includes('move to') || lowerQ.includes('willing to move')) {
      const response = `🚚 **Relocation Considerations:**

**Popular Tech Hubs:**
- **San Francisco Bay Area**: Highest salaries, highest cost of living
- **Seattle**: Tech giants, no income tax, rainy weather
- **Austin**: Growing tech scene, affordable, great culture
- **NYC**: Finance + tech, diverse opportunities, expensive
- **Boston**: Biotech + tech, universities, cold winters
- **Denver/Boulder**: Growing scene, outdoor lifestyle
- **Remote-First**: Work from anywhere!

**Questions to Ask Employers:**
- "Do you offer relocation assistance?" ($5k-$25k typical)
- "How much time do I have to relocate?"
- "Will you help with housing search?"
- "Any partnerships with moving companies?"
- "Temp housing while I search?"

**Financial Planning:**
- Research cost of living differences
- Factor in housing, taxes, transportation
- Negotiate higher salary for HCOL areas
- Consider signing bonuses to cover moving costs

**Before You Move:**
- Visit the city first if possible
- Research neighborhoods (commute, safety, lifestyle)
- Understand state taxes
- Factor in car vs. public transit costs
- Consider climate preferences

**Red Flags:**
- Company won't offer any relocation help
- Unreasonable timeline (< 2 weeks)
- Won't help with temporary housing

**Alternative:**
- Negotiate remote work
- Request periodic office visits
- Look for remote-first companies

${userProfile.targetCompanies.length > 0 ? `\n${userProfile.targetCompanies[0]} typically has offices in multiple locations - worth asking about relocation or remote options!` : ''}

Where are you considering relocating to?`;
      
      addMessage('ai', response);
      return;
    }

    // Side projects and freelancing
    if (lowerQ.includes('freelanc') || lowerQ.includes('side project') || lowerQ.includes('side hustle') || 
        lowerQ.includes('consulting') || lowerQ.includes('contract work')) {
      const response = `💼 **Freelancing & Side Projects:**

**Best Platforms:**
- **Upwork**: Broad range of projects
- **Toptal**: High-end, vetted developers (25%+ acceptance)
- **Fiverr**: Quick gigs, service-based
- **Gun.io**: Tech-focused freelancing
- **Contra**: No-fee platform for independents

**Getting Started:**
1. Build a portfolio (3-5 projects)
2. Set competitive rates (start: $50-75/hr, experienced: $100-200/hr)
3. Write compelling proposals
4. Start with smaller projects to build reviews
5. Over-communicate with clients

**Side Project Ideas:**
- Build SaaS tools for niche markets
- Create developer tools/libraries
- Content creation (blog, YouTube, courses)
- Open source with sponsorships
- Mobile apps with ads/subscriptions

**Pros:**
- Extra income ($500-$5000+/month possible)
- Build diverse portfolio
- Network expansion
- Entrepreneurial skills
- Flexibility

**Cons:**
- Time commitment (evenings/weekends)
- Client management overhead
- Inconsistent income
- Taxes more complex (1099)
- Potential burnout

**Legal Considerations:**
- Check employment contract for restrictions
- Some companies prohibit moonlighting
- May need to register as LLC
- Set aside 25-30% for taxes
- Consider business insurance

**Work-Life Balance:**
- Set clear boundaries (max 10-15 hrs/week)
- Don't sacrifice your main job
- Be transparent with clients about availability
- Learn to say no

${userProfile.skills.length > 0 ? `\nWith skills in ${userProfile.skills.join(', ')}, you could freelance or build SaaS products!` : ''}

Want specific advice on getting started?`;
      
      addMessage('ai', response);
      return;
    }

    // Career growth and promotion
    if (lowerQ.includes('promotion') || lowerQ.includes('career growth') || lowerQ.includes('advance') || 
        lowerQ.includes('senior') || lowerQ.includes('lead role')) {
      const response = `📈 **Career Growth & Promotion Strategy:**

**Timeline (Typical):**
- Junior → Mid-level: 2-3 years
- Mid-level → Senior: 3-5 years
- Senior → Staff/Lead: 4-6 years
- Lead → Principal/Architect: 5+ years

**What Companies Look For:**
- **Technical Excellence**: Deep expertise in your domain
- **Impact**: Measurable contributions to product/business
- **Leadership**: Mentoring, leading projects
- **Communication**: Writing docs, presenting ideas
- **Initiative**: Identifying and solving problems
- **Scope**: Working across teams/products

**Action Plan:**
1. **Have "The Conversation"**
   - Ask manager: "What do I need for next level?"
   - Request promotion timeline
   - Get specific, measurable goals

2. **Document Your Impact**
   - Keep a "brag document" of achievements
   - Quantify results (performance, efficiency gains)
   - Track project leadership

3. **Expand Your Scope**
   - Take on stretch projects
   - Mentor junior engineers
   - Lead design reviews
   - Cross-team collaboration

4. **Build Visibility**
   - Present at team meetings
   - Write technical docs/blog posts
   - Contribute to open source
   - Speak at meetups/conferences

5. **Develop Missing Skills**
   - System design for senior roles
   - Leadership for lead roles
   - Strategy for staff+ roles

**When to Switch Companies:**
- Blocked from promotion (no headcount, politics)
- Faster growth elsewhere (title + salary bump)
- Average: 20-30% raise when switching
- Can jump levels (Mid → Senior at new company)

**Red Flags:**
- "Not ready" without specific feedback
- Constantly moving goalposts
- No clear promotion criteria
- Politics over merit

${userProfile.targetRoles.length > 0 ? `\nFor ${userProfile.targetRoles[0]} → Senior, focus on system design and cross-team leadership!` : ''}

Want specific advice on your next step?`;
      
      addMessage('ai', response);
      return;
    }

    // Dealing with rejection
    if (lowerQ.includes('reject') || lowerQ.includes('didn\'t get') || lowerQ.includes('failed interview') || 
        lowerQ.includes('no offer') || lowerQ.includes('turned down')) {
      const response = `💪 **Handling Rejection & Staying Motivated:**

**First: This is NORMAL**
- Average: 100-200 applications → 10-20 responses → 2-5 offers
- Even experienced engineers get rejected regularly
- Top candidates get rejected for random reasons
- It's a numbers game + luck + timing

**Why Rejections Happen:**
- ❌ Not the right fit (skills mismatch)
- ❌ Internal candidate already selected
- ❌ Timing (hiring freeze, budget cuts)
- ❌ Interview performance (everyone has bad days)
- ❌ Purely random (interviewer's mood)

**What To Do After Rejection:**

1. **Request Feedback** (politely)
   - "Thanks for the opportunity. I'd appreciate any feedback to improve."
   - Most won't respond, but some will
   - Don't argue or justify

2. **Reflect & Learn**
   - What went well?
   - What could improve?
   - Any knowledge gaps exposed?
   - Practice that topic for next time

3. **Keep Moving Forward**
   - Apply to 10-15 new places
   - Practice the weak areas
   - Update resume if needed
   - Don't dwell on it

**Staying Motivated:**
- Set daily goals (5 applications, 1 hour coding practice)
- Celebrate small wins (interview request, positive call)
- Take breaks (avoid burnout)
- Connect with peers going through same process
- Remember: It only takes ONE yes

**When Feedback is Harsh:**
- Don't take it personally
- Extract actionable insights
- Use it as fuel to improve
- Everyone has growth areas

**Timeline Reality Check:**
- Month 1: Settling into routine, getting interviews
- Month 2-3: More interviews, learning from rejections
- Month 3-6: Offers start coming (average: 3-6 months)

**Red Flags to Change Strategy:**
- 0 responses after 50+ applications → resume/LinkedIn issue
- Getting interviews but no offers → interview skills
- Getting to final rounds but no offers → negotiation/culture fit

${userProfile.targetRoles.length > 0 ? `\nFor ${userProfile.targetRoles[0]} roles, keep refining your story and technical skills!` : ''}

You've got this! Every rejection is one step closer to your yes. Want specific advice on improving your approach?`;
      
      addMessage('ai', response);
      return;
    }

    // Employment gap questions
    if (lowerQ.includes('gap') || lowerQ.includes('unemployment') || lowerQ.includes('career break') || 
        lowerQ.includes('time off')) {
      const response = `⏸️ **Addressing Employment Gaps:**

**First: Gaps are Increasingly Common & Accepted**
- COVID-19 normalized career breaks
- Family care, health issues, travel, learning
- Be honest but brief

**How to Address in Resume:**
- Don't hide it (they'll notice)
- Use years only (2022-2023) vs. months
- For gaps > 6 months, add a brief line

**Gap Explanations That Work:**

**1. Skills Development:**
"I took time to upskill in ${userProfile.skills[0] || 'modern technologies'}, completed online courses, and built portfolio projects."

**2. Family/Personal:**
"I took a career break to care for family. During this time, I stayed current through freelance projects and continued learning."

**3. Health:**
"I took time off to focus on my health and am now fully ready to return to work." (Don't over-explain)

**4. Layoff/Company Closure:**
"The company downsized/closed. I've been actively searching and preparing for my next role."

**5. Career Transition:**
"I took time to transition from [old field] to tech, completing a bootcamp and building projects."

**What to Do During Gaps:**
- ✅ Build side projects (adds to resume)
- ✅ Freelance/contract work (shows activity)
- ✅ Contribute to open source
- ✅ Take courses (Coursera, Udemy)
- ✅ Volunteer tech work (nonprofits)
- ✅ Write blog posts
- ✅ Stay active on LinkedIn

**What NOT to Do:**
- ❌ Fabricate employment dates (they check!)
- ❌ Over-apologize or seem defensive
- ❌ Bad-mouth previous employers
- ❌ Bring up gaps if not asked

**In Interviews:**
- Be confident and matter-of-fact
- Pivot quickly to skills and what you bring
- Show you stayed current during the gap
- Express enthusiasm about returning

**Example Response:**
"I took [X months] off for [reason]. During that time, I built ${userProfile.skills.length > 0 ? 'projects using ' + userProfile.skills[0] : 'several projects'}, completed online courses, and I'm excited to apply these skills at [Company]."

**Remember:**
- Employers care more about skills than gaps
- Show what you LEARNED during the gap
- Project confidence
- Many successful people have gaps

Need help crafting your specific explanation?`;
      
      addMessage('ai', response);
      return;
    }

    // Certifications and education
    if (lowerQ.includes('certificat') || lowerQ.includes('bootcamp') || lowerQ.includes('degree') || 
        lowerQ.includes('masters') || lowerQ.includes('course') || lowerQ.includes('education')) {
      const response = `🎓 **Certifications, Bootcamps & Education:**

**Do You Need a CS Degree?**
- **No!** Many successful devs are self-taught
- Portfolio + experience > degree for most companies
- Some companies (Google, finance) prefer degrees
- Senior roles care less about education

**Bootcamps (3-6 months):**
- **Pros**: Fast, structured, job placement help
- **Cons**: Expensive ($10k-20k), intense
- **Top Bootcamps**: App Academy, Hack Reactor, Flatiron School
- **Worth it?** Yes, if you need structure and network
- **Alternative**: Self-study (free/cheap)

**Online Courses (Self-Paced):**
- **freeCodeCamp** (Free, comprehensive)
- **The Odin Project** (Free, full-stack)
- **Codecademy** (Interactive learning)
- **Udemy** (Project-based, $10-20)
- **Frontend Masters** ($39/mo, high quality)
- **Coursera/edX** (University courses, free audit)

**Certifications Worth Getting:**
- **AWS Certified Solutions Architect** (cloud roles)
- **Google Cloud Certifications** (cloud/data)
- **Kubernetes (CKA/CKAD)** (DevOps)
- **CompTIA Security+** (security roles)
- **PMP** (project management)

**Certifications NOT Worth It:**
- Most language-specific certs (JavaScript, Python)
- Vendor-specific (unless targeting that vendor)
- "Certified Developer" from random websites

**Master's Degree:**
- **Consider if:**
  - Targeting research roles
  - Want to specialize (ML, AI, security)
  - Employer will pay for it
  - Career change from non-tech field
- **Skip if:**
  - Already working as developer
  - Just for job prospects (experience is better)
  - Have to take on debt (ROI uncertain)

**Online Degree Programs:**
- Georgia Tech OMSCS (CS Master's, $7k total!)
- UT Austin MSCS Online
- University of Illinois iMCS
- Generally worth it if affordable

**Learning Path Recommendation:**
1. **Start Free**: freeCodeCamp, YouTube, documentation
2. **Build Projects**: Apply what you learn immediately
3. **Consider Bootcamp**: If you need structure/community
4. **Certifications**: Only for specific job requirements
5. **Advanced Degree**: Only if it aligns with career goals

${userProfile.skills.length > 0 ? `\nFor ${userProfile.skills[0]}, focus on building projects rather than collecting certificates!` : ''}

What specific area are you looking to learn or certify in?`;
      
      addMessage('ai', response);
      return;
    }

    // Default intelligent response
    const response = `I understand you're asking about: "${question}"

${userProfile.targetRoles.length > 0 && userProfile.skills.length > 0 ? 
`Based on your profile (${userProfile.targetRoles[0]} with skills in ${userProfile.skills.join(', ')}), ` : 
''}Here's my advice:

**General Career Tips:**
- **Be Strategic:** Focus on quality over quantity in applications
- **Network Actively:** 70% of jobs come from connections
- **Keep Learning:** Technology evolves quickly
- **Document Progress:** Track applications and learnings
- **Stay Positive:** Job search takes time (average 3-6 months)

**Specific to Your Question:**
${generateContextualResponse(question)}

Would you like me to elaborate on any specific aspect? You can ask me about:
- 📝 Resume writing
- 💼 Interview preparation  
- 🔍 Job search strategies
- 💡 Skill development
- 🏢 Company research
- 💰 Salary negotiation
- 🤝 Networking tips`;

    addMessage('ai', response);
  };

  const generateContextualResponse = (question: string) => {
    // Provide intelligent contextual responses based on keywords
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('how') || lowerQ.includes('what')) {
      return "I can provide detailed guidance on this. Could you be more specific about what aspect you'd like to explore?";
    }
    
    if (lowerQ.includes('when') || lowerQ.includes('timeline')) {
      return "Timelines vary, but typically: Resume prep (1-2 weeks), Applications (ongoing), Interview prep (2-4 weeks), Job offer (1-3 months total).";
    }
    
    if (lowerQ.includes('where')) {
      return "The best platforms depend on your field. For tech: LinkedIn, AngelList, company sites. For general: Indeed, Glassdoor, networking events.";
    }
    
    if (lowerQ.includes('why')) {
      return "Understanding the 'why' helps you craft better stories. Employers want to see motivation, cultural fit, and long-term potential.";
    }
    
    if (lowerQ.includes('best') || lowerQ.includes('top')) {
      return `The 'best' approach depends on your unique situation${userProfile.targetRoles.length > 0 ? ` as a ${userProfile.targetRoles[0]}` : ''}. Let me help you find what works for you.`;
    }
    
    return "I'm here to help you succeed in your job search. Feel free to ask me anything specific!";
  };

  const generatePersonalizedAdvice = (profile: UserProfile) => {
    // Generate AI-powered career advice based on user profile
    const advice = `
🎯 **Career Analysis Complete!**

Based on your profile:
- **Skills:** ${profile.skills.join(', ')}
- **Target Companies:** ${profile.targetCompanies.join(', ')}
- **Target Roles:** ${profile.targetRoles.join(', ')}

Here's my personalized advice:

**1. Skill Gap Analysis** 🔍
${generateSkillGapAnalysis(profile.skills, profile.targetRoles)}

**2. Company-Specific Tips** 🏢
${generateCompanyTips(profile.targetCompanies)}

**3. Resume Optimization** 📄
- Highlight: ${profile.skills.slice(0, 3).join(', ')}
- Use keywords: "${profile.targetRoles[0]}", "scalable systems", "team collaboration"
- Quantify achievements: "Improved performance by X%", "Led team of Y engineers"

**4. Interview Preparation** 💼
Focus on these topics for ${profile.targetRoles[0]}:
- System design and architecture
- Behavioral questions (STAR method)
- Technical deep-dives in ${profile.skills[0]}

**5. Networking Strategy** 🤝
- Connect with engineers at ${profile.targetCompanies[0]} on LinkedIn
- Attend meetups for ${profile.skills[0]} developers
- Contribute to open-source projects related to ${profile.skills[1] || profile.skills[0]}

**6. Application Timeline** ⏱️
- Week 1-2: Optimize resume and LinkedIn
- Week 3-4: Start applications (aim for 10-15 companies)
- Week 5+: Practice interviews daily

Would you like specific help with any of these areas?
    `.trim();

    addMessage('ai', advice);

    setTimeout(() => {
      addMessage('ai', 'What would you like to focus on?', 'action', undefined, [
        { label: '📝 Build My Resume', value: 'resume' },
        { label: '🎯 Practice Interviews', value: 'interview' },
        { label: '🔍 Find Matching Jobs', value: 'jobs' },
        { label: '💡 More Tips', value: 'tips' }
      ]);
    }, 1000);
  };

  const generateSkillGapAnalysis = (skills: string[], roles: string[]) => {
    // Simplified skill gap analysis
    const roleRequirements: { [key: string]: string[] } = {
      'Software Engineer': ['Data Structures', 'Algorithms', 'System Design', 'Testing'],
      'Senior Frontend Developer': ['React', 'TypeScript', 'Web Performance', 'Accessibility'],
      'Full Stack Developer': ['Frontend', 'Backend', 'Database', 'API Design'],
      'Engineering Manager': ['Leadership', 'Project Management', 'Mentoring', 'Strategy'],
      'Product Manager': ['Product Strategy', 'User Research', 'Analytics', 'Roadmapping'],
      'Data Scientist': ['Machine Learning', 'Statistics', 'Python', 'SQL']
    };

    const targetRole = roles[0] || 'Software Engineer';
    const required = roleRequirements[targetRole] || roleRequirements['Software Engineer'];
    const missing = required.filter(req => !skills.some(skill => skill.toLowerCase().includes(req.toLowerCase())));

    if (missing.length === 0) {
      return `✅ Your skills align well with ${targetRole} requirements!`;
    } else {
      return `💡 Consider strengthening: ${missing.join(', ')}`;
    }
  };

  const generateCompanyTips = (companies: string[]) => {
    const tips: { [key: string]: string } = {
      'Google': 'Focus on data structures, algorithms, and system design. Practice on LeetCode.',
      'Microsoft': 'Emphasize collaborative skills and Azure experience. Study design patterns.',
      'Amazon': 'Master the Leadership Principles. Practice behavioral questions using STAR method.',
      'Startups': 'Highlight versatility and ability to wear multiple hats. Show entrepreneurial mindset.',
      'Fortune 500': 'Emphasize enterprise experience and ability to work in large organizations.',
    };

    const company = companies[0] || 'tech companies';
    const companyKey = Object.keys(tips).find(key => company.toLowerCase().includes(key.toLowerCase()));
    
    return tips[companyKey || 'Startups'] || `Research ${company}'s tech stack and recent projects. Tailor your resume accordingly.`;
  };

  const provideFollowUpAdvice = (question: string) => {
    const lowerQ = question.toLowerCase();
    let response = '';

    if (lowerQ.includes('resume') || lowerQ.includes('cv')) {
      response = `📝 **Resume Tips for ${userProfile.targetRoles[0]}:**

1. **Header:** Include your name, contact, LinkedIn, and GitHub
2. **Summary:** 2-3 sentences highlighting ${userProfile.skills.slice(0, 2).join(' and ')} experience
3. **Experience:** Use STAR format with quantified achievements
4. **Skills:** List ${userProfile.skills.join(', ')}
5. **Projects:** Include 2-3 relevant projects with tech stack

Pro tip: Use keywords from job descriptions at ${userProfile.targetCompanies[0]}!

Would you like me to help you build your resume now?`;
    } else if (lowerQ.includes('interview') || lowerQ.includes('practice')) {
      response = `🎯 **Interview Prep Strategy:**

**Technical Prep (${userProfile.skills[0]}):**
- Practice coding problems daily (LeetCode/HackerRank)
- Study system design fundamentals
- Review your past projects in depth

**Behavioral Prep:**
- Prepare 5-7 STAR stories
- Practice common questions:
  * "Tell me about yourself"
  * "Why ${userProfile.targetCompanies[0]}?"
  * "Describe a challenging project"

**Company Research:**
- Study ${userProfile.targetCompanies[0]}'s products
- Read recent tech blogs
- Prepare 3-5 thoughtful questions

Want to start a mock interview session?`;
    } else if (lowerQ.includes('salary') || lowerQ.includes('compensation')) {
      response = `💰 **Salary Negotiation Tips:**

For ${userProfile.targetRoles[0]} positions:
- Research market rates (Levels.fyi, Glassdoor)
- Consider total compensation (base + equity + bonus)
- Wait for the offer before discussing numbers
- Practice your negotiation pitch
- Know your minimum acceptable offer

Pro tip: Large companies like ${userProfile.targetCompanies[0]} have more structured bands, startups may offer more equity!`;
    } else {
      response = `I can help you with:
- 📝 Resume building and optimization
- 🎯 Interview preparation and practice
- 🔍 Job search strategy
- 💡 Career advice and planning
- 💰 Salary negotiation tips

What would you like to explore?`;
    }

    addMessage('ai', response);
  };

  const handleActionClick = (action: string) => {
    if (action === 'resume') {
      addMessage('user', 'Help me build my resume');
      addMessage('ai', `Perfect! I'll guide you to our resume builder where you can create an ATS-optimized resume with your skills: ${userProfile.skills.join(', ')}.`);
      setTimeout(() => {
        onNavigate('resume');
      }, 2000);
    } else if (action === 'interview') {
      addMessage('user', 'I want to practice interviews');
      addMessage('ai', `Great! Let's get you ready for interviews at ${userProfile.targetCompanies[0]}. I'll take you to our AI Interview Prep where you can practice real questions.`);
      setTimeout(() => {
        onNavigate('resume'); // Will go to interview prep within resume page
      }, 2000);
    } else if (action === 'jobs') {
      addMessage('user', 'Show me matching jobs');
      addMessage('ai', `Excellent! I'll find jobs matching your profile:\n- Roles: ${userProfile.targetRoles.join(', ')}\n- Skills: ${userProfile.skills.join(', ')}\n\nTaking you to job search...`);
      setTimeout(() => {
        onNavigate('home');
      }, 2000);
    } else if (action === 'tips') {
      addMessage('user', 'Give me more career tips');
      provideFollowUpAdvice('more tips');
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage('user', inputMessage);
    processUserResponse(inputMessage);
    setInputMessage('');  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addSkillChip = (skill: string) => {
    if (!userProfile.skills.includes(skill)) {
      setUserProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };
  const removeSkillChip = (skill: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  // Timer management
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setPracticeTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Voice Practice Functions
  const startVoicePractice = () => {
    setVoicePracticeActive(true);
    setPracticeMode('voice');
    setIsTimerRunning(true);
    addMessage('ai', "🎤 Voice Practice Mode Activated!\n\nI'll help you practice answering interview questions. When you're ready, click the microphone button and start speaking. I'll provide real-time feedback on your delivery, clarity, and content.\n\nTip: Speak clearly and take your time. You can ask me questions anytime during practice!");
    
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setVoiceTranscript(transcript);
      };
      
      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current?.start();
        }
      };
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      recognitionRef.current?.start();
      setIsRecording(true);
      setVoiceTranscript('');
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
      
      if (voiceTranscript) {
        addMessage('user', voiceTranscript);
        provideVoiceFeedback(voiceTranscript);
      }
    }
  };

  const provideVoiceFeedback = (transcript: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const wordCount = transcript.split(' ').length;
      const hasFillerWords = /\b(um|uh|like|you know|sort of|kind of)\b/i.test(transcript);
      
      let feedback = "🎯 **Voice Practice Feedback:**\n\n";
      feedback += `✅ **Word Count:** ${wordCount} words\n`;
      feedback += `✅ **Speech Duration:** ~${Math.round(wordCount / 2.5)} seconds\n`;
      
      if (hasFillerWords) {
        feedback += `⚠️ **Filler Words Detected:** Try to minimize 'um', 'uh', 'like' for more confident delivery\n`;
      } else {
        feedback += `✅ **Great Job:** No excessive filler words detected!\n`;
      }
      
      feedback += `\n💡 **Content Feedback:** ${analyzeContent(transcript)}`;
      feedback += `\n\n**Want to try another question?** Just ask me for a different interview question!`;
      
      setAiVoiceFeedback(feedback);
      addMessage('ai', feedback);
      setIsTyping(false);
      
      // Speak feedback if enabled
      speakFeedback(feedback);
    }, 1500);
  };

  const analyzeContent = (text: string) => {
    if (text.toLowerCase().includes('example') || text.toLowerCase().includes('instance')) {
      return "Excellent! You provided specific examples. This makes your answer more compelling.";
    } else if (text.length > 200) {
      return "Good detailed response! Consider structuring it with the STAR method (Situation, Task, Action, Result).";
    } else if (text.length < 50) {
      return "Your answer is brief. Try to elaborate more with specific examples and details.";
    }
    return "Good answer! Consider adding more specific examples to strengthen your response.";
  };

  const speakFeedback = (text: string) => {
    if ('speechSynthesis' in window && isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#✅⚠️💡🎯]/g, ''));
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAIVoice = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      addMessage('ai', "🔊 AI Voice enabled! I'll speak my responses to you.");
    } else {
      window.speechSynthesis.cancel();
      addMessage('ai', "🔇 AI Voice disabled.");
    }
  };

  // Video Mock Interview Functions
  const startVideoInterview = async () => {
    setVideoInterviewActive(true);
    setPracticeMode('video');
    setIsTimerRunning(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      addMessage('ai', "🎥 Video Mock Interview Mode Activated!\n\nYou're now recording video. I'll ask you interview questions and provide feedback on your verbal and non-verbal communication.\n\n**First Question:** Tell me about yourself and your background.\n\nClick 'Start Recording' when ready!");
      setInterviewQuestion("Tell me about yourself and your background.");
    } catch (err) {
      console.error('Error accessing camera:', err);
      addMessage('ai', "❌ Unable to access camera. Please grant camera permissions and try again.");
      setVideoInterviewActive(false);
    }
  };

  const toggleVideoRecording = () => {
    if (!isVideoRecording && videoStream) {
      const mediaRecorder = new MediaRecorder(videoStream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsVideoRecording(true);
      
      // Auto-stop after 2 minutes
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopVideoRecording();
        }
      }, 120000);
    } else {
      stopVideoRecording();
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isVideoRecording) {
      mediaRecorderRef.current.stop();
      setIsVideoRecording(false);
      
      setTimeout(() => {
        provideVideoFeedback();
      }, 1000);
    }
  };

  const provideVideoFeedback = () => {
    setIsTyping(true);
    setTimeout(() => {
      const feedback = `🎥 **Video Interview Feedback:**

✅ **Recording Duration:** ${formatTime(practiceTimer)}

**Performance Analysis:**
- ✅ Maintained good eye contact (looking at camera)
- ✅ Professional background and lighting
- 💡 Consider smiling more to appear approachable
- 💡 Hand gestures were good - keep them natural

**Content Feedback:**
Your answer was well-structured! Here are some tips:
- Use the STAR method for behavioral questions
- Include specific metrics/results when possible
- Practice common questions 3-5 times before interviews

**Next Steps:**
- Practice another question
- Download your recording for review
- Get AI feedback on body language

Would you like to try another question?`;
      
      addMessage('ai', feedback);
      setVideoFeedback(feedback);
      setIsTyping(false);
    }, 2000);
  };

  const downloadVideo = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interview-practice-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      addMessage('ai', "✅ Video downloaded! Review it to improve your performance.");
    }
  };

  const stopVideoInterview = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setVideoInterviewActive(false);
    setIsVideoRecording(false);
    setRecordedChunks([]);
    setIsTimerRunning(false);
    setPracticeTimer(0);
  };

  const getNewInterviewQuestion = () => {
    const questions = [
      "Tell me about a time you faced a challenging project. How did you handle it?",
      "What are your greatest strengths and how do they apply to this role?",
      "Describe a situation where you disagreed with a team member. How did you resolve it?",
      "Where do you see yourself in 5 years?",
      "Why do you want to work for our company?",
      "Tell me about a time you failed. What did you learn?",
      "How do you handle stress and pressure?",
      "What makes you a good fit for this position?",
      "Describe your ideal work environment.",
      "What's your approach to learning new technologies or skills?"
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setInterviewQuestion(randomQuestion);
    addMessage('ai', `📋 **New Question:** ${randomQuestion}\n\nTake your time to think, then click record when ready!`);
  };

  // Split Screen Mode
  const enableSplitMode = () => {
    setPracticeMode('split');
    addMessage('ai', "🔀 Split Screen Mode enabled! Now you can practice voice/video while chatting with me simultaneously. Ask me anything during your practice session!");
  };

  const resetPractice = () => {
    setVoicePracticeActive(false);
    setVideoInterviewActive(false);
    setPracticeMode('chat');
    setIsTimerRunning(false);
    setPracticeTimer(0);
    setIsRecording(false);
    setIsVideoRecording(false);
    setVoiceTranscript('');
    
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    
    addMessage('ai', "Practice session reset! What would you like to do next?");
  };

  if (!conversationStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <PageHeader userName={userName} currentPage="interaction" onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-bounce">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              AI Career Advisor
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get personalized career guidance based on your skills, target companies, and dream roles
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">How I Can Help You</h2>
              <p className="text-lg opacity-90">
                I'll analyze your profile and provide tailored advice on:
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Skill Gap Analysis</h3>
                    <p className="text-sm text-slate-600">Identify missing skills for your target role and get learning recommendations</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Company-Specific Tips</h3>
                    <p className="text-sm text-slate-600">Get insider advice for interviewing at your target companies</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Resume Optimization</h3>
                    <p className="text-sm text-slate-600">Learn how to tailor your resume for specific roles and companies</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl border border-orange-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Career Strategy</h3>
                    <p className="text-sm text-slate-600">Get a personalized action plan to land your dream job</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={startConversation}
                  className="group bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  <Sparkles className="w-6 h-6" />
                  Start Career Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-slate-500 mt-4">
                  ⚡ Takes only 2-3 minutes • 100% Free • AI-Powered
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold text-slate-900">John Doe</p>
                <p className="text-sm text-slate-600">Got job at Google</p>
              </div>
            </div>
            <p className="text-slate-700 italic">
              "The AI Career Advisor helped me identify skill gaps and gave me specific advice for Google interviews. I got the offer in 6 weeks!"
            </p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <PageHeader userName={userName} currentPage="interaction" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Summary */}
        {(userProfile.skills.length > 0 || userProfile.targetCompanies.length > 0 || userProfile.targetRoles.length > 0) && (
          <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Your Profile Summary</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {userProfile.skills.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {userProfile.targetCompanies.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Target Companies</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.targetCompanies.map((company, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {userProfile.targetRoles.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Target Roles</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.targetRoles.map((role, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Practice Mode Selector */}
        <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Practice Modes</h3>
            {isTimerRunning && (
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono font-bold text-red-600">{formatTime(practiceTimer)}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setPracticeMode('chat')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                practiceMode === 'chat' 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
              }`}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm font-semibold">Chat Only</span>
            </button>
            
            <button
              onClick={startVoicePractice}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                practiceMode === 'voice' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
              }`}
            >
              <Mic className="w-6 h-6" />
              <span className="text-sm font-semibold">Voice Practice</span>
            </button>
            
            <button
              onClick={startVideoInterview}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                practiceMode === 'video' 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-slate-200 bg-white text-slate-600 hover:border-green-300'
              }`}
            >
              <Video className="w-6 h-6" />
              <span className="text-sm font-semibold">Video Mock</span>
            </button>
            
            <button
              onClick={enableSplitMode}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                practiceMode === 'split' 
                  ? 'border-orange-500 bg-orange-50 text-orange-700' 
                  : 'border-slate-200 bg-white text-slate-600 hover:border-orange-300'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm font-semibold">Split Screen</span>
            </button>
          </div>

          {(voicePracticeActive || videoInterviewActive) && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={resetPractice}
                className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Practice
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area - Split or Single View */}
        <div className={`grid gap-6 ${practiceMode === 'split' && (voicePracticeActive || videoInterviewActive) ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          
          {/* Voice Practice Panel */}
          {voicePracticeActive && (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-200">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Mic className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Voice Practice</h2>
                      <p className="text-sm opacity-90">{isRecording ? 'Recording...' : 'Ready to practice'}</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleAIVoice}
                    className={`p-3 rounded-full transition-colors ${
                      isSpeaking ? 'bg-white/30' : 'bg-white/10'
                    }`}
                  >
                    {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className={`mb-6 p-4 rounded-xl border-2 ${
                  isRecording ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {isRecording ? '🎤 Listening...' : '⏸️ Paused'}
                    </span>
                    <button
                      onClick={toggleVoiceRecording}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {isRecording ? (
                        <><StopCircle className="w-4 h-4" /> Stop</>
                      ) : (
                        <><Mic className="w-4 h-4" /> Start Recording</>
                      )}
                    </button>
                  </div>
                  
                  {voiceTranscript && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                      <p className="text-xs font-semibold text-slate-500 mb-1">Live Transcript:</p>
                      <p className="text-sm text-slate-800">{voiceTranscript}</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Practice Questions:</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => addMessage('ai', "Great! Let's practice: 'Tell me about yourself.' Take your time and start when ready!")}
                      className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors"
                    >
                      📝 Tell me about yourself
                    </button>
                    <button
                      onClick={() => addMessage('ai', "Perfect! Let's practice: 'What are your strengths?' Start recording when ready!")}
                      className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors"
                    >
                      💪 What are your strengths?
                    </button>
                    <button
                      onClick={() => addMessage('ai', "Let's do this one: 'Why do you want this job?' Click record and begin!")}
                      className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors"
                    >
                      🎯 Why do you want this job?
                    </button>
                  </div>
                </div>

                {aiVoiceFeedback && (
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-xs font-semibold text-green-700 mb-2">✅ Latest Feedback:</p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{aiVoiceFeedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Video Mock Interview Panel */}
          {videoInterviewActive && (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-200">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Video Mock Interview</h2>
                      <p className="text-sm opacity-90">{isVideoRecording ? 'Recording' : 'Ready'}</p>
                    </div>
                  </div>
                  <button
                    onClick={stopVideoInterview}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 relative bg-slate-900 rounded-xl overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {isVideoRecording && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-semibold">REC</span>
                    </div>
                  )}
                </div>

                {interviewQuestion && (
                  <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <p className="text-xs font-semibold text-blue-700 mb-2">📋 Current Question:</p>
                    <p className="text-sm font-medium text-slate-800">{interviewQuestion}</p>
                  </div>
                )}

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={toggleVideoRecording}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      isVideoRecording 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isVideoRecording ? (
                      <><StopCircle className="w-5 h-5" /> Stop Recording</>
                    ) : (
                      <><Play className="w-5 h-5" /> Start Recording</>
                    )}
                  </button>
                  
                  {recordedChunks.length > 0 && (
                    <button
                      onClick={downloadVideo}
                      className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={getNewInterviewQuestion}
                  className="w-full px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  🎲 Get New Question
                </button>

                {videoFeedback && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-xs font-semibold text-green-700 mb-2">✅ Performance Feedback:</p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{videoFeedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 ${
            practiceMode === 'split' && (voicePracticeActive || videoInterviewActive) ? 'h-[800px]' : ''
          }`}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Career Advisor</h2>
                  <p className="text-sm opacity-90">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.role === 'ai' && <Sparkles className="w-4 h-4 text-purple-600" />}
                        <span className="text-xs font-semibold opacity-75">
                          {message.role === 'user' ? userName : 'AI Advisor'}
                        </span>
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors border border-purple-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {message.actions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(action.value)}
                              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                      <span className="text-sm text-slate-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 p-4 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                💡 Tip: Be specific about your skills and career goals for better advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInteractionNew;
