export function formatPhoneID(phone: string): string {
  if (!phone) return "";

  let digits = phone.replace(/\D/g, "");

  // hapus prefix negara
  if (digits.startsWith("62")) {
    digits = digits.slice(2);
  }

  // hapus 0 depan
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 7);
  const part3 = digits.slice(7);

  let formatted = `+62 ${part1}`;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += ` ${part3}`;

  return formatted;
}
