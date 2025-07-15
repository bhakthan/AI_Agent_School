import { PatternData } from './types';

export const voiceAgentPattern: PatternData = {
  id: 'voice-agent',
  name: 'Voice Agent',
  description: 'Conversational AI agents that process speech input and provide voice responses with natural interaction.',
  category: 'Interface',
  useCases: ['Voice Assistants', 'Phone Support', 'Accessibility', 'Hands-Free Interaction'],
  whenToUse: 'Use Voice Agent when you need natural speech-based interaction, hands-free operation, or accessibility features. This pattern is ideal for virtual assistants, customer service bots, accessibility tools, or any application requiring voice-based user interaction.',
  nodes: [
    {
      id: 'audio-input',
      type: 'input',
      data: { label: 'Audio Input', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'speech-to-text',
      type: 'default',
      data: { label: 'Speech-to-Text', nodeType: 'tool' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'nlp-processor',
      type: 'default',
      data: { label: 'NLP Processor', nodeType: 'llm' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'intent-classifier',
      type: 'default',
      data: { label: 'Intent Classifier', nodeType: 'router' },
      position: { x: 700, y: 150 }
    },
    {
      id: 'context-manager',
      type: 'default',
      data: { label: 'Context Manager', nodeType: 'aggregator' },
      position: { x: 700, y: 250 }
    },
    {
      id: 'response-generator',
      type: 'default',
      data: { label: 'Response Generator', nodeType: 'llm' },
      position: { x: 900, y: 200 }
    },
    {
      id: 'text-to-speech',
      type: 'default',
      data: { label: 'Text-to-Speech', nodeType: 'tool' },
      position: { x: 1100, y: 200 }
    },
    {
      id: 'audio-output',
      type: 'output',
      data: { label: 'Audio Output', nodeType: 'output' },
      position: { x: 1300, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'audio-input', target: 'speech-to-text', animated: true },
    { id: 'e2-3', source: 'speech-to-text', target: 'nlp-processor', animated: true },
    { id: 'e3-4', source: 'nlp-processor', target: 'intent-classifier', animated: true },
    { id: 'e3-5', source: 'nlp-processor', target: 'context-manager', animated: true },
    { id: 'e4-6', source: 'intent-classifier', target: 'response-generator', animated: true },
    { id: 'e5-6', source: 'context-manager', target: 'response-generator', animated: true },
    { id: 'e6-7', source: 'response-generator', target: 'text-to-speech', animated: true },
    { id: 'e7-8', source: 'text-to-speech', target: 'audio-output' },
    { id: 'e5-5', source: 'context-manager', target: 'context-manager', animated: true, label: 'Update Context' }
  ],
  codeExample: `// Voice Agent implementation
import { spawn } from 'child_process';

interface VoiceConfig {
  sttProvider: 'whisper' | 'google' | 'azure';
  ttsProvider: 'elevenlabs' | 'google' | 'azure';
  language: string;
  voiceId?: string;
}

class VoiceAgent {
  private config: VoiceConfig;
  private conversationHistory: Array<{ role: string; content: string }> = [];
  private contextMemory: Map<string, any> = new Map();
  
  constructor(config: VoiceConfig) {
    this.config = config;
  }
  
  async processVoiceInput(audioBuffer: Buffer): Promise<Buffer> {
    try {
      // Step 1: Speech-to-Text
      const transcript = await this.speechToText(audioBuffer);
      
      // Step 2: Process with NLP
      const processedInput = await this.processNLP(transcript);
      
      // Step 3: Classify intent
      const intent = await this.classifyIntent(processedInput);
      
      // Step 4: Update context
      await this.updateContext(processedInput, intent);
      
      // Step 5: Generate response
      const response = await this.generateResponse(processedInput, intent);
      
      // Step 6: Text-to-Speech
      const audioResponse = await this.textToSpeech(response);
      
      // Step 7: Update conversation history
      this.updateConversationHistory(transcript, response);
      
      return audioResponse;
    } catch (error) {
      const errorResponse = await this.handleError(error);
      return await this.textToSpeech(errorResponse);
    }
  }
  
  private async speechToText(audioBuffer: Buffer): Promise<string> {
    switch (this.config.sttProvider) {
      case 'whisper':
        return await this.whisperSTT(audioBuffer);
      case 'google':
        return await this.googleSTT(audioBuffer);
      case 'azure':
        return await this.azureSTT(audioBuffer);
      default:
        throw new Error('Unsupported STT provider');
    }
  }
  
  private async whisperSTT(audioBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const whisper = spawn('whisper', ['-', '--output-format', 'txt']);
      
      let output = '';
      whisper.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      whisper.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(\`Whisper failed with code \${code}\`));
        }
      });
      
      whisper.stdin.write(audioBuffer);
      whisper.stdin.end();
    });
  }
  
  private async processNLP(text: string): Promise<any> {
    const nlpPrompt = \`
      Analyze the following user input for:
      1. Intent and purpose
      2. Named entities
      3. Sentiment
      4. Key topics
      5. Context requirements
      
      Input: "\${text}"
      
      Return JSON with: {
        "intent": "question|request|command|conversation",
        "entities": [{"type": "person", "value": "John"}],
        "sentiment": "positive|negative|neutral",
        "topics": ["topic1", "topic2"],
        "context_needed": ["previous_conversation", "user_preferences"]
      }
    \`;
    
    const response = await llm(nlpPrompt);
    return JSON.parse(response);
  }
  
  private async classifyIntent(nlpResult: any): Promise<string> {
    const intentPrompt = \`
      Based on the NLP analysis: \${JSON.stringify(nlpResult)}
      
      Classify the user's intent into one of:
      - "information_request": User wants information
      - "task_execution": User wants to perform an action
      - "conversation": User wants to chat
      - "clarification": User needs help understanding
      - "complaint": User has an issue
      - "compliment": User is expressing satisfaction
      
      Return just the intent classification.
    \`;
    
    return await llm(intentPrompt);
  }
  
  private async updateContext(input: any, intent: string): Promise<void> {
    // Update conversation context
    this.contextMemory.set('last_intent', intent);
    this.contextMemory.set('last_entities', input.entities);
    this.contextMemory.set('conversation_sentiment', input.sentiment);
    
    // Update user preferences if applicable
    if (input.topics.includes('preferences')) {
      await this.updateUserPreferences(input);
    }
  }
  
  private async generateResponse(input: any, intent: string): Promise<string> {
    const context = Array.from(this.contextMemory.entries())
      .map(([key, value]) => \`\${key}: \${JSON.stringify(value)}\`)
      .join('\\n');
    
    const responsePrompt = \`
      Generate a natural, conversational response for a voice interaction.
      
      User input analysis: \${JSON.stringify(input)}
      Intent: \${intent}
      Context: \${context}
      Conversation history: \${this.conversationHistory.slice(-5).map(h => \`\${h.role}: \${h.content}\`).join('\\n')}
      
      Requirements:
      - Natural, conversational tone
      - Appropriate for voice interaction
      - Concise but helpful
      - Match the user's sentiment appropriately
      - Use context to provide personalized responses
      
      Generate response:
    \`;
    
    return await llm(responsePrompt);
  }
  
  private async textToSpeech(text: string): Promise<Buffer> {
    switch (this.config.ttsProvider) {
      case 'elevenlabs':
        return await this.elevenlabsTTS(text);
      case 'google':
        return await this.googleTTS(text);
      case 'azure':
        return await this.azureTTS(text);
      default:
        throw new Error('Unsupported TTS provider');
    }
  }
  
  private async elevenlabsTTS(text: string): Promise<Buffer> {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/voice-id', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.ELEVENLABS_API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.8
        }
      })
    });
    
    return Buffer.from(await response.arrayBuffer());
  }
  
  private updateConversationHistory(userInput: string, response: string): void {
    this.conversationHistory.push(
      { role: 'user', content: userInput },
      { role: 'assistant', content: response }
    );
    
    // Keep only last 20 exchanges
    if (this.conversationHistory.length > 40) {
      this.conversationHistory = this.conversationHistory.slice(-40);
    }
  }
  
  private async handleError(error: Error): Promise<string> {
    console.error('Voice Agent Error:', error);
    
    const errorResponses = [
      "I'm sorry, I didn't catch that. Could you please repeat?",
      "I'm having trouble understanding. Could you rephrase that?",
      "There seems to be an issue. Let me try again.",
      "I apologize for the confusion. What would you like me to help you with?"
    ];
    
    return errorResponses[Math.floor(Math.random() * errorResponses.length)];
  }
}`,
  pythonCodeExample: `# Voice Agent implementation
import asyncio
import json
import io
import wave
from typing import Dict, Any, List, Optional
import speech_recognition as sr
import pyttsx3
from pydub import AudioSegment

class VoiceAgent:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.conversation_history = []
        self.context_memory = {}
        
        # Initialize speech recognition
        self.recognizer = sr.Recognizer()
        
        # Initialize text-to-speech
        self.tts_engine = pyttsx3.init()
        self.configure_tts()
    
    def configure_tts(self):
        """Configure text-to-speech settings."""
        voices = self.tts_engine.getProperty('voices')
        if voices:
            self.tts_engine.setProperty('voice', voices[0].id)
        
        self.tts_engine.setProperty('rate', self.config.get('speech_rate', 200))
        self.tts_engine.setProperty('volume', self.config.get('volume', 0.9))
    
    async def process_voice_input(self, audio_data: bytes) -> bytes:
        """Process voice input and return voice response."""
        try:
            # Step 1: Speech-to-Text
            transcript = await self.speech_to_text(audio_data)
            
            # Step 2: Process with NLP
            processed_input = await self.process_nlp(transcript)
            
            # Step 3: Classify intent
            intent = await self.classify_intent(processed_input)
            
            # Step 4: Update context
            await self.update_context(processed_input, intent)
            
            # Step 5: Generate response
            response = await self.generate_response(processed_input, intent)
            
            # Step 6: Text-to-Speech
            audio_response = await self.text_to_speech(response)
            
            # Step 7: Update conversation history
            self.update_conversation_history(transcript, response)
            
            return audio_response
        except Exception as error:
            error_response = await self.handle_error(error)
            return await self.text_to_speech(error_response)
    
    async def speech_to_text(self, audio_data: bytes) -> str:
        """Convert speech to text."""
        try:
            # Convert bytes to audio segment
            audio_segment = AudioSegment.from_wav(io.BytesIO(audio_data))
            
            # Convert to wav format for speech_recognition
            wav_io = io.BytesIO()
            audio_segment.export(wav_io, format="wav")
            wav_io.seek(0)
            
            # Recognize speech
            with sr.AudioFile(wav_io) as source:
                audio = self.recognizer.record(source)
            
            # Use Google Speech Recognition
            text = self.recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            raise Exception("Could not understand audio")
        except sr.RequestError as e:
            raise Exception(f"Speech recognition error: {e}")
    
    async def process_nlp(self, text: str) -> Dict[str, Any]:
        """Process text with NLP analysis."""
        nlp_prompt = f"""
        Analyze the following user input for:
        1. Intent and purpose
        2. Named entities
        3. Sentiment
        4. Key topics
        5. Context requirements
        
        Input: "{text}"
        
        Return JSON with: {{
            "intent": "question|request|command|conversation",
            "entities": [{{"type": "person", "value": "John"}}],
            "sentiment": "positive|negative|neutral",
            "topics": ["topic1", "topic2"],
            "context_needed": ["previous_conversation", "user_preferences"]
        }}
        """
        
        # Call LLM for NLP analysis
        response = await self.call_llm(nlp_prompt)
        return json.loads(response)
    
    async def classify_intent(self, nlp_result: Dict[str, Any]) -> str:
        """Classify user intent."""
        intent_prompt = f"""
        Based on the NLP analysis: {json.dumps(nlp_result)}
        
        Classify the user's intent into one of:
        - "information_request": User wants information
        - "task_execution": User wants to perform an action
        - "conversation": User wants to chat
        - "clarification": User needs help understanding
        - "complaint": User has an issue
        - "compliment": User is expressing satisfaction
        
        Return just the intent classification.
        """
        
        return await self.call_llm(intent_prompt)
    
    async def update_context(self, input_data: Dict[str, Any], intent: str):
        """Update conversation context."""
        self.context_memory.update({
            'last_intent': intent,
            'last_entities': input_data.get('entities', []),
            'conversation_sentiment': input_data.get('sentiment', 'neutral'),
            'recent_topics': input_data.get('topics', [])
        })
    
    async def generate_response(self, input_data: Dict[str, Any], intent: str) -> str:
        """Generate appropriate response."""
        context = "\\n".join([f"{k}: {v}" for k, v in self.context_memory.items()])
        
        response_prompt = f"""
        Generate a natural, conversational response for a voice interaction.
        
        User input analysis: {json.dumps(input_data)}
        Intent: {intent}
        Context: {context}
        Conversation history: {self.format_conversation_history()}
        
        Requirements:
        - Natural, conversational tone
        - Appropriate for voice interaction
        - Concise but helpful
        - Match the user's sentiment appropriately
        - Use context to provide personalized responses
        
        Generate response:
        """
        
        return await self.call_llm(response_prompt)
    
    async def text_to_speech(self, text: str) -> bytes:
        """Convert text to speech."""
        try:
            # Create a temporary file for audio output
            audio_io = io.BytesIO()
            
            # Configure TTS engine
            self.tts_engine.save_to_file(text, 'temp_audio.wav')
            self.tts_engine.runAndWait()
            
            # Read the audio file
            with open('temp_audio.wav', 'rb') as f:
                audio_data = f.read()
            
            # Clean up
            import os
            os.remove('temp_audio.wav')
            
            return audio_data
        except Exception as e:
            raise Exception(f"Text-to-speech error: {e}")
    
    def update_conversation_history(self, user_input: str, response: str):
        """Update conversation history."""
        self.conversation_history.extend([
            {'role': 'user', 'content': user_input},
            {'role': 'assistant', 'content': response}
        ])
        
        # Keep only last 20 exchanges
        if len(self.conversation_history) > 40:
            self.conversation_history = self.conversation_history[-40:]
    
    def format_conversation_history(self) -> str:
        """Format conversation history for context."""
        return "\\n".join([
            f"{h['role']}: {h['content']}" 
            for h in self.conversation_history[-10:]
        ])
    
    async def handle_error(self, error: Exception) -> str:
        """Handle errors gracefully."""
        print(f"Voice Agent Error: {error}")
        
        error_responses = [
            "I'm sorry, I didn't catch that. Could you please repeat?",
            "I'm having trouble understanding. Could you rephrase that?",
            "There seems to be an issue. Let me try again.",
            "I apologize for the confusion. What would you like me to help you with?"
        ]
        
        import random
        return random.choice(error_responses)
    
    async def call_llm(self, prompt: str) -> str:
        """Call LLM - implement based on your chosen provider."""
        # Placeholder - implement with your LLM provider
        return "LLM response"
    
    async def start_continuous_listening(self):
        """Start continuous voice interaction."""
        print("Voice Agent started. Listening...")
        
        with sr.Microphone() as source:
            self.recognizer.adjust_for_ambient_noise(source)
        
        while True:
            try:
                with sr.Microphone() as source:
                    print("Listening...")
                    audio = self.recognizer.listen(source, timeout=1, phrase_time_limit=5)
                
                # Convert audio to bytes
                audio_data = audio.get_wav_data()
                
                # Process the audio
                response_audio = await self.process_voice_input(audio_data)
                
                # Play response (implement based on your audio system)
                await self.play_audio(response_audio)
                
            except sr.WaitTimeoutError:
                continue
            except Exception as e:
                print(f"Error in continuous listening: {e}")
                await asyncio.sleep(1)
    
    async def play_audio(self, audio_data: bytes):
        """Play audio response."""
        # Implement audio playback based on your system
        pass
`,
  implementation: [
    'Set up speech recognition (STT) integration',
    'Implement natural language processing pipeline',
    'Create intent classification system',
    'Build conversation context management',
    'Implement text-to-speech (TTS) synthesis',
    'Add voice activity detection',
    'Create conversation flow management',
    'Implement error handling and recovery'
  ]
};
