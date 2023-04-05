# Calendario

## Casos de sucesso

1 - ✅ Deve retornar **400** se o id do calendário não for fornecido
2 - ✅ Deve retornar **400** se o nome não for fornecido
3 - ✅ Deve retornar **400** se a categoria não for fornecida
4 - ✅ Deve retornar **400** se a categoria fornecida for inválida
5 - ✅ Deve retornar **400** se a data inicial não for fornecida
6 - ✅ Deve retornar **400** se o id do calendário não existir
7 - ⛔ Deve retornar **400** se a data inicial for menor que a data final
8 - ✅ Deve retornar **400** se já existir um evento com o nome fornecido
9 - ⛔ Deve retornar **200** com os dados do evento criado


## Exceções
1 - ⛔ Deve retornar **500** em caso de erro

## Objeto Calendar
id: string
calendar_id: string
name: string
category: string
start_date: Date
end_date: Date


✅
⛔