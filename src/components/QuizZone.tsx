import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { TOPICS } from '../data/topics';
import { QuizQuestion, TopicId } from '../types';
import { 
  HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Clock, 
  Sparkles, ArrowRight, ShieldCheck, Filter, Award, Eye
} from 'lucide-react';

interface ShuffledQuestion {
  id: number;
  topicId: TopicId;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export const QuizZone: React.FC = () => {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<'all' | TopicId>('all');
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);

  // Timer feature
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or re-shuffle quiz pool
  const initializeQuiz = (topicId: 'all' | TopicId) => {
    let pool = topicId === 'all' 
      ? [...QUIZ_QUESTIONS] 
      : QUIZ_QUESTIONS.filter(q => q.topicId === topicId);

    // Shuffle questions
    pool = pool.sort(() => Math.random() - 0.5);

    // Shuffle options for each question
    const prepared: ShuffledQuestion[] = pool.map(q => {
      const originalOptions = [...q.options];
      const correctText = originalOptions[q.correctIndex];
      const shuffled = [...originalOptions].sort(() => Math.random() - 0.5);
      const newCorrectIdx = shuffled.indexOf(correctText);

      return {
        id: q.id,
        topicId: q.topicId,
        question: q.question,
        options: shuffled,
        correctOptionIndex: newCorrectIdx,
        explanation: q.explanation
      };
    });

    setQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers({});
    setIsFinished(false);
    setIsReviewMode(false);
    setSecondsRemaining(45);
  };

  useEffect(() => {
    initializeQuiz(selectedTopicFilter);
  }, [selectedTopicFilter]);

  // Timer tick
  useEffect(() => {
    if (!isTimerEnabled || isFinished || isAnswerChecked || questions.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setSecondsRemaining(45);
    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto check answer on timeout
          handleCheckAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isTimerEnabled, isAnswerChecked, isFinished]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = (timedOut = false) => {
    if (isAnswerChecked || !currentQ) return;
    const isCorrect = !timedOut && selectedOption === currentQ.correctOptionIndex;

    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: {
        selected: timedOut ? -1 : (selectedOption ?? -1),
        isCorrect
      }
    }));

    setIsAnswerChecked(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Calculate final score
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    // Count score
    const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
    const pct = Math.round((correctCount / questions.length) * 100);

    if (pct > bestScore) {
      setBestScore(pct);
    }

    if (pct >= 70) {
      // Confetti burst!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const scoreCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
  const scorePercent = questions.length > 0 ? Math.round((scoreCount / questions.length) * 100) : 0;

  // Grade messages
  let gradeBadge = { text: 'Certified Network Specialist', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/50' };
  if (scorePercent < 50) {
    gradeBadge = { text: 'Needs Review & Practice', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-500/50' };
  } else if (scorePercent < 70) {
    gradeBadge = { text: 'Passing Junior Tech', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/50' };
  } else if (scorePercent >= 90) {
    gradeBadge = { text: 'Master Network Architect', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-500/50' };
  }

  // Topic Color helper
  const getTopicColor = (tId: TopicId) => {
    const t = TOPICS.find(top => top.id === tId);
    return t ? t.colorHex : '#38BDF8';
  };

  const getTopicTitle = (tId: TopicId) => {
    const t = TOPICS.find(top => top.id === tId);
    return t ? t.title : tId;
  };

  return (
    <section id="quiz" className="py-20 border-t border-slate-800 bg-[#090e1a] relative overflow-hidden w-full max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Interactive Assessment Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            Network Certification Quiz Zone
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Test your knowledge across all 8 unit topics with real-world scenarios and instant explanations.
          </p>

          {/* Topic Filters Segmented Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedTopicFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition cursor-pointer ${
                selectedTopicFilter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Topics ({QUIZ_QUESTIONS.length})
            </button>
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicFilter(topic.id)}
                className={`px-2.5 py-1.5 text-xs font-mono rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  selectedTopicFilter === topic.id
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topic.colorHex }} />
                <span>{topic.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Quiz Card */}
        {!isFinished ? (
          questions.length > 0 && currentQ && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-8 backdrop-blur shadow-2xl space-y-6 max-w-full">
              {/* Meta Status Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getTopicColor(currentQ.topicId) }}
                  />
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                    {getTopicTitle(currentQ.topicId)}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  {/* Timer Toggle */}
                  <button
                    onClick={() => setIsTimerEnabled(!isTimerEnabled)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition cursor-pointer ${
                      isTimerEnabled
                        ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isTimerEnabled ? `${secondsRemaining}s` : 'Timer Off'}</span>
                  </button>

                  {bestScore > 0 && (
                    <span className="text-slate-400">Best: <strong className="text-emerald-400">{bestScore}%</strong></span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctOptionIndex;

                  let optionStyle = 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60 text-slate-200';
                  if (isSelected && !isAnswerChecked) {
                    optionStyle = 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400';
                  } else if (isAnswerChecked) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
                    } else {
                      optionStyle = 'border-slate-800 bg-slate-950/30 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerChecked}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start justify-between cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono text-slate-400 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>

                      {isAnswerChecked && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 ml-2" />
                      )}
                      {isAnswerChecked && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Box */}
              {isAnswerChecked && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  selectedOption === currentQ.correctOptionIndex
                    ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-800/40 text-rose-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {selectedOption === currentQ.correctOptionIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Incorrect.</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 mt-1">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => initializeQuiz(selectedTopicFilter)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Quiz</span>
                </button>

                {!isAnswerChecked ? (
                  <button
                    onClick={() => handleCheckAnswer(false)}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono bg-cyan-500 hover:bg-cyan-400 text-black disabled:opacity-40 transition cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono bg-emerald-500 hover:bg-emerald-400 text-black transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                  >
                    <span>{currentIndex === questions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )
        ) : (
          /* FINAL SCORE REPORT SCREEN */
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 p-8 text-center backdrop-blur shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                QUIZ COMPLETED
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
                {scorePercent}%
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                You answered <strong className="text-white">{scoreCount}</strong> out of <strong className="text-white">{questions.length}</strong> questions correctly.
              </p>
            </div>

            {/* Grade Badge */}
            <div className={`inline-block px-4 py-2 rounded-xl border text-xs font-mono font-bold ${gradeBadge.bg} ${gradeBadge.color}`}>
              {gradeBadge.text}
            </div>

            {/* Per-Topic Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase block pb-2 border-b border-slate-800">
                PER-TOPIC SCORE PERFORMANCE
              </span>
              <div className="space-y-2">
                {TOPICS.map(topic => {
                  const topicQuestions = questions.filter(q => q.topicId === topic.id);
                  if (topicQuestions.length === 0) return null;

                  const correctInTopic = topicQuestions.filter(q => {
                    const qIdx = questions.indexOf(q);
                    return userAnswers[qIdx]?.isCorrect;
                  }).length;

                  const topicPct = Math.round((correctInTopic / topicQuestions.length) * 100);

                  return (
                    <div key={topic.id} className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topic.colorHex }} />
                        <span className="text-slate-300">{topic.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{correctInTopic}/{topicQuestions.length}</span>
                        <span className={`font-bold ${topicPct >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {topicPct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => initializeQuiz(selectedTopicFilter)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz (Shuffle)</span>
              </button>

              <button
                onClick={() => setIsReviewMode(!isReviewMode)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>{isReviewMode ? 'Hide Review' : 'Review All Questions'}</span>
              </button>
            </div>

            {/* Review Mistakes Section */}
            {isReviewMode && (
              <div className="mt-8 pt-6 border-t border-slate-800 text-left space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                  Detailed Question Review:
                </span>
                {questions.map((q, idx) => {
                  const ans = userAnswers[idx];
                  const isCorrect = ans?.isCorrect;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? 'border-emerald-500/30 bg-emerald-950/10'
                          : 'border-rose-500/40 bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Q{idx + 1}: {q.question}</span>
                        {isCorrect ? (
                          <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-400 font-mono font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400">
                        <div>Your Answer: <span className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                          {ans && ans.selected >= 0 ? q.options[ans.selected] : 'None / Timed out'}
                        </span></div>
                        <div>Correct Answer: <span className="text-emerald-400 font-bold">{q.options[q.correctOptionIndex]}</span></div>
                      </div>
                      <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/60 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
