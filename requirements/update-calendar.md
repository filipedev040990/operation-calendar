# Calendario

## Casos de sucesso

1 - ✅ Deve retornar **400** se o id do calendário não for fornecido
2 - ✅ Deve retornar **400** se o nome do calendário não for fornecido
3 - ⛔ Deve retornar **409** se já existir um calendário com o nome fornecido
4 - ⛔ Deve retornar **200** com os dados do calendário atualizado


## Exceções
1 - ⛔ Deve retornar **500** em caso de erro

## Objeto Calendar
id string
name string
created_at Date


✅
⛔