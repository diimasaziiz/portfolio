import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [helloIndex, setHelloIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const hellos = [
    'Hello',
    'Halo',
    'Bonjour',
    'Hola',
    'Ciao',
    'こんにちは',
    '안녕하세요',
    'Привет',
    'Halo',
  ]

  useEffect(() => {
    // Kunci scrollbar di tag <html> biar ga ilang-timbul
    // document.documentElement.style.overflow = 'hidden';

    const helloInterval = setInterval(() => {
      setHelloIndex((prev) => (prev + 1) % hellos.length)
    }, 200)

    const t1 = setTimeout(() => setStep(1), 1200)
    const t2 = setTimeout(() => setStep(2), 2400)
    const t3 = setTimeout(() => setStep(3), 3600)
    const t4 = setTimeout(() => {
      setStep(4)
      clearInterval(helloInterval)
    }, 4800)
    const t5 = setTimeout(() => {
      setIsVisible(false)
      document.documentElement.style.overflow = '' // ✅ reset dulu
    }, 5800)

    const t6 = setTimeout(() => {
      document.documentElement.style.overflow = '' // ✅ double-reset buat safety
      if (onComplete) onComplete()
    }, 6600)

    return () => {
      clearInterval(helloInterval)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      clearTimeout(t6)
      document.documentElement.style.overflow = ''
    }
  }, [hellos.length, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-999999 flex flex-col items-center justify-center overflow-hidden bg-[#f3f1f8] p-6 font-mono text-sm text-gray-400 md:text-lg dark:bg-[#050510] dark:text-white"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative z-10 flex w-full max-w-sm flex-col gap-2 md:max-w-md">
            <div className="flex items-center gap-4">
              <span className="font-bold text-blue-500">{'[ INIT ]'}</span>
              <span>{hellos[helloIndex]}</span>
            </div>

            {step >= 1 && (
              <div className="flex items-center">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="mr-3 text-purple-500">{'>'}</span>
                  Booting up portfolio...
                </motion.div>

                {/* Blinking Cursor */}
                {step === 1 && (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="ml-2 h-5 w-2 bg-[#050510] md:h-6 md:w-3 dark:bg-[#f3f1f8]"
                  />
                )}
              </div>
            )}

            {step >= 2 && (
              <div className="flex items-center">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="mr-3 text-purple-500">{'>'}</span>
                  I&apos;m Dimas, a Web Developer.
                </motion.div>

                {/* Blinking Cursor */}
                {step === 2 && (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="ml-2 h-5 w-2 bg-[#050510] md:h-6 md:w-3 dark:bg-[#f3f1f8]"
                  />
                )}
              </div>
            )}

            {/* FIX: Bungkus pake step >= 3 biar ga nongol duluan */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <span className="mr-3 text-green-500">{'>'}</span>

                {step === 3 ? (
                  <span className="text-yellow-500">Best experienced on desktop.</span>
                ) : (
                  <span className="flex items-center font-bold tracking-widest text-green-400 uppercase">
                    <span className="animate-pulse">Welcome</span>

                    {/* TANGAN DADAH-DADAH */}
                    <motion.span
                      className="ml-2 inline-block"
                      style={{ transformOrigin: '70% 70%' }}
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      👋
                    </motion.span>
                  </span>
                )}

                {/* Blinking Cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="ml-2 h-5 w-2 bg-[#050510] md:h-6 md:w-3 dark:bg-[#f3f1f8]"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
