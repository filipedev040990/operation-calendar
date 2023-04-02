Uma empresa de negócios pela internet precisa mitigar possíveis impactos ao negócio em decorrência de
sobrecarga dos sistemas.
Um integrante do time de engenharia percebeu que apesar dos recursos de auto-scale disponíveis, os
picos de acesso em certas datas do ano poderiam gerar uma experiência insatisfatória para o usuário final.
Com isso em mente, o time precisa trabalhar em um serviço de calendário de operação, para registro de
eventos recorrentes ou pontuais em um dado intervalo de tempo. Com isso será possível registrar datas
importantes e prever alguma demanda de alta carga.

O calendário deve conter apenas um nome e agrupar eventos. 
Os eventos devem possuir um nome,uma categoria e uma data. Eventualmente algum evento pode se estender por vários dias;
• As categorias previstas, até agora, para os eventos são: NORMAL, WARNING e CRITICAL;
• Além dos endpoints de criação, edição e deleção a API deve conter um endpoint que retorne os
eventos do dia.



✅
⛔