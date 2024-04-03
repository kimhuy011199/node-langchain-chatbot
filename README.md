# ChatLangChain 🦜️🔗 Express Application

This repo is an implementation of a locally hosted chatbot specifically focused on question answering my profile. Built with LangChain, and Node.js.

> Looking for the client React app? Click [here](https://github.com/kimhuy011199/react-langchain-chat-bot)

## Technical Description

There are two components: training the model and question-answering.

### Training the model

Training has the following steps:

1. Load raw data from .txt file.

2. Split documents with LangChain's [RecursiveCharacterTextSplitter](https://js.langchain.com/docs/modules/data_connection/document_transformers/recursive_text_splitter)

3. Create a vectorstore of embeddings, using LangChain's [Faiss](https://js.langchain.com/docs/integrations/vectorstores/faiss) with OpenAI's embeddings.

### Question-answering

1. Given the chat history and question, determine what a standalone question would be using GPT-3.5.

2. Given that standalone question, look up relevant documents from the vectorstore.

3. Pass the question, relevant documents and chat history to the model to generate and stream the final answer.

## Running App Locally

1. Clone the repository:

```
git clone https://github.com/kimhuy011199/node-langchain-chatbot
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file and set the required environment variables listed inside `.env.sample` file.

4. Set your data to `src/training/training-data.txt` file.

5. Run the training script:

```
npm run train:dev
```

6. Start the development server:

```
npm run dev
```

7. Using [client app](https://github.com/kimhuy011199/react-langchain-chat-bot) to chat with AI
