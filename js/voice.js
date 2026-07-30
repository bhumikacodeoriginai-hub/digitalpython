/* ============================================================
   Digital Python Notes — Teaching Voice Engine (v9)
   
   NOT just reading text — EXPLAINS concepts like a real teacher:
   - Pauses between ideas
   - Emphasizes key points
   - Speaks naturally (not robotic)
   - Supports multiple languages
   - Adjustable speed
   
   Uses Web Speech API (built into all modern browsers)
   Developed by Code Origin.AI Private Limited
   ============================================================ */
(function () {
  "use strict";

  var synth = window.speechSynthesis;
  var isSupported = !!synth;
  var isSpeaking = false;
  var isPaused = false;
  var currentQueue = [];
  var currentIndex = 0;
  var listeners = [];
  var settings = {
    rate: 0.88,      // Slower than default for teaching
    pitch: 1.0,
    volume: 1.0,
    lang: "en-IN"    // Default: English (India)
  };

  // Language to voice mapping
  var LANG_MAP = {
    en: { lang: "en-IN", fallback: "en-US" },
    hi: { lang: "hi-IN", fallback: "hi-IN" },
    kn: { lang: "kn-IN", fallback: "kn-IN" },
    te: { lang: "te-IN", fallback: "te-IN" },
    ta: { lang: "ta-IN", fallback: "ta-IN" },
    ml: { lang: "ml-IN", fallback: "ml-IN" }
  };

  function notify(event, data) {
    listeners.forEach(function (fn) { try { fn(event, data); } catch (e) {} });
  }

  /* Find best voice for a language */
  function findVoice(langCode) {
    var voices = synth.getVoices();
    var mapping = LANG_MAP[langCode] || LANG_MAP.en;
    
    // Try exact match first
    var voice = voices.find(function (v) { return v.lang === mapping.lang; });
    if (voice) return voice;
    
    // Try fallback
    voice = voices.find(function (v) { return v.lang === mapping.fallback; });
    if (voice) return voice;
    
    // Try partial match (e.g., "en" matches "en-US")
    var prefix = langCode.split("-")[0];
    voice = voices.find(function (v) { return v.lang.startsWith(prefix); });
    if (voice) return voice;
    
    // Last resort: any voice
    return voices[0] || null;
  }

  /* Convert concept teaching content into natural speech segments.
     This is the KEY part — it transforms written text into how a
     teacher would ACTUALLY SPEAK it, with pauses and emphasis. */
  function buildTeachingScript(concept, langCode) {
    var script = [];
    var lang = langCode || "en";

    // Opening greeting
    if (lang === "en") {
      script.push({ text: "Alright students, let's learn about " + concept.title + ".", pause: 800 });
      script.push({ text: "Pay attention, I'll explain this step by step.", pause: 600 });
    } else if (lang === "hi") {
      script.push({ text: "चलिए, " + concept.title + " के बारे में सीखते हैं।", pause: 800 });
      script.push({ text: "ध्यान से सुनिए, मैं आपको step by step समझाऊँगा।", pause: 600 });
    } else if (lang === "kn") {
      script.push({ text: "ವಿದ್ಯಾರ್ಥಿಗಳೇ, " + concept.title + " ಬಗ್ಗೆ ಕಲಿಯೋಣ.", pause: 800 });
      script.push({ text: "ಗಮನವಿಟ್ಟು ಕೇಳಿ, ನಾನು ಹಂತ ಹಂತವಾಗಿ ವಿವರಿಸುತ್ತೇನೆ.", pause: 600 });
    } else if (lang === "te") {
      script.push({ text: "విద్యార్థులారా, " + concept.title + " గురించి నేర్చుకుందాం.", pause: 800 });
      script.push({ text: "శ్రద్ధగా వినండి, నేను దశల వారీగా వివరిస్తాను.", pause: 600 });
    } else if (lang === "ta") {
      script.push({ text: "மாணவர்களே, " + concept.title + " பற்றி கற்றுக்கொள்வோம்.", pause: 800 });
      script.push({ text: "கவனமாக கேளுங்கள், படிப்படியாக விளக்குகிறேன்.", pause: 600 });
    } else if (lang === "ml") {
      script.push({ text: "കുട്ടികളേ, " + concept.title + " എന്താണെന്ന് നമുക്ക് പഠിക്കാം.", pause: 800 });
      script.push({ text: "ശ്രദ്ധിച്ചു കേൾക്കൂ, ഞാൻ ഘട്ടം ഘട്ടമായി വിശദീകരിക്കാം.", pause: 600 });
    }

    // Step 1: Introduction
    if (concept.introduction) {
      script.push({ text: getTeachTransition("intro", lang), pause: 500 });
      var introText = Array.isArray(concept.introduction) ? concept.introduction.join(" ") : concept.introduction;
      // Clean markdown
      introText = cleanForSpeech(introText);
      // Split into sentences for natural pausing
      splitSentences(introText).forEach(function (sent) {
        script.push({ text: sent, pause: 400 });
      });
    } else if (concept.notes) {
      script.push({ text: getTeachTransition("intro", lang), pause: 500 });
      var notesText = Array.isArray(concept.notes) ? concept.notes.join(" ") : concept.notes;
      notesText = cleanForSpeech(notesText);
      splitSentences(notesText).forEach(function (sent) {
        script.push({ text: sent, pause: 400 });
      });
    }

    // Step 2: Analogy
    if (concept.analogy) {
      script.push({ text: getTeachTransition("analogy", lang), pause: 700 });
      var analogyText = Array.isArray(concept.analogy) ? concept.analogy.join(" ") : concept.analogy;
      analogyText = cleanForSpeech(analogyText);
      splitSentences(analogyText).forEach(function (sent) {
        script.push({ text: sent, pause: 500 });
      });
    }

    // Step 3: Syntax explanation
    if (concept.syntax) {
      script.push({ text: getTeachTransition("syntax", lang), pause: 600 });
      var synText = Array.isArray(concept.syntax) ? concept.syntax.join(" ") : concept.syntax;
      synText = cleanForSpeech(synText);
      splitSentences(synText).forEach(function (sent) {
        script.push({ text: sent, pause: 400 });
      });
    }

    // Step 4: Example explanation
    if (concept.examples && concept.examples.length > 0) {
      var ex = concept.examples[0];
      script.push({ text: getTeachTransition("example", lang), pause: 600 });
      
      if (ex.explanation) {
        var exText = Array.isArray(ex.explanation) ? ex.explanation.join(" ") : ex.explanation;
        exText = cleanForSpeech(exText);
        splitSentences(exText).forEach(function (sent) {
          script.push({ text: sent, pause: 400 });
        });
      } else {
        // Use auto-explainer
        var autoExpl = window.DPExplainer ? window.DPExplainer.explain(ex.code, ex.title) : null;
        if (autoExpl) {
          var autoText = cleanForSpeech(autoExpl.join(" "));
          splitSentences(autoText).slice(0, 8).forEach(function (sent) {
            script.push({ text: sent, pause: 400 });
          });
        }
      }
    }

    // Step 5: Common mistakes
    if (concept.mistakes && concept.mistakes.length > 0) {
      script.push({ text: getTeachTransition("mistakes", lang), pause: 700 });
      concept.mistakes.slice(0, 2).forEach(function (m) {
        var mistText = cleanForSpeech(m.explanation);
        script.push({ text: mistText, pause: 500 });
      });
    }

    // Closing
    script.push({ text: getTeachTransition("closing", lang), pause: 300 });

    return script;
  }

  /* Teaching transitions in different languages */
  function getTeachTransition(type, lang) {
    var transitions = {
      en: {
        intro: "First, let me explain what this is and why it's important.",
        analogy: "Now, let me give you a simple real-life example so you can understand this easily.",
        syntax: "Now let's look at how to write this in Python. Pay attention to the syntax.",
        example: "Let me show you a code example and explain what happens line by line.",
        mistakes: "Now, here are some common mistakes that beginners make. Avoid these!",
        closing: "That's the end of this explanation. Practice this yourself in the Workspace. Remember, practice makes perfect!"
      },
      hi: {
        intro: "सबसे पहले, मैं आपको बताता हूँ कि यह क्या है और यह क्यों ज़रूरी है।",
        analogy: "अब मैं एक आसान real-life example देता हूँ ताकि आप आसानी से समझ सकें।",
        syntax: "अब देखते हैं कि Python में इसे कैसे लिखते हैं। syntax पर ध्यान दीजिए।",
        example: "एक code example देखते हैं और समझते हैं कि हर line क्या करती है।",
        mistakes: "अब कुछ common mistakes बताता हूँ जो beginners करते हैं। इनसे बचिए!",
        closing: "यह explanation यहीं ख़त्म होती है। Workspace में practice करें। याद रखें, practice से ही perfect बनते हैं!"
      },
      kn: {
        intro: "ಮೊದಲು, ಇದು ಏನು ಮತ್ತು ಇದು ಏಕೆ ಮುಖ್ಯ ಎಂದು ನಾನು ವಿವರಿಸುತ್ತೇನೆ.",
        analogy: "ಈಗ ನಿಮಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗಲು ಒಂದು ನಿಜ ಜೀವನದ ಉದಾಹರಣೆ ಕೊಡುತ್ತೇನೆ.",
        syntax: "ಈಗ Python ನಲ್ಲಿ ಇದನ್ನು ಹೇಗೆ ಬರೆಯಬೇಕು ಎಂದು ನೋಡೋಣ.",
        example: "ಒಂದು code ಉದಾಹರಣೆ ನೋಡೋಣ ಮತ್ತು ಪ್ರತಿ line ಏನು ಮಾಡುತ್ತದೆ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳೋಣ.",
        mistakes: "ಈಗ beginners ಮಾಡುವ ಕೆಲವು ಸಾಮಾನ್ಯ ತಪ್ಪುಗಳನ್ನು ತೋರಿಸುತ್ತೇನೆ.",
        closing: "ಈ ವಿವರಣೆ ಇಲ್ಲಿಗೆ ಮುಗಿಯಿತು. Workspace ನಲ್ಲಿ ಅಭ್ಯಾಸ ಮಾಡಿ!"
      },
      te: {
        intro: "ముందుగా, ఇది ఏమిటి మరియు ఇది ఎందుకు ముఖ్యం అని నేను వివరిస్తాను.",
        analogy: "ఇప్పుడు మీకు సులభంగా అర్థమయ్యేలా ఒక నిజ జీవిత ఉదాహరణ చెప్తాను.",
        syntax: "ఇప్పుడు Python లో దీన్ని ఎలా రాయాలో చూద్దాం.",
        example: "ఒక code ఉదాహరణ చూసి, ప్రతి line ఏమి చేస్తుందో అర్థం చేసుకుందాం.",
        mistakes: "ఇప్పుడు beginners చేసే కొన్ని సాధారణ తప్పులు చూపిస్తాను.",
        closing: "ఈ వివరణ ఇక్కడ ముగిసింది. Workspace లో practice చేయండి!"
      },
      ta: {
        intro: "முதலில், இது என்ன, ஏன் முக்கியம் என்று விளக்குகிறேன்.",
        analogy: "இப்போது எளிதாக புரிந்து கொள்ள ஒரு நிஜ வாழ்க்கை உதாரணம் தருகிறேன்.",
        syntax: "இப்போது Python இல் இதை எப்படி எழுதுவது என்று பார்ப்போம்.",
        example: "ஒரு code உதாரணம் பார்த்து, ஒவ்வொரு வரியும் என்ன செய்கிறது என்று புரிந்து கொள்வோம்.",
        mistakes: "இப்போது beginners செய்யும் சில பொதுவான தவறுகளைக் காட்டுகிறேன்.",
        closing: "இந்த விளக்கம் இங்கே முடிகிறது. Workspace இல் பயிற்சி செய்யுங்கள்!"
      },
      ml: {
        intro: "ആദ്യം, ഇത് എന്താണ് എന്നും ഇത് എന്തുകൊണ്ട് പ്രധാനമാണ് എന്നും ഞാൻ വിശദീകരിക്കാം.",
        analogy: "ഇപ്പോൾ നിങ്ങൾക്ക് എളുപ്പത്തിൽ മനസ്സിലാകാൻ ഒരു യഥാർത്ഥ ജീവിത ഉദാഹരണം തരാം.",
        syntax: "ഇപ്പോൾ Python ൽ ഇത് എങ്ങനെ എഴുതണം എന്ന് നോക്കാം.",
        example: "ഒരു code ഉദാഹരണം കാണാം, ഓരോ line ഉം എന്ത് ചെയ്യുന്നു എന്ന് മനസ്സിലാക്കാം.",
        mistakes: "ഇപ്പോൾ beginners ചെയ്യുന്ന ചില സാധാരണ തെറ്റുകൾ കാണിക്കാം.",
        closing: "ഈ വിശദീകരണം ഇവിടെ അവസാനിക്കുന്നു. Workspace ൽ practice ചെയ്യൂ!"
      }
    };
    return (transitions[lang] || transitions.en)[type] || transitions.en[type];
  }

  /* Clean markdown/code formatting from text for speech */
  function cleanForSpeech(text) {
    if (!text) return "";
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1")     // Remove bold markers
      .replace(/`([^`]+)`/g, "$1")            // Remove code ticks
      .replace(/^[-*]\s+/gm, "")             // Remove bullet markers
      .replace(/^>\s*/gm, "")                // Remove blockquotes
      .replace(/^#{1,6}\s*/gm, "")           // Remove headings
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links → text only
      .replace(/```[\s\S]*?```/g, "")         // Remove code blocks
      .replace(/\n{2,}/g, ". ")               // Double newline → pause
      .replace(/\n/g, " ")                    // Single newline → space
      .replace(/\s{2,}/g, " ")               // Multiple spaces → one
      .trim();
  }

  /* Split text into natural sentences for pacing */
  function splitSentences(text) {
    if (!text) return [];
    return text.split(/(?<=[.!?।])\s+/).filter(function (s) { return s.length > 2; });
  }

  /* Speak a single segment */
  function speakSegment(segment, callback) {
    if (!isSupported) { callback(); return; }
    
    var utterance = new SpeechSynthesisUtterance(segment.text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    utterance.lang = settings.lang;

    var voice = findVoice(settings.lang.split("-")[0]);
    if (voice) utterance.voice = voice;

    utterance.onend = function () {
      if (segment.pause) {
        setTimeout(callback, segment.pause);
      } else {
        callback();
      }
    };
    utterance.onerror = function () { callback(); };

    synth.speak(utterance);
  }

  /* Play the entire teaching script */
  function playScript(script) {
    if (!isSupported) { notify("unsupported"); return; }
    
    stop();
    currentQueue = script;
    currentIndex = 0;
    isSpeaking = true;
    isPaused = false;
    notify("start", { total: script.length });

    function next() {
      if (!isSpeaking || currentIndex >= currentQueue.length) {
        isSpeaking = false;
        notify("end");
        return;
      }
      notify("progress", { current: currentIndex, total: currentQueue.length, text: currentQueue[currentIndex].text });
      speakSegment(currentQueue[currentIndex], function () {
        currentIndex++;
        next();
      });
    }
    next();
  }

  /* Controls */
  function stop() {
    isSpeaking = false;
    isPaused = false;
    synth.cancel();
    notify("stop");
  }

  function pause() {
    if (isSpeaking && !isPaused) {
      synth.pause();
      isPaused = true;
      notify("pause");
    }
  }

  function resume() {
    if (isPaused) {
      synth.resume();
      isPaused = false;
      notify("resume");
    }
  }

  function setLang(langCode) {
    var mapping = LANG_MAP[langCode] || LANG_MAP.en;
    settings.lang = mapping.lang;
  }

  function setRate(rate) {
    settings.rate = Math.max(0.5, Math.min(2.0, rate));
  }

  /* Public API */
  window.DPVoice = {
    isSupported: isSupported,
    teach: function (concept, langCode) {
      setLang(langCode || window.DPI18N.get());
      var script = buildTeachingScript(concept, langCode || window.DPI18N.get());
      playScript(script);
    },
    stop: stop,
    pause: pause,
    resume: resume,
    setLang: setLang,
    setRate: setRate,
    isSpeaking: function () { return isSpeaking; },
    isPaused: function () { return isPaused; },
    onEvent: function (fn) { listeners.push(fn); },
    getSettings: function () { return Object.assign({}, settings); }
  };
})();
