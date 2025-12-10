# FutureDoc Análise

O **FutureDoc Análise** é uma aplicação web moderna desenvolvida para auxiliar profissionais da área jurídica na análise rápida e eficiente de documentos processuais. Utilizando a inteligência artificial do Google Gemini, o sistema processa arquivos enviados e extrai automaticamente informações cruciais, gerando resumos executivos e listas de fatos relevantes.

## 🚀 Funcionalidades

- **Upload de Documentos**: Suporte para envio de arquivos jurídicos para análise.
- **Análise com IA**: Integração com o modelo **Gemini 2.5 Flash** para leitura e interpretação de documentos.
- **Extração de Dados**:
  - **Resumo Executivo**: Um resumo conciso do processo (máx. 100 palavras).
  - **Lista de Fatos**: Identificação automática de número do processo, partes envolvidas, valor da causa, vara e pontos importantes.
- **Histórico Local**: As análises realizadas são salvas localmente no navegador para consulta posterior.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js) ou Yarn.
- Uma **Chave de API do Google Gemini** (Google AI Studio).

## 🔧 Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório** (ou baixe os arquivos):
   ```bash
   git clone <url-do-repositorio>
   cd futuredoc-analise
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração da API Key**:
   - Crie um arquivo chamado `.env` na raiz do projeto.
   - Adicione sua chave da API do Google Gemini:
     ```env
     VITE_API_KEY=sua_chave_api_aqui
     ```
   *Nota: Certifique-se de que a chave esteja configurada corretamente para ser acessível pela aplicação.*

4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   - Abra seu navegador e acesse o endereço indicado no terminal (geralmente `http://localhost:5173`).

## 🛠️ Tecnologias Utilizadas

- **React** (com TypeScript)
- **Vite**
- **Google GenAI SDK**

## 📄 Como Usar

1. Na tela inicial, clique na área de upload ou arraste um arquivo jurídico (PDF ou imagem).
2. Aguarde enquanto a IA processa o documento.
3. Visualize o **Resumo** e a **Lista de Fatos** gerados.
4. Consulte análises anteriores na seção de histórico.

---
Desenvolvido para agilizar a triagem jurídica.
