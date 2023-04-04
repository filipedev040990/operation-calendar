# Calendario

## Casos de sucesso

1 - ⛔ Deve retornar **400** se o id do calendário não for fornecido
2 - ⛔ Deve retornar **400** se o id do calendário não existir
2 - ⛔ Deve retornar **400** se já existir um evento com o nome fornecido
2 - ⛔ Deve retornar **400** se uma categoria inválida for fornecida
3 - ⛔ Deve retornar **200** com os dados do evento criado


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