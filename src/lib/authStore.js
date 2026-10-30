/** Contas locais (navegador). Sem backend — senha só neste aparelho. */

const USERS_KEY = "paft_users_v1";

/** Admin fixo no código — entra digitando e-mail/senha no login (sem botão demo). */
export const ADMIN_ACCOUNT = {
  email: "admin@pafightteam.com",
  password: "pafight2015",
  user: {
    id: "admin-0",
    name: "Mendonça Júnior",
    email: "admin@pafightteam.com",
    role: "admin",
  },
};

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeUsers(map) {
  localStorage.setItem(USERS_KEY, JSON.stringify(map));
  return map;
}

export function findAccount(email) {
  const e = String(email || "")
    .trim()
    .toLowerCase();
  if (!e) return null;
  if (e === ADMIN_ACCOUNT.email) {
    return { password: ADMIN_ACCOUNT.password, user: { ...ADMIN_ACCOUNT.user } };
  }
  const map = readUsers();
  return map[e] || null;
}

export function registerStudent({ name, email, password, phone }) {
  const e = String(email || "")
    .trim()
    .toLowerCase();
  const n = String(name || "").trim();
  const p = String(password || "");
  if (!n || !e || !p) throw new Error("Preencha nome, e-mail e senha.");
  if (p.length < 6) throw new Error("A senha precisa ter pelo menos 6 caracteres.");
  if (e === ADMIN_ACCOUNT.email) throw new Error("Este e-mail é reservado. Use outro.");
  const map = readUsers();
  if (map[e]) throw new Error("Já existe cadastro com este e-mail. Faça login.");
  const entry = {
    password: p,
    user: {
      id: `u-${Date.now().toString(36)}`,
      name: n,
      email: e,
      phone: String(phone || "").trim(),
      role: "student",
    },
  };
  map[e] = entry;
  writeUsers(map);
  return entry.user;
}
