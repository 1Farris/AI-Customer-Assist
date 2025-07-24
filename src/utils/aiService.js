import { productInfo, escalationTriggers } from '../data/productInfo.js';

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    this.apiBase = import.meta.env.VITE_OPENAI_API_BASE || process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
  }

  // Check if query should be escalated to human agent
  shouldEscalate(query) {
    const lowerQuery = query.toLowerCase();
    return escalationTriggers.some(trigger => lowerQuery.includes(trigger));
  }

  // Categorize the customer query
  categorizeQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    for (const category of productInfo.commonIssues) {
      if (category.keywords.some(keyword => lowerQuery.includes(keyword))) {
        return category.category;
      }
    }
    
    return 'General';
  }

  // Generate contextual prompt with product information
  generatePrompt(query, category) {
    const roleInstruction = `You are a helpful customer support agent at TechEase Innovations, specializing in the SmartHome+ AI-powered home automation system.`;
    
    const contextInfo = `
Product Information:
- Product: ${productInfo.name} - ${productInfo.description}
- Company: ${productInfo.company}
- Key Features: ${productInfo.features.join(', ')}

Category: ${category}
`;

    const relevantFAQ = productInfo.faq
      .filter(faq => faq.question.toLowerCase().includes(query.toLowerCase().split(' ')[0]) || 
                     faq.answer.toLowerCase().includes(query.toLowerCase().split(' ')[0]))
      .slice(0, 2);

    const faqContext = relevantFAQ.length > 0 ? `
Relevant FAQ:
${relevantFAQ.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}
` : '';

    const guidelines = `
Guidelines:
- Be friendly, professional, and empathetic
- Provide clear, step-by-step solutions when possible
- If you cannot resolve the issue, politely suggest escalation to a human agent
- Keep responses concise but comprehensive
- Always end with asking if there's anything else you can help with
- Label your response as "AI Assistant Response" at the beginning
`;

    return `${roleInstruction}

${contextInfo}
${faqContext}
${guidelines}

Customer Query: ${query}

Please provide a helpful response:`;
  }

  // Generate AI response using OpenAI API
  async generateResponse(query) {
    try {
      // Check for escalation first
      if (this.shouldEscalate(query)) {
        return {
          response: "AI Assistant Response: I understand you need additional assistance with this matter. Let me connect you with one of our human support specialists who can better help you with this request. Please hold while I transfer your inquiry.",
          shouldEscalate: true,
          category: 'Escalation'
        };
      }

      const category = this.categorizeQuery(query);
      const prompt = this.generatePrompt(query, category);

      // If no API key is available, return a mock response
      if (!this.apiKey) {
        return this.getMockResponse(query, category);
      }

      const response = await fetch(`${this.apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        response: data.choices[0].message.content,
        shouldEscalate: false,
        category: category
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getMockResponse(query, this.categorizeQuery(query));
    }
  }

  // Mock response for demonstration when API is not available
  getMockResponse(query, category) {
    const mockResponses = {
      'Setup': "AI Assistant Response: I'd be happy to help you with the setup process! For device connection issues, please try these steps: 1) Ensure your device is within range of your WiFi router, 2) Check that you're using the correct network password, 3) Try restarting both your device and router. If the issue persists, please try the reset procedure in our troubleshooting guide. Is there anything specific about the setup process you'd like me to clarify?",
      
      'Connectivity': "AI Assistant Response: I understand you're experiencing connectivity issues. Let's troubleshoot this together: 1) Check if other devices can connect to your WiFi, 2) Verify your SmartHome+ device is powered on and within range, 3) Try restarting your router and the device. If the problem continues, there might be network interference. Would you like me to guide you through checking your network settings?",
      
      'Voice Control': "AI Assistant Response: Voice control issues can be frustrating! Here are some quick fixes: 1) Make sure the device microphone isn't muted (check for a red light), 2) Verify you're using the correct wake word, 3) Check that your voice assistant integration is properly configured in the app. You can also try retraining the voice recognition in the SmartHome+ app settings. Would you like detailed steps for any of these solutions?",
      
      'Mobile App': "AI Assistant Response: I'm sorry you're having trouble with the mobile app. Let's resolve this: 1) Try force-closing and reopening the app, 2) Check if you have the latest version installed, 3) Restart your phone if the issue persists. For login problems, ensure you're using the correct credentials and check your internet connection. Is there a specific error message you're seeing?",
      
      'Automation': "AI Assistant Response: Automation issues can usually be resolved quickly! Please check: 1) All devices in your automation are online and responsive, 2) The trigger conditions are correctly set, 3) The automation is enabled in your app. You can test individual components by manually triggering them. If a specific device isn't responding, try removing and re-adding it to the automation. Would you like me to walk you through checking any of these steps?",
      
      'General': "AI Assistant Response: Thank you for contacting SmartHome+ support! I'm here to help you with any questions about your AI-powered home automation system. Could you please provide more details about what you're experiencing? This will help me give you the most accurate assistance. Whether it's setup, connectivity, voice control, or any other feature, I'm ready to help!"
    };

    return {
      response: mockResponses[category] || mockResponses['General'],
      shouldEscalate: false,
      category: category
    };
  }
}

export default new AIService();

