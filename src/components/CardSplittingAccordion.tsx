'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { Layers, Send, ChevronDown } from 'lucide-react';
import { PiHandTap } from 'react-icons/pi';
import { IoIosTimer } from 'react-icons/io';
import FlourishDivider from './FlourishDivider';

export interface AccordionItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  content: string;
}

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 1,
    title: 'What are the check-in and check-out times?',
    icon: <HiCursorArrowRipple className="-rotate-10 size-6 md:size-[1.625rem]" />,
    content:
      'Check-in is from 12:00 PM onwards, and check-out is by 11:00 AM. Early check-in or late check-out can be arranged upon request during booking or with front desk.',
  },
  {
    id: 2,
    title: 'Is breakfast included with my room reservation?',
    icon: <Layers className="size-6 md:size-[1.625rem]" />,
    content:
      'Yes! Every room booking at Anboss Hotel includes a complimentary fresh gourmet breakfast served daily from 6:30 AM to 10:00 AM.',
  },
  {
    id: 3,
    title: 'Can I rent the hotel courtyard or floor for social events?',
    icon: <PiHandTap className="-rotate-20 size-6 md:size-[1.625rem]" />,
    content:
      'Yes! Our spacious hotel courtyard and open event grounds are available for rental for social occasions including weddings, naming ceremonies, birthday parties, and corporate receptions. Contact our team for custom event packages.',
  },
  {
    id: 4,
    title: 'Do you offer Kumasi Airport pickup shuttle service?',
    icon: <Send className="size-6 md:size-[1.625rem]" />,
    content:
      'Yes, we provide direct one-way or round-trip shuttle pickups from Kumasi Airport to the hotel in Santasi Apre. You can easily add shuttle service when booking online.',
  },
  {
    id: 5,
    title: 'What payment options are available?',
    icon: <IoIosTimer className="size-6 md:size-[1.625rem]" />,
    content:
      'We accept Cash at check-in, Mobile Money (MTN MoMo, Telecel Cash, AT Money), and major credit/debit cards for your convenience.',
  },
  {
    id: 6,
    title: 'How do I locate Anboss Hotel in Kumasi?',
    icon: <HiCursorArrowRipple className="size-6 md:size-[1.625rem]" />,
    content:
      'We are located in Santasi Apre, Kumasi, Ghana. Our official digital address is Ghana Post GPS: AG-0666-2011 (Postal: SN 284, Santasi). You can find us on Google Maps or contact front desk at +233 (0)541-886633 / 0244 066999.',
  },
];

export function AccordionApp({ items = FAQ_ITEMS }: { items?: AccordionItem[] }) {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-[900px] w-full flex flex-col gap-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            layout
            initial={false}
            animate={{
              scale: isOpen ? 1.01 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`overflow-hidden rounded-none border transition-all duration-300 ${
              isOpen
                ? 'border-brand-accent bg-white shadow-lg ring-1 ring-brand-accent/20'
                : 'border-brand-line bg-white hover:border-brand-muted-2 shadow-sm'
            }`}
          >
            {/* Accordion Header / Card Trigger */}
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between p-5 md:p-6 text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center transition-colors ${
                    isOpen
                      ? 'bg-brand-accent text-white'
                      : 'bg-brand-surface text-brand-ink'
                  }`}
                >
                  {item.icon}
                </div>
                <h3
                  className={`font-serif text-base md:text-lg font-bold transition-colors ${
                    isOpen ? 'text-brand-accent' : 'text-brand-ink'
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`ml-4 flex h-9 w-9 shrink-0 items-center justify-center transition-colors ${
                  isOpen ? 'text-brand-accent' : 'text-brand-muted-3'
                }`}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>

            {/* Split Content Expansion Area */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-brand-line/60 px-6 pb-6 pt-4 text-sm leading-relaxed text-brand-muted md:px-7 md:pb-7">
                    <p className="max-w-[760px]">{item.content}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function CardSplittingAccordionDemo() {
  return (
    <section className="w-full bg-brand-surface py-20 px-6">
      <div className="mx-auto max-w-[1240px] text-center">
        <span className="font-script text-3xl text-brand-accent">Have Questions?</span>
        <h2 className="font-serif text-3xl font-extrabold uppercase tracking-wider text-brand-ink mt-1">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <FlourishDivider />
        <p className="mx-auto mt-3 mb-12 max-w-[620px] text-xs md:text-sm text-brand-muted leading-relaxed">
          Find quick answers to common questions about room reservations, courtyard event rentals, check-in policies, and hotel location in Kumasi.
        </p>

        <AccordionApp />
      </div>
    </section>
  );
}
