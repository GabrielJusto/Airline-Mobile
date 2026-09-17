# Instruções do projeto

## Comentários no código

Não escreva comentários explicando o que o código faz. O nome da variável, da
função ou do componente deve bastar. Se um trecho só fica claro com um
comentário descrevendo seu funcionamento, o caminho é melhorar o nome ou
extrair uma função, não comentar.

- Errado:
  ```ts
  // pega o menor preço de cada dia
  function build(data) { ... }
  ```
- Certo:
  ```ts
  function buildCheapestPriceByDay(data) { ... }
  ```
