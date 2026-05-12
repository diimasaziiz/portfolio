/* eslint-disable @next/next/no-img-element */
'use client'

import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import { motion } from 'motion/react'

import { Experience } from '@/types'

export default function Timeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative mt-5 w-full">
      {/* Container Timeline */}
      <div className="relative mx-auto max-w-4xl">
        {/* Garis vertikal timeline (Efek Laser Turun) */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute top-0 bottom-0 left-5 z-0 w-0.5 -translate-x-1/2 rounded-full bg-linear-to-b from-blue-500 via-primary to-transparent md:left-1/2"
        ></motion.div>

        {/* Map Data Experience */}
        <div className="space-y-12">
          {experiences.map(
            (
              {
                company_logo_url,
                company_name,
                company_url,
                description,
                is_current,
                location,
                position,
                start_date,
                end_date,
              },
              index,
            ) => {
              // Logic buat nentuin card-nya di kiri atau kanan (kalo di layar gede)
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className="group relative flex w-full items-center justify-between md:justify-normal"
                >
                  {/* Node Titik Nyala di tengah garis */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="absolute left-5 z-20 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-white transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] md:left-1/2 dark:bg-gray-900 dark:group-hover:bg-primary"
                  ></motion.div>

                  {/* Container Card */}
                  <motion.div
                    // Animasi masuk terbang dari samping nge-snap ke tengah
                    initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.2 }}
                    // Hover agresif: loncat ke atas & bayangan neon
                    whileHover={{ y: -8 }}
                    className={`relative z-10 ml-12.5 w-[calc(100%-50px)] rounded-2xl border border-gray-300 bg-white p-6 shadow-xl transition-colors duration-300 hover:border-primary md:ml-0 md:w-[calc(50%-40px)] lg:p-8 dark:border-gray-600 dark:bg-[#151515] dark:hover:border-primary ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    {/* Dekorasi Neon di dalem card pas hover */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <div className="relative z-10 text-gray-700 dark:text-gray-300">
                      <div className="mb-2 flex flex-col justify-between gap-2">
                        <img
                          src={company_logo_url}
                          alt={company_name}
                          style={{
                            width:
                              company_name === 'PT. Semesta Integrasi Digital' ? '150px' : '100px',
                          }}
                          loading="lazy"
                          draggable={false}
                        />
                        <h3 className="text-xl font-bold text-gray-900 transition-all group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent md:text-2xl dark:text-gray-100">
                          {position}
                        </h3>
                        <span className="shrink-0 font-mono text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {format(start_date, 'dd MMMM yyyy')} -{' '}
                          {is_current ? 'Present' : format(end_date!, 'dd MMMM yyyy')}
                        </span>
                      </div>

                      <div className="mb-6 flex flex-col gap-2">
                        <a
                          href={company_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
                        >
                          {company_name}
                        </a>
                        <p className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          {location}
                        </p>
                      </div>

                      <MDEditor.Markdown
                        source={description}
                        style={{
                          backgroundColor: 'transparent',
                          whiteSpace: 'pre-wrap',
                          color: 'inherit',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              )
            },
          )}
        </div>
      </div>
    </div>
  )
}
