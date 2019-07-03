###############################################################################|
## DESCRIPTION:
##       Analyse the expenses of brazilian government in education, comparing
##       with the results of education development
###############################################################################|

##########################################################|
# DEPENDENCIES ----
library(plotly)       # interactive graphs
library(RColorBrewer) # make new color sets
library(tidyverse)    # easy manipulation of dataframes
library(DT)           # generate interactive html tables
library(rvest)        # scrap web pages
####################
options(digits=4)
options(na.action = 'na.warn')
options(width=155) # max width in output/print commands
####################
source("utils.R")

##########################################################|
# FILE CONSTANTS ----
base.dir <- "."
data.dir <- join.path(base.dir, "data")
output.dir <- join.path(base.dir, "results/")


##########################################################|
# READ EXPENSES DATA
# Obs: O SICONFI exporta na codificação ISO-8859-15, e não o padrão moderno UTF-8
despesas.funcao.2018 <- read_csv2(
  join.path(data.dir, "tesouro-csv", "2018_Despesas-Funcao-ESTADOS.csv"),
  locale=locale(encoding="ISO-8859-15"),
  skip=3,
  col_types = cols(.default = col_factor(NULL),
                   "População" = col_number(),
                   Valor = col_number()))

##########################################################|
# READ IDEB DATA
# função para extrair os dados do ideb a partir da listagem da página (html)
# disponível em: http://ideb.inep.gov.br/
parse.ideb.html <- function(html.path, table.id) {
  read_html(html.path) %>%
    html_node(table.id) %>%
    html_table() # retorna um "data_frame()" padrão, depois converteremos para "tibble"
}
estados45ano.path <- join.path(data.dir, "ideb/estados/4-5-ano/ideb_estados_escolas-publica_4-5ano.html")
estados89ano.path <- join.path(data.dir, "ideb/estados/8-9-ano/ideb_estados_escolas-publica_8-9ano.html")
estados45ano.rawtable <- parse.ideb.html(estados45ano.path, "#resultadoDataTable4")
estados89ano.rawtable <- parse.ideb.html(estados89ano.path, "#resultadoDataTable8")

##########################################################|
# TIDY IDEB TABLE
# A primeira linha é a divisão de subtabelas "Ideb Observado" x "Metas"
# Foi erroneamente mapeado como o colnames()
# A segunda linha contém "Estado", "2009" ... etc.
# Vamos separar em duas tabelas:
#     - Observado: Estado + Anos
#     - Meta:      Estado + Anos
# Tratamos individualmente primeiro e juntamos no final
clean.ideb.table <- function(ideb.table) {
  # obtém tabela "Observado"
  ideb.observado <- ideb.table[, colnames(ideb.table) %in% c("", "Ideb Observado")]
  colnames(ideb.observado) <- ideb.observado[1,] # ajusta nome das colunas
  ideb.observado <- ideb.observado[-1,] # elimina a primeira linha
  ideb.observado <- ideb.observado %>%
    as.tibble() %>%                     # converte num formato de tabela mais moderno
    gather("Ano", "Ideb", 2:8)          # unifica as colunas de "ano" em uma só

  # repete processo para "Meta"
  ideb.metas <- ideb.table[, colnames(ideb.table) %in% c("", "Metas Projetadas")]
  colnames(ideb.metas) <- ideb.metas[1,]
  ideb.metas <- ideb.metas[-1,]
  ideb.metas <- ideb.metas %>%
    as.tibble() %>%
    gather("Ano", "Meta", 2:9)

  # mescla as duas tabelas, ficando as colunas "Estado", "Ano", "Ideb" e "Meta"
  # mantém apenas colunas de "Meta" para anos que já têm Ideb calculado
  # (2019 não tem Ideb, então a Meta é descartada)
  inner_join(ideb.observado, ideb.metas, by=c("Estado", "Ano")) # retorna tabela final
}

estados45ano.df <- clean.ideb.table(estados45ano.rawtable)
estados89ano.df <- clean.ideb.table(estados89ano.rawtable)

write_csv2(estados45ano.df, join.path(data.dir, "ideb/ideb-csv", "ideb-estados-45ano.csv"))
write_csv2(estados89ano.df, join.path(data.dir, "ideb/ideb-csv", "ideb-estados-89ano.csv"))

##########################################################|
# EXPLORE SICONFI DATA
despesas.funcao.2018 %>%
  filter(startsWith(as.character(Conta), "12")) %>%
  group_by(UF) %>%
  summarise(InvEduc = sum(Valor)) %>%
  ggplot(aes(x=UF, y=InvEduc)) +
  geom_bar(stat = "identity")

despesas.funcao.2018 %>%
  select(UF, População) %>%
  ggplot(aes(x=UF, y=População)) +
  geom_bar(stat = "identity")

