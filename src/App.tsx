import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { UserInfoModal, type UserData } from './components/core/UserInfoModal';
import { Layout } from './components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeInput } from './components/core/CodeInput';
import { ResultDisplay } from './components/core/ResultDisplay';
import { FeaturesView } from './components/views/FeaturesView';
import { HowItWorksView } from './components/views/HowItWorksView';
import { generateContent } from './services/ai';

type View = 'home' | 'features' | 'how-it-works';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [code, setCode] = useState('def hello():\n    print("Hello World")');
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<{
    flowchart: string;
    algorithm: string;
    pseudoCode: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generationsCount, setGenerationsCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('flowchart_generations_count') || '0');
  });

  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('flowchart_username');
  });


  // Listener for nested navigation (e.g. from HowItWorksView)
  useEffect(() => {
    const handleNavigate = () => {
      setCurrentView('home');
    };
    window.addEventListener('navigate-home', handleNavigate);
    return () => window.removeEventListener('navigate-home', handleNavigate);
  }, []);

  const handleGenerate = async () => {
    // Check usage limits if not logged in
    if (!username && generationsCount >= 3) {
      triggerAuth(
        'Usage Limit Reached',
        'You\'ve used your 3 free generations. Sign in to continue generating unlimited flowcharts!'
      );
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const data = await generateContent(code);
      setResults(data);

      // Increment count ONLY for non-logged in users or track regardless?
      // Assuming 3 free total for guest, then login.
      if (!username) {
        const newCount = generationsCount + 1;
        setGenerationsCount(newCount);
        localStorage.setItem('flowchart_generations_count', newCount.toString());
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred while generating content.');
    } finally {
      setIsGenerating(false);
    }
  };

  const [authModalConfig, setAuthModalConfig] = useState({
    title: 'Get Started',
    description: 'Sign in to save your flowcharts.'
  });

  const handleLogin = async (data: UserData) => {
    console.log('User logging in:', data);

    // Submit to Google Form (moved from Layout)
    const activeDate = new Date().toLocaleDateString();
    const activeTime = new Date().toLocaleTimeString();
    const timestamp = `${activeDate} ${activeTime}`;
    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdEN6ASzzQufGLV57hTfz-IBC9nI3WxQoQVXczzHv_kdritvA/formResponse';

    const formData = new FormData();
    formData.append('entry.1831054606', data.name);
    formData.append('entry.472400053', data.email);
    formData.append('entry.1179008949', data.password);
    formData.append('entry.465572959', timestamp);

    try {
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      // Simulate login persistence
      localStorage.setItem('flowchart_user_token', 'dummy-token');
      localStorage.setItem('flowchart_username', data.name);
      setUsername(data.name);
      setShowAuthModal(false);

      toast.success(`Welcome ${data.name}!`);
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const triggerAuth = (title = 'Get Started', description = 'Sign in to save your flowcharts.') => {
    setAuthModalConfig({ title, description });
    setShowAuthModal(true);
  };



  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-8 backdrop-blur-xl shadow-lg shadow-blue-500/5 hover:bg-blue-500/20 transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span>Powered by Google Gemini</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
              >
                Turn your code into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  beautiful flowcharts
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-400 mb-8 leading-relaxed"
              >
                Instantly visualize logic from Python, C++, Java, and more.
                Paste your code and let AI generate clear flowcharts, algorithms, and pseudocode.
              </motion.p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto mb-8 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Main Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-full"
              >
                <CodeInput
                  code={code}
                  setCode={setCode}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-full"
              >
                <ResultDisplay results={results} onUpdate={setResults} />
              </motion.div>
            </div>
          </motion.div>
        );
      case 'features':
        return (
          <motion.div
            key="features"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FeaturesView />
          </motion.div>
        );
      case 'how-it-works':
        return (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <HowItWorksView />
          </motion.div>
        );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flowchart_user_token');
    localStorage.removeItem('flowchart_username');
    setUsername(null);
  };

  return (
    <Layout
      onNavigate={setCurrentView}
      username={username}
      onLogout={handleLogout}
      onGetStarted={() => triggerAuth()}
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      <UserInfoModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSubmit={handleLogin}
        title={authModalConfig.title}
        description={authModalConfig.description}
      />
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      }} />
    </Layout>
  );
}

export default App;
