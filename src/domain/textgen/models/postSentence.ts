export const postSentences = {
  shop_name: "Ma boutique s'appelle : ",
  gift: "Le cadeau qui ferait plaisir serait ",
};

export function isValidContext(
  context: string
): context is keyof typeof postSentences {
  return context in postSentences;
}

export function getPostSentence(context: string): string {
  if (isValidContext(context)) {
    return postSentences[context];
  }
  return "";
}
