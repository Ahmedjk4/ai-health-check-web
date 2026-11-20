import { SOURCES } from './data.js';

export const sources = {
  ...SOURCES,
  who_gho: { name: 'WHO Global Health Observatory', url: 'https://www.who.int/data/gho' },
  who_infodemic: { name: 'WHO · Infodemic management', url: 'https://www.who.int/health-topics/infodemic' },
  egypt_mohp: { name: 'Egypt Ministry of Health and Population', url: 'https://www.mohp.gov.eg' },
  who_emro: { name: 'WHO · Eastern Mediterranean', url: 'https://www.emro.who.int' },
  nhs: { name: 'NHS · Health A to Z', url: 'https://www.nhs.uk/conditions/' },
  pubmed: { name: 'PubMed · Research literature', url: 'https://pubmed.ncbi.nlm.nih.gov' },
};

export const checklist = [
  ['Find the original', 'Who wrote it? Follow the claim back to the original source, rather than a screenshot or a forwarded message.'],
  ['Check the evidence', 'Does the source support this exact claim? A study, expert quote or AI-generated citation can be misrepresented.'],
  ['Look at the date', 'Check when the information was published and whether the guidance has changed.'],
  ['Compare independent sources', 'Look for agreement across health authorities and good-quality research. One source is rarely enough.'],
  ['Pause before sharing', 'Is fear, urgency or a miracle promise pushing you to act? Ask a clinician before changing treatment.'],
];

export const levelLabels = {
  none: 'No known warning signs', watch: 'Worth a closer look', warning: 'Warning signs found', danger: 'Potentially harmful advice',
};
