const pad = (n) => String(n).padStart(2, "0");
const f = (id, v) => id + pad(v.length) + v;

function crc16(s) {
  let crc = 0xffff;
  for (const ch of s) {
    crc ^= ch.charCodeAt(0) << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function buildPixPayload({ key, name, city = "PAULO AFONSO", amount, txid = "PAFT" }) {
  const gui = f("00", "BR.GOV.BCB.PIX") + f("01", key.slice(0, 77));
  const cleanName = name.toUpperCase().replace(/[^A-Z0-9 ]/g, "").trim().slice(0, 25) || "RECEBEDOR";
  const cleanCity = city.toUpperCase().replace(/[^A-Z0-9 ]/g, "").trim().slice(0, 15) || "BRASIL";
  let payload =
    f("00", "01") +
    f("26", gui) +
    f("52", "0000") +
    f("53", "986") +
    (amount ? f("54", Number(amount).toFixed(2)) : "") +
    f("58", "BR") +
    f("59", cleanName) +
    f("60", cleanCity) +
    f("62", f("05", String(txid).slice(0, 25)));
  payload += "6304";
  return payload + crc16(payload);
}
