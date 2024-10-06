
export default function capitalizeText(text: string) {
  text = text.replace("_", " ");
  return text[0]?.toUpperCase() + text.substr(1).toLowerCase();
}
