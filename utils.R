################################################################################
# Utilitary functions that can be easily reused in other projects

#---------------------------------
join.path <- function(...) {
  paste(..., sep="/")
}

#--------------------------------
# Renomear estados de nome para sigla
rename.brstates <- function(state.colfactor) {
  fct_recode(state.colfactor,
             "AC"="Acre", "AL"="Alagoas", "AP"="Amapá",
             "AM"="Amazonas", "BA"="Bahia", "CE"="Ceará",
             "DF"="Distrito Federal", "ES"="Espírito Santo", "GO"="Goiás",
             "MA"="Maranhão", "MT"="Mato Grosso", "MS"="Mato Grosso do Sul",
             "MG"="Minas Gerais", "PA"="Pará", "PB"="Paraíba", "PR"="Paraná",
             "PE"="Pernambuco", "PI"="Piauí", "RJ"="Rio de Janeiro",
             "RN"="Rio Grande do Norte", "RS"="Rio Grande do Sul",
             "RO"="Rondônia", "RR"="Roraima", "SC"="Santa Catarina",
             "SP"="São Paulo", "SE"="Sergipe", "TO"="Tocantins"
             )
}
