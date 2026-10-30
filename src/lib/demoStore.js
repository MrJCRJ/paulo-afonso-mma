import { SEED_GRADUATIONS, SEED_GALLERY, SEED_POSTS, SEED_PAYMENTS_ALUNO } from "./seedData";

const KEYS = {
  graduations: "paft_graduations_v3",
  gallery: "paft_gallery_v2",
  posts: "paft_posts_v3",
  payments: "paft_payments",
  enrollments: "paft_enrollments",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return structuredClone(fallback);
    }
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export const demoStore = {
  getGraduations: () => read(KEYS.graduations, SEED_GRADUATIONS),
  setGraduations: (v) => write(KEYS.graduations, v),
  getGallery: () => read(KEYS.gallery, SEED_GALLERY),
  setGallery: (v) => write(KEYS.gallery, v),
  getPosts: () => read(KEYS.posts, SEED_POSTS),
  setPosts: (v) => write(KEYS.posts, v),
  getPayments: () => read(KEYS.payments, SEED_PAYMENTS_ALUNO),
  setPayments: (v) => write(KEYS.payments, v),
  getEnrollments: () => read(KEYS.enrollments, []),
  setEnrollments: (v) => write(KEYS.enrollments, v),
  reset: () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
