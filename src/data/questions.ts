import { Question } from '@/types/questionnaire';

export const questions: Question[] = [
  // Physical Health Symptoms
  {
    id: '1i',
    title: 'Bloating',
    description: 'A feeling of fullness or tightness in the abdomen, an observable increase in belly size, abdominal pain or discomfort, excessive gas, and frequent belching or burping',
    category: 'physical',
    type: 'toggle'
  },
  {
    id: '1ii',
    title: 'Intra-abdominal pressure',
    description: 'Pressure within the closed space of the abdomen and pelvis',
    category: 'physical',
    type: 'toggle'
  },
  {
    id: '1iii',
    title: 'Pelvic pain (other than period cramps)',
    description: 'Abdominal pain located below the level of the belly button including, frequently, lower back pain with or without radiation into the thighs',
    category: 'physical',
    type: 'toggle'
  },
  {
    id: '1iv',
    title: 'Rapid/sudden weight gain',
    description: 'Rapid weight gain (>5 pounds in a week) and/or sudden accumulation of belly fat',
    category: 'physical',
    type: 'toggle'
  },
  {
    id: '1v',
    title: 'Fatigue',
    description: 'Feeling of extreme tiredness or lack of energy, often accompanied by weariness or exhaustion',
    category: 'physical',
    type: 'toggle'
  },
  {
    id: '1vi',
    title: 'Snoring/obstructive sleep apnea',
    description: 'Repeated episodes of complete (apnea) or partial (hypopnea) collapse of the upper airway',
    category: 'physical',
    type: 'toggle'
  },
  
  // Period Symptoms
  {
    id: '1vii',
    title: 'Absent periods (amenorrhea)',
    description: 'Not getting your period by the age of 15 and/or not having a period for 3 months or more',
    category: 'period',
    type: 'toggle'
  },
  {
    id: '1viii',
    title: 'Irregular periods (oligomenorrhea)',
    description: 'An interval between periods of more than 35 days and/or less than 9 periods in a year',
    category: 'period',
    type: 'toggle'
  },
  {
    id: '1ix',
    title: 'Heavy menstrual bleeding',
    description: 'Menstrual bleeding that requires you to change your pad/tampon every hour or during the night',
    category: 'period',
    type: 'toggle'
  },
  {
    id: '1x',
    title: 'Severe period cramps (dysmenorrhea)',
    description: "Menstrual pain that's severe enough to interfere with your regular activities",
    category: 'period',
    type: 'toggle'
  },
  
  // Skin/Hair Symptoms
  {
    id: '1xi',
    title: 'Acne',
    description: 'Inflamed or infected glands in the skin on the face, chest, upper back and/or shoulders',
    category: 'skin',
    type: 'toggle'
  },
  {
    id: '1xii',
    title: 'Dark skin patches (hyperpigmentation)',
    description: 'Areas of skin that appear darker than the surrounding skin due to an overproduction of melanin',
    category: 'skin',
    type: 'toggle'
  },
  {
    id: '1xiii',
    title: 'Skin tags (acrochordon)',
    description: 'Small benign growths that commonly form in areas where the skin creases, such as the neck, armpit and groin',
    category: 'skin',
    type: 'toggle'
  },
  {
    id: '1xiv',
    title: 'Excess hair (hirsutism)',
    description: 'Excessive growth of dark or coarse hair on the face, chest and/or back',
    category: 'skin',
    type: 'toggle'
  },
  {
    id: '1xv',
    title: 'Hair thinning',
    description: 'Hair becoming thinner with each growth cycle, leading to reduced hair density',
    category: 'skin',
    type: 'toggle'
  },
  {
    id: '1xvi',
    title: 'Male-pattern hair loss',
    description: 'Hair loss from a receding hairline or thinning at the crown/vertex of the scalp',
    category: 'skin',
    type: 'toggle'
  },
  {
    id: '1xvii',
    title: 'Excess sweating (hyperhidrosis)',
    description: 'Sweating unrelated to heat or exercise that soaks through clothing or drips from the hands',
    category: 'skin',
    type: 'toggle'
  },
  
  // Professional Diagnoses
  {
    id: '2ci',
    title: 'Polycystic ovary syndrome (PCOS)',
    description: 'Hormonal disorder characterized by at least 2 of: androgen excess, ovarian dysfunction, or polycystic ovaries',
    category: 'diagnosis',
    type: 'toggle'
  },
  {
    id: '2cii',
    title: 'Hyperandrogenism (HA) / Androgen Excess (AE)',
    description: 'Elevated levels of circulating androgens as measured in blood or saliva tests',
    category: 'diagnosis',
    type: 'toggle'
  },
  {
    id: '2ciii',
    title: 'Polycystic Ovaries (PCO)',
    description: 'Increased number of follicles per ovary as measured by pelvic ultrasound',
    category: 'diagnosis',
    type: 'toggle'
  },
  {
    id: '2civ',
    title: 'Ovulatory Dysfunction (OD)',
    description: 'Irregular or absent ovulation confirmed by AMH, FSH, progesterone levels, or pelvic ultrasound',
    category: 'diagnosis',
    type: 'toggle'
  },
  {
    id: '2cv',
    title: 'Insulin resistance (IR)',
    description: 'Impaired response to insulin in muscles, fat, and liver, diagnosed by a healthcare provider',
    category: 'diagnosis',
    type: 'toggle'
  },
  {
    id: '2cvi',
    title: 'When were you diagnosed with PCOS?',
    description: '',
    category: 'diagnosis',
    type: 'dropdown',
    options: [
      'Not yet formally diagnosed',
      'Within last 12 months',
      'Within last 1–5 years',
      'Within the last 5–15 years',
      'Longer than 15 years ago',
      'Prefer not to say'
    ]
  },
  
  // Family History
  {
    id: '2cvii',
    title: 'My mother has been diagnosed with PCOS or has PCOS symptoms',
    description: '',
    category: 'family',
    type: 'toggle'
  },
  {
    id: '2cviii',
    title: 'My sister has been diagnosed with PCOS or has PCOS symptoms',
    description: '',
    category: 'family',
    type: 'toggle'
  },
  {
    id: '2cix',
    title: 'My brother and/or father has metabolic syndrome, type 2 diabetes, and/or hypertension',
    description: '',
    category: 'family',
    type: 'toggle'
  },
  {
    id: '2cx',
    title: 'I started my period earlier than most of my friends',
    description: '',
    category: 'family',
    type: 'toggle'
  },
  {
    id: '2cxi',
    title: 'I started my period later than most of my friends',
    description: '',
    category: 'family',
    type: 'toggle'
  },
  {
    id: '2cxii',
    title: 'I went through menopause later than most of my friends',
    description: '',
    category: 'family',
    type: 'toggle'
  }
];

export const categoryTitles = {
  physical: 'Which of the following symptoms relating to your physical health have you experienced?',
  period: 'Which of the following symptoms relating to your period have you experienced?',
  skin: 'Which of the following symptoms relating to your skin/hair have you experienced?',
  diagnosis: 'Which of the following has been diagnosed by a healthcare professional?',
  family: 'Which of the following are true for you? (select all that apply)'
};
