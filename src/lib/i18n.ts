// Translation strings for the application
export type Language = 'pt-BR' | 'en-US';

export function getTranslation(language: Language, key: string): string {
  // Caso o arquivo real de traduções não exista, retornamos uma função simples
  // que apenas retorna a chave para não quebrar a aplicação durante o build
  return key;
}