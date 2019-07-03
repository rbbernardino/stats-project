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
estados45ano.path <- join.path(data.dir, "ideb/estados/4-5-ano/ideb_estados_escolas-publica_4-5ano.html")
estados45ano.tabletag <- "#resultadoDataTable4"
estados45ano.html <- read_html(estados45ano.path) %>%
  html_node(estados45ano.tabletag) %>%
  html_table() ->
  estados45ano.table # retorna um "data_frame()" padrão, depois converteremos para "tibble"

##########################################################|
# TIDY IDEB TABLE
# A primeira linha é a divisão de subtabelas, a segunda é de fato o header da
# coluna com "Estado" e uma coluna para cada ano, primeiro separamos
# as duas, tratamos individualmente e juntamos no final
estados45ano.observado <- estados45ano.table[, colnames(estados45ano.table) %in% c("", "Ideb Observado")]
colnames(estados45ano.observado) <- estados45ano.observado[1,]
estados45ano.observado <- estados45ano.observado[-1,] # elimina a primeira linha
estados45ano.observado <- estados45ano.observado %>%
  as.tibble() %>% # converte num formato de tabela mais moderno de tabela
  gather("Ano", "Ideb", 2:8) # unifica as colunas de "ano" em uma só

# acrescentei a tabela de metas "for completeness", pois só estamos interessados
# no Ideb observado
estados45ano.metas <- estados45ano.table[, colnames(estados45ano.table) %in% c("", "Metas Projetadas")]
colnames(estados45ano.metas) <- estados45ano.metas[1,]
estados45ano.metas <- estados45ano.metas[-1,]
estados45ano.metas <- estados45ano.metas %>%
  as.tibble() %>%
  gather("Ano", "Meta", 2:9)

# mescla as tabelas de "Observado" e "Metas", mantendo apenas as metas que já
# têm Ideb calculado (2019 não tem)
estados45ano.df <- inner_join(estados45ano.observado, estados45ano.metas, by=c("Estado", "Ano"))
write_csv2(estados45ano.df, join.path(data.dir, "ideb/ideb-csv", "ideb-estados-45ano.csv"))

##########################################################|
#
# falta replicar o processo para os outros anos
#

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

