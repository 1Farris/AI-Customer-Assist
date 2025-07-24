// SmartHome+ Product Information and FAQ Data
export const productInfo = {
  name: "SmartHome+",
  description: "AI-powered home automation system",
  company: "TechEase Innovations",
  
  features: [
    "Voice-controlled smart devices",
    "Automated lighting and climate control",
    "Security monitoring and alerts",
    "Energy efficiency optimization",
    "Mobile app integration",
    "AI-powered learning and adaptation"
  ],
  
  commonIssues: [
    {
      category: "Setup",
      keywords: ["setup", "installation", "configure", "connect"],
      issues: [
        "Device not connecting to WiFi",
        "App not recognizing devices",
        "Initial setup wizard problems"
      ]
    },
    {
      category: "Connectivity",
      keywords: ["connection", "wifi", "network", "offline"],
      issues: [
        "Devices going offline",
        "Network connectivity issues",
        "Bluetooth pairing problems"
      ]
    },
    {
      category: "Voice Control",
      keywords: ["voice", "alexa", "google", "commands"],
      issues: [
        "Voice commands not working",
        "Integration with voice assistants",
        "Command recognition problems"
      ]
    },
    {
      category: "Mobile App",
      keywords: ["app", "mobile", "phone", "tablet"],
      issues: [
        "App crashes or freezes",
        "Login problems",
        "Notification issues"
      ]
    },
    {
      category: "Automation",
      keywords: ["automation", "schedule", "routine", "scene"],
      issues: [
        "Scheduled tasks not running",
        "Automation rules not working",
        "Scene activation problems"
      ]
    }
  ],
  
  faq: [
    {
      question: "How do I reset my SmartHome+ device?",
      answer: "To reset your device, hold the reset button for 10 seconds until the LED flashes red. Then follow the setup process in the app."
    },
    {
      question: "Why isn't my device responding to voice commands?",
      answer: "Check that your device is connected to WiFi, the microphone isn't muted, and you're using the correct wake word. Try retraining voice recognition in the app."
    },
    {
      question: "How do I add a new device to my system?",
      answer: "Open the SmartHome+ app, tap the '+' icon, select 'Add Device', and follow the on-screen instructions to connect your new device."
    },
    {
      question: "What should I do if my automation isn't working?",
      answer: "Check that all devices in the automation are online, verify the trigger conditions are met, and ensure the automation is enabled in the app."
    },
    {
      question: "How can I improve my system's energy efficiency?",
      answer: "Use the Energy Insights feature in the app to identify high-consumption devices and set up smart schedules to optimize usage during off-peak hours."
    }
  ]
};

export const escalationTriggers = [
  "billing",
  "refund",
  "warranty",
  "replacement",
  "technical support",
  "speak to human",
  "manager",
  "complaint",
  "legal",
  "cancel subscription"
];

