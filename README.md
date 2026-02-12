# 📋 REGRAS DE NEGÓCIO DO FORMULÁRIO – Instituto Social Neném Brandão

Este documento descreve a estrutura do formulário de cadastro de alunos do **Instituto Social Neném Brandão**, organizado por seções e com regras de validação.

---

## 1️⃣ IDENTIFICAÇÃO DO ALUNO

### 🧾 Dados Pessoais

- Nome completo
- Nome social (se houver)
- Data de nascimento
- Idade (calculada automaticamente pelo sistema)
- CPF  
  - Opcional para menores  
  - Obrigatório para maiores de idade
- RG (apenas número, sem órgão emissor e sem data)
- Sexo
- Nacionalidade
- Telefone (se houver)
- E-mail (se houver)
- Foto do aluno (upload)

---

## 2️⃣ DEFINIÇÃO AUTOMÁTICA: MAIOR OU MENOR DE IDADE

Regra automática baseada na data de nascimento:

- Se **menor de idade** → Exibir seção **Dados do Responsável Legal**
- Se **maior de idade** → Não exibir seção de responsável

---

## 3️⃣ DADOS DO RESPONSÁVEL LEGAL  
> 🔒 Obrigatório apenas se o aluno for menor de idade

- Nome completo
- CPF
- RG (apenas número)
- Grau de parentesco
- Telefone celular
- Telefone alternativo
- E-mail
- Endereço completo
- Comprovante de residência (upload)
- Documento com foto (upload simples)

**Observações importantes:**
- Não solicitar órgão emissor
- Não solicitar data de emissão

---

## 4️⃣ ENDEREÇO DO ALUNO

- CEP
- Rua
- Número
- Complemento
- Bairro
- Cidade
- Estado

---

## 5️⃣ DADOS ESCOLARES

- Nome da escola
- Tipo: Pública / Privada
- Turno
- Série/Ano
- Turma
- Telefone da escola
- Média geral atual
- Frequência escolar (%)
- Boletim escolar (upload obrigatório)
- Declaração de matrícula (upload obrigatório)

---

## 6️⃣ CRITÉRIO DE PERMANÊNCIA

### Campo informativo no formulário:

☑️ **Declaro estar ciente de que a permanência nas atividades está condicionada ao bom rendimento e comportamento escolar.**

### Controle interno do sistema:

- Status:
  - Ativo
  - Em observação
  - Suspenso
  - Desligado

---

## 7️⃣ SAÚDE

- Possui restrição médica?
- Usa medicação contínua?
- Possui deficiência? (se sim, especificar)
- Contato de emergência

---

## 8️⃣ DADOS SOCIOECONÔMICOS

- Renda familiar
- Número de pessoas na residência
- Recebe benefício social?

---

## 9️⃣ ATIVIDADES DE INTERESSE

- Lista de atividades disponíveis (checkbox múltipla escolha)

---

# 🔐 LGPD – LEI GERAL DE PROTEÇÃO DE DADOS

Incluir ao final do formulário:

☑️ **Autorizo o tratamento dos meus dados para fins de cadastro e participação nas atividades do Instituto Social Neném Brandão, conforme a Lei Geral de Proteção de Dados (LGPD).**

---

## ✅ Observações Técnicas Recomendadas

- Idade calculada automaticamente a partir da data de nascimento
- Validação condicional da seção de responsável
- Upload com limite de tamanho e formato (ex: PDF, JPG, PNG)
- Campos obrigatórios bem sinalizados
- Armazenamento seguro conforme LGPD
- Controle administrativo interno para status do aluno

---

**Versão:** 1.0  
**Instituto Social Neném Brandão**
