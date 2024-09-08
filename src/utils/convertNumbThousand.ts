export default function convertNumbThousand(number: number): string {
  let str = "";
  if (number < 1000) {
    str = String(number);
  } else {
    str = (number / 1000).toFixed(1) + "k";
  }
  return str;
}

export const formatNumber = (number: number) => {
  if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(1)}B`; // Tỷ
  } else if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`; // Triệu
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`; // Nghìn
  } else {
    return number.toString(); // Nếu số nhỏ hơn 1000
  }
};
