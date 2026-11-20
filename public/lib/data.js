// Rules for the Health Check extension. Regexes are strings, compiled in analyzer.js.
// Edit this file to add myths or warning signs.
export const SOURCES = {
 "who": {
  "name": "World Health Organization",
  "url": "https://www.who.int"
 },
 "who_mythbusters": {
  "name": "WHO - COVID-19 mythbusters",
  "url": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters"
 },
 "who_vaccines": {
  "name": "WHO - Vaccines and immunization",
  "url": "https://www.who.int/health-topics/vaccines-and-immunization"
 },
 "who_measles": {
  "name": "WHO - Measles fact sheet",
  "url": "https://www.who.int/news-room/fact-sheets/detail/measles"
 },
 "who_hiv": {
  "name": "WHO - HIV and AIDS fact sheet",
  "url": "https://www.who.int/news-room/fact-sheets/detail/hiv-aids"
 },
 "who_hpv": {
  "name": "WHO - HPV and cervical cancer fact sheet",
  "url": "https://www.who.int/news-room/fact-sheets/detail/human-papillomavirus-(hpv)-and-cervical-cancer"
 },
 "nci": {
  "name": "US National Cancer Institute",
  "url": "https://www.cancer.gov"
 },
 "cochrane": {
  "name": "Cochrane Library (systematic reviews)",
  "url": "https://www.cochranelibrary.com"
 },
 "medlineplus": {
  "name": "MedlinePlus (patient-friendly)",
  "url": "https://medlineplus.gov"
 },
 "who_diabetes": {
  "name": "WHO - Diabetes fact sheet",
  "url": "https://www.who.int/news-room/fact-sheets/detail/diabetes"
 },
 "who_uv": {
  "name": "WHO - Ultraviolet radiation fact sheet",
  "url": "https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
 }
};

export const MYTHS = [
 {
  "id": "vaccines-autism",
  "claim": "Vaccines cause autism.",
  "severity": "high",
  "all_of": [
   "vaccin\\w*|\\bmmr\\b|immuni[sz]\\w*",
   "autis\\w*"
  ],
  "verdict": "False - large studies and WHO safety reviews have found no causal link.",
  "fact": "Autism is not caused by vaccination. Fear of the link has lowered uptake and contributed to outbreaks of preventable disease.",
  "sources": [
   "who_vaccines",
   "cochrane"
  ]
 },
 {
  "id": "vaccine-microchip",
  "claim": "Vaccines contain microchips or tracking devices.",
  "severity": "medium",
  "all_of": [
   "vaccin\\w*",
   "micro-?chip\\w*|tracking (chip|device)|nano-?chip\\w*|\\bgps\\b"
  ],
  "verdict": "False - no vaccine contains a microchip or tracking device.",
  "fact": "Vaccine ingredients are publicly listed and regulated; a needle-injectable chip that tracks people does not exist.",
  "sources": [
   "who_vaccines",
   "who_mythbusters"
  ]
 },
 {
  "id": "5g-covid",
  "claim": "5G / mobile networks spread COVID-19.",
  "severity": "medium",
  "all_of": [
   "\\b5g\\b|mobile (network|tower)s?|cell ?towers?",
   "covid|coronavirus|sars"
  ],
  "verdict": "False - viruses cannot travel on radio waves or mobile networks.",
  "fact": "COVID-19 spreads through respiratory droplets and close contact, including in countries with no 5G.",
  "sources": [
   "who_mythbusters"
  ]
 },
 {
  "id": "ivermectin-covid",
  "claim": "Ivermectin is a proven cure or preventive for COVID-19.",
  "severity": "high",
  "all_of": [
   "ivermectin",
   "covid|coronavirus|sars",
   "cure[sd]?|prevent\\w*|protect\\w*|treat\\w*"
  ],
  "verdict": "Unsupported - WHO guidance recommends using it for COVID-19 only inside clinical trials.",
  "fact": "Evidence has not shown a benefit that justifies routine use; self-dosing can cause harm and delay proven care.",
  "sources": [
   "who",
   "cochrane"
  ]
 },
 {
  "id": "bleach-cure",
  "claim": "Drinking or injecting bleach / disinfectant (or 'miracle mineral' products) cures or prevents infection.",
  "severity": "critical",
  "all_of": [
   "bleach|disinfectant|chlorine dioxide|miracle mineral|\\bmms\\b|methanol",
   "drink\\w*|ingest\\w*|inject\\w*|swallow\\w*|cure[sd]?|prevent\\w*|treat\\w*"
  ],
  "verdict": "Dangerous and false - these substances are poisonous.",
  "fact": "Consuming or injecting disinfectants or methanol does not prevent or cure COVID-19 and can be fatal. Seek urgent medical help after any ingestion.",
  "sources": [
   "who_mythbusters"
  ]
 },
 {
  "id": "antibiotics-viruses",
  "claim": "Antibiotics treat or prevent viral infections (colds, flu, COVID-19).",
  "severity": "medium",
  "all_of": [
   "antibiotics?",
   "\\bvirus\\w*|viral|\\bcolds?\\b|\\bflu\\b|influenza|covid|coronavirus"
  ],
  "verdict": "False - antibiotics act on bacteria, not viruses.",
  "fact": "Unnecessary antibiotic use adds side effects and drives antimicrobial resistance.",
  "sources": [
   "who",
   "medlineplus"
  ]
 },
 {
  "id": "mrna-dna",
  "claim": "mRNA vaccines change your DNA.",
  "severity": "medium",
  "all_of": [
   "mrna",
   "\\bdna\\b|genome|genetic (code|material)|gene"
  ],
  "verdict": "False - mRNA does not enter the cell nucleus or alter DNA.",
  "fact": "mRNA delivers temporary instructions to make a protein and is broken down by the cell soon afterwards.",
  "sources": [
   "who_vaccines",
   "cochrane"
  ]
 },
 {
  "id": "measles-harmless",
  "claim": "Measles is a harmless, mild childhood illness.",
  "severity": "high",
  "all_of": [
   "measles",
   "harmless|\\bmild\\b|just a rash|not serious|no big deal|nothing to worry|good for (you|kids|children)"
  ],
  "verdict": "False - measles can cause pneumonia, brain swelling, blindness and death.",
  "fact": "Measles is highly contagious and a leading cause of vaccine-preventable child deaths; two doses of vaccine are the way to prevent it.",
  "sources": [
   "who_measles",
   "who_gho"
  ]
 },
 {
  "id": "natural-replaces-medication",
  "claim": "Herbal, 'natural' or diet approaches can replace insulin, chemotherapy or other prescribed treatment.",
  "severity": "critical",
  "all_of": [
   "insulin|chemo\\w*|antiretroviral|\\bart\\b|blood pressure (pills|meds|medication)|anti-?depressants?|prescri\\w+|medication",
   "herb\\w*|natural|detox\\w*|diet|remed\\w*|essential oils?|supplements?",
   "instead|replace\\w*|no longer need|don'?t need|stop\\w*|quit|throw away"
  ],
  "verdict": "Dangerous - stopping prescribed treatment without clinical advice can be life-threatening.",
  "fact": "Never stop insulin, cancer treatment, antiretrovirals or other prescribed medicines because of an online claim; speak to the prescriber first.",
  "sources": [
   "medlineplus",
   "cochrane"
  ]
 },
 {
  "id": "cancer-home-cure",
  "claim": "Baking soda, alkaline diets, apricot kernels or essential oils cure cancer.",
  "severity": "high",
  "all_of": [
   "cancer|tumou?rs?",
   "baking soda|sodium bicarbonate|alkaline|apricot kernel|laetrile|essential oils?|herbal",
   "cure[sd]?|kill\\w*|heal\\w*|eliminat\\w*"
  ],
  "verdict": "Unsupported - no reliable evidence that these cure cancer.",
  "fact": "Relying on unproven remedies while delaying evidence-based treatment can allow cancer to progress.",
  "sources": [
   "nci",
   "cochrane"
  ]
 },
 {
  "id": "hiv-herbal-cure",
  "claim": "Herbs, garlic, lemon or other home remedies cure HIV.",
  "severity": "high",
  "all_of": [
   "\\bhiv\\b|\\baids\\b",
   "herb\\w*|garlic|lemon|ginger|moringa|natural|home remed\\w*",
   "cure[sd]?|heal\\w*|eliminat\\w*"
  ],
  "verdict": "False - there is no cure for HIV, but antiretroviral therapy controls the virus.",
  "fact": "People on effective treatment can live long, healthy lives and avoid passing on the virus; stopping treatment lets the virus rebound.",
  "sources": [
   "who_hiv"
  ]
 },
 {
  "id": "hpv-infertility",
  "claim": "The HPV vaccine causes infertility.",
  "severity": "medium",
  "all_of": [
   "hpv|gardasil|cervical cancer vaccine",
   "infertil\\w*|sterili[sz]\\w*|fertility"
  ],
  "verdict": "Unsupported - large safety reviews found no evidence of an effect on fertility.",
  "fact": "HPV vaccination protects against cervical and other cancers caused by the virus.",
  "sources": [
   "who_hpv",
   "who_vaccines"
  ]
 },
 {
  "id": "heat-kills-covid",
  "claim": "Hot baths, sun, saunas or hair-dryers kill or prevent COVID-19.",
  "severity": "low",
  "all_of": [
   "hot (bath|water|weather|drinks?)|sun(light| exposure)?|sauna|hair ?dryer|high temperature",
   "kill\\w*|cure[sd]?|prevent\\w*|protect\\w*",
   "covid|coronavirus"
  ],
  "verdict": "False - hot weather or hot baths do not prevent infection; high heat can burn you.",
  "fact": "Normal body temperature stays about 36.5-37 C regardless of bath temperature. Vaccination, ventilation and hygiene help.",
  "sources": [
   "who_mythbusters"
  ]
 },
 {
  "id": "masks-co2",
  "claim": "Wearing a medical mask causes CO2 poisoning or oxygen deficiency.",
  "severity": "low",
  "all_of": [
   "masks?",
   "oxygen|\\bco2\\b|carbon dioxide|suffocat\\w*|hypoxi\\w*"
  ],
  "verdict": "False - properly worn medical masks do not cause CO2 intoxication or oxygen deficiency.",
  "fact": "Health workers wear masks for long shifts; a mask should simply be comfortable, fitted, and replaced when damp.",
  "sources": [
   "who_mythbusters"
  ]
 },
 {
  "id": "vaccines-infertility",
  "claim": "Vaccines cause infertility or sterilise people.",
  "severity": "medium",
  "all_of": [
   "vaccin\\w*|\\bjabs?\\b|\\bshots?\\b",
   "infertil\\w*|sterili[sz]\\w*"
  ],
  "verdict": "Unsupported - no evidence that approved vaccines affect fertility.",
  "fact": "Large safety reviews have not found an effect on fertility. Infections such as mumps can, in some cases, affect fertility.",
  "sources": [
   "who_vaccines",
   "cochrane"
  ]
 },
 {
  "id": "chemo-kills-more",
  "claim": "Chemotherapy kills more people than cancer does.",
  "severity": "high",
  "all_of": [
   "chemo\\w*",
   "kills? more|more (?:patients|people|deaths)|worse than (?:the )?cancer|kill(?:s|ing) (?:patients|people)"
  ],
  "verdict": "False - chemotherapy has side effects, but it is a proven treatment that cures or controls many cancers.",
  "fact": "Decisions about cancer treatment belong with an oncology team; refusing treatment because of an online claim can cost lives.",
  "sources": [
   "nci",
   "cochrane"
  ]
 },
 {
  "id": "herbal-diabetes-cure",
  "claim": "A herb or natural remedy cures diabetes or replaces diabetes medicine.",
  "severity": "critical",
  "all_of": [
   "diabet\\w*|blood sugar",
   "turmeric|cinnamon|herbal|herbs?|garlic|ginger|natural|apple cider vinegar|bitter melon|fenugreek",
   "cure[sd]?|reverses?|no need|replace\\w*|instead of|stop\\w*|don'?t need|do not need"
  ],
  "verdict": "Dangerous - no herb has been shown to cure diabetes, and stopping prescribed medicine can be life-threatening.",
  "fact": "Diet and exercise matter, but medicines such as insulin or metformin should only be changed with your clinician.",
  "sources": [
   "who_diabetes",
   "medlineplus"
  ]
 },
 {
  "id": "detox-cures",
  "claim": "Detox teas or cleanses flush toxins and cure disease.",
  "severity": "low",
  "all_of": [
   "detox\\w*|cleanses?|flush\\w* (?:out )?toxins?|toxins?",
   "cure[sd]?|heal\\w*|fatty liver|liver|kidneys?|disease"
  ],
  "verdict": "Unsupported - the liver and kidneys already clear waste; there is no evidence detox products cure disease.",
  "fact": "Some detox products contain laxatives or diuretics that can cause harm.",
  "sources": [
   "medlineplus"
  ]
 },
 {
  "id": "sunscreen-cancer",
  "claim": "Sunscreen causes cancer.",
  "severity": "medium",
  "all_of": [
   "sunscreens?|sun ?block",
   "causes? (?:skin )?cancer|toxic|poison\\w*|carcinogen\\w*"
  ],
  "verdict": "Unsupported - sun protection, including sunscreen, lowers skin-cancer risk.",
  "fact": "WHO advises sun protection: shade, clothing, hats and sunscreen. Avoid sunbeds.",
  "sources": [
   "who_uv"
  ]
 }
];

export const SIGNALS = [
 {
  "id": "miracle_cure",
  "label": "Promises a miracle or guaranteed cure",
  "driver": "delayed_or_avoided_care",
  "weight": 25,
  "pattern": "\\b(miracle (cure|treatment|remedy)|cures? (all|any|every)\\b|guaranteed (cure|results?)|100% (effective|safe|natural)|cure[sd]?\\s+(cancer|diabetes|hiv|aids|autism|covid))",
  "why": "Real treatments rarely promise certainty; absolute cure claims are a classic marker of unproven products.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "conspiracy",
  "label": "Says \"they\" are hiding the truth",
  "driver": "erosion_of_trust",
  "weight": 20,
  "pattern": "(\\b(they|big pharma|the (government|elites|media|establishment|doctors)) (are |is )?(hiding|covering up|lying|suppress\\w*|silenc\\w*)|don'?t want you to know|wake up\\b|sheeple?|what (they|doctors) (don'?t|won'?t) tell you|cover-?up|hidden truth|plandemic|depopulation)",
  "why": "Frames institutions as hostile, which erodes trust and makes correction harder.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "institution_distrust",
  "label": "Says not to trust doctors or scientists",
  "driver": "erosion_of_trust",
  "weight": 20,
  "pattern": "(\\b(don'?t|do not|can'?t|never) trust (the )?(doctors?|who\\b|cdc|scientists?|experts?|health authorities|hospitals?|pharma)|\\b(doctors?|scientists?|experts?) (are|is) (all )?(lying|corrupt|paid off|bought|frauds?|liars))",
  "why": "Generalised distrust of health professionals is a named harm in the WHO and HHS analyses.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "virality_push",
  "label": "Pushes you to share it fast",
  "driver": "digital_acceleration",
  "weight": 12,
  "pattern": "(share (this )?(before|now|everywhere|with everyone)|before (it'?s|they|this is) (deleted|banned|removed|taken down)|forward (this|to all)|spread the word|please share|must see|they are deleting)",
  "why": "Pressure to forward quickly bypasses the pause that lets people check a claim.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "absolutes",
  "label": "Absolute certainty (always, never, 100%)",
  "driver": "illusory_truth_effect",
  "weight": 6,
  "pattern": "\\b(always|never|everyone|nobody|no one|all (doctors|scientists)|proven|undeniable|zero risk|completely safe|totally safe|no side effects)\\b",
  "why": "Health evidence is usually probabilistic; unqualified absolutes are a warning sign.",
  "maxHits": 2,
  "hedgeable": false
 },
 {
  "id": "unverifiable_authority",
  "label": "Relies on a secret source or one person’s story",
  "driver": "unverifiable_authority",
  "weight": 10,
  "pattern": "(secret (study|report|documents?)|leaked (study|report|documents?|memo)|insider|a (doctor|scientist|nurse) (friend|i know|told me)|my (cousin|uncle|aunt|friend|neighbou?r|colleague)|someone i know|(many|some) (doctors|scientists) (say|admit|confirm))",
  "why": "Claims resting on unnamed or personal sources cannot be checked.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "identity_appeal",
  "label": "Appeals to \"us versus them\"",
  "driver": "identity_and_alignment",
  "weight": 12,
  "pattern": "(real (patriots|men|women|parents|mothers|believers)|true (patriots|believers)|(they|those people) (want|are trying) to (control|silence|enslave|poison) (us|you|our)|protect your (family|children|kids) from (the )?(government|doctors|pharma)|take back control)",
  "why": "Claims that flatter group identity spread because they validate belonging, not because they are true.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "repetition_cue",
  "label": "\"Everyone knows\" appeal",
  "driver": "illusory_truth_effect",
  "weight": 8,
  "pattern": "(everyone (knows|says)|it'?s (common knowledge|well known)|we all know|you'?ve (probably )?heard)",
  "why": "Appeals to familiarity exploit the illusory-truth effect.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "harassment",
  "label": "Targets health workers or scientists",
  "driver": "harassment_of_workers",
  "weight": 45,
  "pattern": "(doxx\\w*|find (out )?where (they|he|she|the (doctors?|nurses?)) lives?|expose (the )?(doctors?|nurses?|scientists?)|make them pay|hunt down|go after (the )?(doctors?|nurses?|scientists?))",
  "why": "Calls to target health workers endanger them; escalate to platform trust-and-safety / authorities.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "natural_remedy_claim",
  "label": "Says a natural product cures or prevents disease",
  "driver": "delayed_or_avoided_care",
  "weight": 22,
  "pattern": "\\b(?:garlic|ginger|turmeric|lemon|honey|vitamin [cd]|herbs?|herbal|apple cider vinegar|detox\\w*|cleanse|teas?|baking soda|essential oils?|colloidal silver|onions?|cinnamon|moringa|neem|black seed|superfoods?|natural (?:remedy|remedies|cure|cures|treatment|treatments)|miracle \\w+)\\b[^.!?\\n]{0,60}\\b(?:cures?|cured|reverses?|reversed|heals?|healed|kills?|prevents?|eliminates?|flush(?:es)?|treats?|fights?|melts?|dissolves?)\\b",
  "why": "Everyday foods and herbs are rarely proven to cure or prevent serious disease. Strong claims need strong evidence.",
  "maxHits": 2,
  "hedgeable": true
 },
 {
  "id": "replaces_care",
  "label": "Says you do not need medicine, doctors or vaccines",
  "driver": "delayed_or_avoided_care",
  "weight": 40,
  "pattern": "\\b(?:no need (?:for|to)|(?:don'?t|do not|doesn'?t|does not) need|you can skip|skip the|instead of|replace[sd]?)\\W+(?:\\w+\\W+){0,4}?\\b(?:medicines?|medications?|drugs?|metformin|insulin|doctors?|vaccin\\w*|treatment|antibiotics?|chemo\\w*|surgery|prescriptions?|pills|dialysis)\\b",
  "why": "Telling people to skip or replace medical care is the highest-harm pattern.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "harm_of_medicine",
  "label": "Says a medical treatment is poison or does more harm than good",
  "driver": "erosion_of_trust",
  "weight": 22,
  "pattern": "\\b(?:vaccin\\w*|jabs?|shots?|chemo\\w*|medic\\w*|antibiotics?|hospitals?|pharma\\w*|sunscreen|fluoride|statins?)\\b[^.!?\\n]{0,40}\\b(?:poison\\w*|toxic|kills? (?:more|people|patients|children|kids)|killing (?:people|patients|kids|children)|more (?:people|patients|deaths|kids)|damage[sd]?|destroy\\w*|rewr[io]te\\w*|rewrote|sterili[sz]\\w*|infertil\\w*|causes? (?:cancer|autism|infertility|death|disease))\\b",
  "why": "Blanket claims that treatments are toxic or deadly ignore the benefit-risk evidence behind them.",
  "maxHits": 1,
  "hedgeable": true
 },
 {
  "id": "profit_motive",
  "label": "Claims health workers or authorities are lying for money",
  "driver": "erosion_of_trust",
  "weight": 20,
  "pattern": "\\b(?:hospitals?|doctors?|pharma\\w*|government|who|cdc)\\b[^.!?\\n]{0,30}\\b(?:just |only )?(?:want|after|in it for|do(?:ing)? it for)\\b[^.!?\\n]{0,15}\\b(?:money|profit\\w*|funding|control)\\b|\\binflat\\w+ (?:covid |the )?(?:deaths|numbers|cases)\\b|\\bfake (?:pandemic|virus|cases|deaths)\\b|\\b(?:covid|virus|pandemic|vaccines?)\\b[^.!?\\n]{0,20}\\bhoax\\b",
  "why": "Accusing health workers of lying for profit erodes trust and can lead to harassment.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "anecdote_harm",
  "label": "Blames a treatment for what happened to one person",
  "driver": "unverifiable_authority",
  "weight": 15,
  "pattern": "\\b(?:my|a) (?:friend|cousin|neighbou?r|uncle|aunt|sister|brother|mother|father|colleague)\\b[^.!?\\n]{0,80}\\b(?:took|got|had|received)\\b[^.!?\\n]{0,60}\\b(?:vaccin\\w*|shot|jab|medicine|pills?)\\b[^.!?\\n]{0,80}\\b(?:sick|died|dead|paralys\\w*|rewrote|ruined|collapsed|stroke|heart attack|infertil\\w*)\\b",
  "why": "One person’s story cannot show cause and effect; illnesses often have unrelated causes.",
  "maxHits": 1,
  "hedgeable": false
 },
 {
  "id": "emotive_words",
  "label": "Fear or outrage wording",
  "driver": "emotional_triggers",
  "weight": 8,
  "pattern": "\\b(?:deadly|terrifying|horrifying|shocking|outrage\\w*|poison\\w*|genocide|bioweapon|killing (?:us|our|your)|scandal|exposed)\\b",
  "why": "Content that triggers fear or anger is shared far more, whether or not it is accurate.",
  "maxHits": 2,
  "hedgeable": false
 },
 {
  "id": "serious_disease_claim",
  "label": "Says a natural product cures or prevents a serious disease",
  "driver": "delayed_or_avoided_care",
  "weight": 20,
  "pattern": "\\b(?:garlic|ginger|turmeric|lemon|honey|vitamin [cd]|herbs?|herbal|apple cider vinegar|detox\\w*|cleanse|teas?|baking soda|essential oils?|colloidal silver|onions?|cinnamon|moringa|neem|black seed|superfoods?|natural (?:remedy|remedies|cure|cures|treatment|treatments)|miracle \\w+)\\b[^.!?\\n]{0,60}\\b(?:cures?|reverses?|heals?|kills?|prevents?|eliminates?|treats?)\\b[^.!?\\n]{0,40}\\b(?:cancer|tumou?rs?|diabetes|covid|coronavirus|hiv|aids|heart disease|alzheimer\\w*|hepatitis|arthritis|autism)\\b",
  "why": "No food or herb has been shown to cure or prevent cancer, diabetes or similar diseases. Relying on one can delay real treatment.",
  "maxHits": 1,
  "hedgeable": true
 }
];

export const PATTERNS = {
 "HEALTH_TERMS": "\\b(health|disease|vaccin\\w*|cure[sd]?|treat\\w*|medic\\w*|doctors?|cancer|virus\\w*|covid|infect\\w*|symptoms?|drugs?|therap\\w*|hospital|diet|supplements?|immun\\w*|measles|diabet\\w*|insulin|hiv|antibiotics?|pregnan\\w*|surgery|clinic\\w*|pharma\\w*)\\b",
 "CRED_DOMAINS": "(who\\.int|nih\\.gov|cdc\\.gov|nhs\\.uk|cochrane\\w*\\.org|thelancet\\.com|bmj\\.com|nature\\.com|nejm\\.org|ecdc\\.europa\\.eu|hhs\\.gov|mohp\\.gov\\.eg|africacdc\\.org|pubmed|\\bdoi:|10\\.\\d{4,}/)",
 "HARM_A": "\\b(stop|quit|avoid|skip|refuse|ditch|throw away|discontinue)\\b[^.!?\\n]{0,40}\\b(?:doctors?|hospitals?|vaccin\\w*|immuni[sz]\\w*|screening|mammograms?|chemo\\w*|insulin|medication|medicines?|meds|prescriptions?|treatment|dialysis|antiretrovirals?)\\b",
 "HARM_B": "\\b(?:don'?t|do not|never|no need to|should not|shouldn'?t|must not)\\s+(?:ever\\s+)?(?:get|take|see|go to|visit|trust|use|need|bother with|vaccinate|accept|have)\\b[^.!?\\n]{0,40}\\b(?:doctors?|hospitals?|vaccin\\w*|immuni[sz]\\w*|screening|mammograms?|chemo\\w*|insulin|medication|medicines?|meds|prescriptions?|treatment|dialysis|antiretrovirals?)\\b",
 "NEGATOR_BEFORE": "(don'?t|do not|never|not|shouldn'?t|should not|without|please don'?t)\\s+$",
 "HEDGE": "\\b(?:may|might|could|can help|helps? (?:to )?(?:reduce|support|lower)|some (?:studies|evidence|people)|studies|research|trials?|evidence|according to|suggests?|associated with|side effects?)\\b"
};

export const CORRECTION_CUES = "\\b(myth|myths|false|untrue|debunk\\w*|no evidence|not true|no link|not linked|no proof|does ?n[o']t|do ?n[o']t|did ?n[o']t|cannot|can'?t|is not|isn'?t|are not|aren'?t|never been shown|fact[- ]?check\\w*|misinformation|disinformation|incorrect|dangerous)\\b";

