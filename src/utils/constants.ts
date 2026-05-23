export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'projects', label: 'Projects' },
  { id: 'blogs', label: 'Timeline' },
  { id: 'about', label: 'About' },
];

export const ANIMATIONS = {
  hero: '/animations/strut-walking.fbx',
  skills: '/animations/aerial-evade.fbx',
  projects: '/animations/stand-to-roll.fbx',
  blogs: '/animations/Moonwalk.fbx',
  about: '/animations/samba-dancing.fbx',
};

/** Contact & profile URLs from LatextFile resume */
export const CONTACT_INFO = {
  email: 'shriharideshmukh382@gmail.com',
  github: 'https://github.com/Shrihari0208/',
  linkedin: 'https://www.linkedin.com/in/shrihari-deshmukh-6373b9248/',
  portfolio: 'https://shrihariportfolio.netlify.app/',
};

/**
 * EmailJS (browser). Public key is expected in client code; limit abuse via EmailJS dashboard (domains, blocklist).
 * Form field names in AboutSection must match template: from_name, from_email, contact, message
 */
export const EMAIL_JS = {
  serviceId: 'service_cq4olh2',
  templateId: 'template_k7qqbyj',
  publicKey: 'uZ4k-RRHx39PQ1sG5',
} as const;
